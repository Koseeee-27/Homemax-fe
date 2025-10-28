"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod"; // バリデーションライブラリの例
import { API_BASE_URL, authCookieName, authCookieOptions } from "@/lib/config";

// フォームの入力スキーマ
const loginSchema = z.object({
  username: z.string().min(1, "ユーザー名を入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
});

export interface LoginFormState {
  message: string;
}

export async function login(
  prevState: LoginFormState, // useFormState から渡される前の状態
  formData: FormData
): Promise<LoginFormState> {

  // 1. バリデーション
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())  
  );

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.issues[0]?.message ?? "入力内容が正しくありません",
    };
  }

  const { username, password } = validatedFields.data;

  try {
    // 外部バックエンドAPIを直接叩く
    const beRes = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await beRes.json().catch(() => ({}));
    console.log(JSON.stringify(data));
    

    if (!beRes.ok) {
      return { message: data?.message ?? "ログインに失敗しました" };
    }

    // トークン取得
    const token = data?.token;
    if (!token) {
      return { message: "トークンが取得できませんでした" };
    }

    // HttpOnly Cookieをセット
    const cookiesStore = await cookies();
    cookiesStore.set(authCookieName, token, authCookieOptions);

  } catch (error) {
    return { message: "サーバーエラーが発生しました" };
  }

  // 5. ログイン成功時にリダイレクト
  redirect("/"); 
}

