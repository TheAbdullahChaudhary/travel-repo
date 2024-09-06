import {
  useCounters,
  useCreateCounters,
  useDeleteCounters,
} from "@/models/counter/counter"

function Login() {
  const { data, isLoading } = useCounters()

  const { trigger: incrementCounter } = useCreateCounters()
  const { trigger: decrementCounter } = useDeleteCounters()

  return (
    <>
      <div>
        <h1>Hello</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>Counter: {data?.data?.count || 0}</p>
            <button onClick={() => incrementCounter({ format: "json" })}>
              Increment
            </button>
            <button onClick={() => decrementCounter({ format: "json" })}>
              Decrement
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default Login
