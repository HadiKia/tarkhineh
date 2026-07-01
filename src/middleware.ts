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
    path: "/admin",
    authRequired: true,
    role: "ADMIN",
    redirectIfUnauthorizedRole: "/profile",
  },
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const matchedRoute = accessControl.find(
    (route) => pathname === route.path || pathname.startsWith(route.path + "/"),
  );

  if (!matchedRoute) {
    return NextResponse.next();
  }

  let user;
  if (matchedRoute.authRequired || matchedRoute.redirectIfAuthed) {
    user = await middlewareAuth(req);
  }

  if (matchedRoute.redirectIfAuthed && user) {
    return NextResponse.redirect(
      new URL(matchedRoute.redirectIfAuthed, req.nextUrl),
    );
  }

  if (matchedRoute.authRequired && !user) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (matchedRoute.role && user?.role !== matchedRoute.role) {
    return NextResponse.redirect(
      new URL(matchedRoute.redirectIfUnauthorizedRole || "/", req.nextUrl),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*", "/profile/:path*", "/admin/:path*"],
};
