"use server";

import { API_BASE_URL } from "@/lib/config";
import { redirect } from "next/navigation";
import z from "zod";

export interface SignupFormState {
  message: string;
}

const signupSchema = z.object({
  // ユーザー名は半角英数字とアンダースコアのみ
  username: z.string()
  .min(1, "ユーザー名を入力してください")
  .regex(/^[a-zA-Z0-9_]+$/, "ユーザー名は半角英数字とアンダースコアのみ使用できます"),
  email: z.email("有効なメールアドレスを入力してください"),
  password: z.string().min(6, "パスワードは6文字以上で入力してください"),
});


export async function signup(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  // 1. バリデーション
  const validatedFields = signupSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.issues[0]?.message ?? "入力内容が正しくありません",
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    // 外部バックエンドAPIを直接叩く
    const beRes = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await beRes.json().catch(() => ({}));

    if (!beRes.ok) {
      return { message: data?.message ?? "サインアップに失敗しました" };
    }

  } catch (error) {
    return { message: "サーバーエラーが発生しました" };
  }
  
  // 5. サインアップ成功時にリダイレクト
  redirect("/login?signupSuccess=true"); // redirectはtry-catchの外で呼ぶ必要がある
}