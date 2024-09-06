import axios from "axios"
import useSWR, { SWRConfiguration } from "swr"
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation"
import { JSONApiResponse } from "./type"
import { useCallback } from "react"

export function useResource<Type = object>(
  path: string | null | (() => string | null),
  options?: SWRConfiguration,
  fetch = true,
) {
  const { data, error, mutate } = useSWR(fetch ? path : null, options)
  return {
    data: data as JSONApiResponse<Type>,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export function useResourceMutation<Type = object>(
  path: string | null | (() => string | null),
  options?: SWRMutationConfiguration<
    string | (() => string | null) | null,
    never
  >,
) {
  const fetcher = useCallback(
    (url: string, params?: object) =>
      axios
        .get(url, params)
        .then(res => res.data)
        .catch(err => err.response?.data),
    [],
  )
  const { data, trigger, isMutating, error } = useSWRMutation(
    path,
    fetcher,
    options,
  )

  return {
    data: data as JSONApiResponse<Type>,
    isMutating: isMutating,
    isError: error,
    trigger: trigger,
  }
}

export function useCreateResource<Type = object>(
  path: string | null | (() => string | null),
  options?: SWRMutationConfiguration<
    string | (() => string | null) | null,
    never
  >,
) {
  const fetcher = useCallback((url: string, { arg }: { arg: object }) => {
    return axios
      .post(url, arg)
      .then(res => res.data)
      .catch(err => err.response?.data)
  }, [])
  const { data, trigger, isMutating, error } = useSWRMutation(
    path,
    fetcher,
    options,
  )

  return {
    data: data as JSONApiResponse<Type>,
    isMutating: isMutating,
    isError: error,
    trigger,
  }
}

export function useUpdateResource<Type = object>(
  path: string | null | (() => string | null),
  options?: SWRMutationConfiguration<
    string | (() => string | null) | null,
    never
  >,
) {
  const fetcher = useCallback(
    (url: string, { arg }: { arg: object }) =>
      axios
        .patch(url, arg)
        .then(res => res.data)
        .catch(err => err.response?.data),
    [],
  )
  const { data, trigger, isMutating, error } = useSWRMutation(
    path,
    fetcher,
    options,
  )

  return {
    data: data as JSONApiResponse<Type>,
    isMutating: isMutating,
    isError: error,
    trigger: trigger,
  }
}

export function useDeleteResource<Type = object>(
  path: string | null | (() => string | null),
  options?: SWRMutationConfiguration<
    string | (() => string | null) | null,
    never
  >,
) {
  const fetcher = useCallback(
    (url: string, { arg }: { arg: object }) =>
      axios
        .delete(url, { data: arg })
        .then(res => res.data)
        .catch(err => err.response?.data),
    [],
  )
  const { data, trigger, isMutating, error } = useSWRMutation(
    path,
    fetcher,
    options,
  )

  return {
    data: data as JSONApiResponse<Type>,
    isMutating: isMutating,
    isError: error,
    trigger,
  }
}
