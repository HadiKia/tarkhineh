import type { NextRequest } from "next/server";
import type { User } from "@/types";

export async function middlewareAuth(
  req: NextRequest,
): Promise<User | undefined> {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");

  try {
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

    if (!res.ok) return undefined;

    const { data } = await res.json();
    const { user } = data || {};
    return user as User | undefined;
  } catch {
    return undefined;
  }
}
