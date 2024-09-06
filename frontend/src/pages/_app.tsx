import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "@/styles/globals.css"
import CssBaseline from "@mui/material/CssBaseline"
import { ConfirmProvider } from "material-ui-confirm"
import type { AppProps } from "next/app"
import "material-icons/iconfont/material-icons.css"
import RequestHandler from "@/components/request_handler"

function MyApp({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available

  return (
    <>
      <CssBaseline />
      <RequestHandler>
        <ConfirmProvider>
          <Component {...pageProps} />
        </ConfirmProvider>
      </RequestHandler>
    </>
  )
}

export default MyApp
