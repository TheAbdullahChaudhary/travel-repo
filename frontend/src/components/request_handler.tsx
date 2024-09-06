import axios from "axios"
import React, { useEffect, useState } from "react"
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from "notistack"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import { useRouter } from "next/router"
import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import { SWRConfig, SWRConfiguration } from "swr"
import { newUserSessionPath } from "@/lib/routes"

export default function RequestHandler(props: { children: React.ReactNode }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.startsWith("http://")
    ? process.env.NEXT_PUBLIC_API_URL
    : `http://${process.env.NEXT_PUBLIC_API_URL}`

  useEffect(() => {
    const startLoading = axios.interceptors.request.use(
      config => {
        setLoading(true)
        return config
      },
      error => {
        setLoading(false)
        return Promise.reject(error)
      },
    )

    const stopLoading = axios.interceptors.response.use(
      response => {
        setLoading(false)
        return response
      },
      error => {
        setLoading(false)
        if (error?.response?.status === 401) {
          const fullUrl = new URL(newUserSessionPath({ format: null }), apiUrl)
          window.location.href = fullUrl.href
          return
        } else if (error?.code !== "ECONNABORTED") {
          enqueueSnackbar("A server error occurred. Please contact support.", {
            variant: "error",
          })
        }
        return Promise.reject(error)
      },
    )

    return () => {
      axios.interceptors.request.eject(startLoading)
      axios.interceptors.response.eject(stopLoading)
    }
  }, [apiUrl])

  const { children } = props
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  axios.defaults.baseURL = apiUrl
  axios.defaults.withCredentials = true

  const SWRConfigOptions: SWRConfiguration = {
    onError: error => {
      if (error?.response?.status === 401) {
        const fullUrl = new URL(newUserSessionPath({ format: null }), apiUrl)
        window.location.href = fullUrl.href
        return
      }
    },
    onErrorRetry: error => {
      if (error.status === 404) return
    },
    fetcher: (url: string) =>
      axios
        .get(url)
        .then(res => res.data)
        .catch(err => err.response.data),
  }

  useEffect(() => {
    const toggleLoading = (show: boolean) => {
      setLoading(show)
    }
    router.events.on("routeChangeStart", () => toggleLoading(true))
    router.events.on("routeChangeComplete", () => toggleLoading(false))
    router.events.on("routeChangeError", () => toggleLoading(false))

    return () => {
      router.events.off("routeChangeStart", toggleLoading)
      router.events.off("routeChangeComplete", toggleLoading)
      router.events.off("routeChangeError", toggleLoading)
    }
  }, [router.events])

  return (
    <SWRConfig value={SWRConfigOptions}>
      <SnackbarProvider
        preventDuplicate
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        action={snackbarId => (
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => closeSnackbar(snackbarId)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      >
        <Box sx={{ width: "100%", position: "fixed" }} hidden={!loading}>
          <LinearProgress />
        </Box>
        {children}
      </SnackbarProvider>
    </SWRConfig>
  )
}
