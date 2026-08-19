import type { NextRequest } from "next/server";
import type { User } from "@/types";

type MiddlewareAuthResult = {
  user?: User;
  setCookies: string[];
};

function getCookieHeader(req: NextRequest) {
  return req.cookies
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
}

function mergeSetCookies(cookieHeader: string, setCookies: string[]) {
  const cookies = new Map(
    cookieHeader
      .split("; ")
      .filter(Boolean)
      .map((cookie) => {
        const separatorIndex = cookie.indexOf("=");
        return [cookie.slice(0, separatorIndex), cookie.slice(separatorIndex + 1)];
      }),
  );

  setCookies.forEach((cookie) => {
    const [nameValue] = cookie.split(";");
    const separatorIndex = nameValue.indexOf("=");
    cookies.set(
      nameValue.slice(0, separatorIndex),
      nameValue.slice(separatorIndex + 1),
    );
  });

  return [...cookies.entries()]
    .map(([name, value]) => `${name}=${value}`)
    .join("; ");
}

function getSetCookies(response: Response) {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[];
  };

  const cookies = headers.getSetCookie?.();
  if (cookies?.length) return cookies;

  const combinedCookie = response.headers.get("set-cookie");
  return combinedCookie
    ? combinedCookie.split(/,(?=\s*[^;,\s]+=)/)
    : [];
}

export async function middlewareAuth(
  req: NextRequest,
): Promise<MiddlewareAuthResult> {
  const cookieHeader = getCookieHeader(req);
  let setCookies: string[] = [];

  try {
    const getProfile = (cookies: string): Promise<Response> =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        method: "GET",
        headers: { Cookie: cookies },
      });

    let res = await getProfile(cookieHeader);

    if (res.status === 401) {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`,
        {
          method: "GET",
          headers: { Cookie: cookieHeader },
        },
      );

      if (!refreshRes.ok) return { setCookies };

      setCookies = getSetCookies(refreshRes);
      res = await getProfile(mergeSetCookies(cookieHeader, setCookies));
    }

    if (!res.ok) return { setCookies };

    const { data } = await res.json();
    return {
      user: data?.user as User | undefined,
      setCookies,
    };
  } catch {
    return { setCookies };
  }
}
