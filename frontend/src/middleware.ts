import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { apiValidationPath, newUserSessionPath } from "@/lib/routes"

export async function middleware(request: NextRequest) {
  const sessionCookie = request?.cookies?.get("_upstart_session")?.value
  // This is the public DNS name that the users use to access the server
  const publicApiURL = new URL(
    process.env.NEXT_PUBLIC_API_URL?.startsWith("http://")
      ? process.env.NEXT_PUBLIC_API_URL
      : `http://${process.env.NEXT_PUBLIC_API_URL}`,
  )
  // This is an internal DNS name that the containers use to talk to each other
  const privateApiURL = new URL(
    process.env.NEXT_PRIVATE_API_URL?.startsWith("http://")
      ? process.env.NEXT_PRIVATE_API_URL
      : `http://${process.env.NEXT_PRIVATE_API_URL}`,
  )
  if (!sessionCookie) {
    return NextResponse.redirect(
      new URL(newUserSessionPath({ format: null }), publicApiURL),
    )
  }

  const apiResponse = await fetch(
    new URL(apiValidationPath({ format: null }), privateApiURL),
    {
      credentials: "include",
      redirect: "manual",
      headers: {
        Cookie: `_upstart_session=${encodeURIComponent(sessionCookie)}`,
      },
    },
  )

  if (apiResponse.status < 200) {
    return NextResponse.redirect(
      new URL(newUserSessionPath({ format: null }), publicApiURL),
    )
  }

  // if none of those conditions are met, just let it fall through
  return
}

// Don't run the middleware for static files or the favicon
export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
}
