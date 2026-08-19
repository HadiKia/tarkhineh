import { NextResponse, type NextRequest } from "next/server";
import { middlewareAuth } from "./utils/middlewareAuth";
import type { UserRole } from "@/types";

type AccessControlRoute = {
  path: string;
  authRequired?: boolean;
  redirectIfAuthed?: string;
  role?: UserRole;
  redirectIfUnauthorizedRole?: string;
};

const accessControl: AccessControlRoute[] = [
  {
    path: "/panel",
    authRequired: true,
  },
  {
    path: "/profile",
    authRequired: true,
  },
  {
    path: "/cart/completion-of-information",
    authRequired: true,
  },
  {
    path: "/cart/payment",
    authRequired: true,
  },
  {
    path: "/admin",
    authRequired: true,
    role: "ADMIN",
    redirectIfUnauthorizedRole: "/profile",
  },
];

function withRefreshedCookies(response: NextResponse, cookies: string[]) {
  cookies.forEach((cookie) => response.headers.append("set-cookie", cookie));
  return response;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const matchedRoute = accessControl.find(
    (route) => pathname === route.path || pathname.startsWith(route.path + "/"),
  );

  if (!matchedRoute) {
    return NextResponse.next();
  }

  let user;
  let refreshedCookies: string[] = [];
  if (matchedRoute.authRequired || matchedRoute.redirectIfAuthed) {
    const authResult = await middlewareAuth(req);
    user = authResult.user;
    refreshedCookies = authResult.setCookies;
  }

  const response = withRefreshedCookies(
    NextResponse.next(),
    refreshedCookies,
  );

  if (matchedRoute.redirectIfAuthed && user) {
    return withRefreshedCookies(
      NextResponse.redirect(
        new URL(matchedRoute.redirectIfAuthed, req.nextUrl),
      ),
      refreshedCookies,
    );
  }

  if (matchedRoute.authRequired && !user) {
    return withRefreshedCookies(
      NextResponse.redirect(new URL("/", req.nextUrl)),
      refreshedCookies,
    );
  }

  if (matchedRoute.role && user?.role !== matchedRoute.role) {
    return withRefreshedCookies(
      NextResponse.redirect(
        new URL(matchedRoute.redirectIfUnauthorizedRole || "/", req.nextUrl),
      ),
      refreshedCookies,
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/panel/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/cart/completion-of-information/:path*",
    "/cart/payment/:path*",
  ],
};
