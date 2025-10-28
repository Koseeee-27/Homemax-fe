"use server";

import { authCookieName } from "@/lib/config";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout() {
  const cookiesStore = await cookies();
  // 確実に削除するため、空の値で上書き
  cookiesStore.set(authCookieName, "", {
    maxAge: 0,
  });

  redirect("/");
}
