import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { cookies } = request;
  const authToken = String(cookies.get("auth")?.value);
  if (
    !request.nextUrl.pathname.startsWith("/_next") &&
    !request.nextUrl.pathname.startsWith("/api")
  ) {
    // IS PAGE!!
    const tokenIsValid = await checkAuthToken(
      String(authToken),
      request.nextUrl.origin
    );
    if (tokenIsValid) {
      await updateTokenDeadline(authToken, request.nextUrl.origin);
    }

    if (pathname === "/login") {
      if (tokenIsValid) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } else {
      if (!tokenIsValid) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }
}

async function checkAuthToken(token: string, currentUrl: string) {
  return await fetch(`${currentUrl}/api/auth/checkToken`, {
    method: "POST",
    body: JSON.stringify({
      token: String(token),
    }),
  }).then((x) => {
    return x.status === 200;
  });
}

async function updateTokenDeadline(token: string, currentUrl: string) {
  return await fetch(`${currentUrl}/api/auth/updateTokenDeadline`, {
    method: "POST",
    body: JSON.stringify({
      token: String(token),
    }),
  })
    .then((x) => {
      return x.status === 200;
    })
    .catch((err) => {
      console.log("err #vng3", err);
    });
}
