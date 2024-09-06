import { apiCounterPath } from "@/lib/routes"
import {
  useCreateResource,
  useDeleteResource,
  useResource,
} from "../api_resources"
import { Counter } from "./type"

export function useCounters(params = {}, fetch?: boolean) {
  return useResource<Counter>(
    apiCounterPath(params),
    {
      revalidateOnMount: true,
    },
    fetch,
  )
}

export function useCreateCounters(params = {}) {
  return useCreateResource<Counter>(apiCounterPath(params))
}

export function useDeleteCounters(params = {}) {
  return useDeleteResource<Counter>(apiCounterPath(params))
}
