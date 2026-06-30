import type { NextRequest } from "next/server";
import type { User } from "@/types";

export async function middlewareAuth(
  req: NextRequest,
): Promise<User | undefined> {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");

  const options: RequestInit = {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`,
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
    options,
  );

  const body = await res.json();
  return body?.data as User | undefined;
}
