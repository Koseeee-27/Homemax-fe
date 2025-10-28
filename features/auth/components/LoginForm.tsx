"use client";
import { useActionState } from "react";
import { login, LoginFormState } from "../actions/login";
import LoginSubmitButton from "./LoginSubmitButton";
import Link from "next/link";

export default function LoginForm() {
  const initialState: LoginFormState = { message: "" };
  const [state, formAction] = useActionState(login, initialState);
  return (
    <div className="w-full max-w-md mx-auto rounded-3xl border border-white/60 bg-white/70 px-8 py-10 shadow-[0_20px_45px_rgba(79,114,205,0.12)] backdrop-blur">
      <h2 className="text-2xl font-semibold text-slate-800 text-center mb-8 tracking-wide">ログイン</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-slate-600">
            ユーザー名
          </label>
          <input
            className="mt-1 block w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-slate-800 placeholder-slate-400 shadow-inner hover:border-indigo-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition"
            type="text"
            id="username"
            name="username"
            placeholder="ユーザー名"
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-600">
            パスワード
          </label>
          <input
            className="mt-1 block w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-slate-800 placeholder-slate-400 shadow-inner hover:border-indigo-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition"
            type="password"
            id="password"
            name="password"
            placeholder="6文字以上"
            autoComplete="new-password"
            required
          />
          <p className="mt-1 text-xs text-gray-500">6文字以上で入力してください</p>
        </div>
        {state?.message && <p className="text-sm text-rose-500 text-center">{state.message}</p>}
        <div className="flex justify-center">
          <LoginSubmitButton />
        </div>
      </form>
      <div className="mt-6">
        <Link
          href="/signup" // サインアップページのパスに合わせて変更
          className="inline-flex w-full items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2.5 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-0"
          aria-label="サインアップページへ移動"
        >
          アカウントをお持ちでない方はこちら
        </Link>
      </div>
    </div>
  );
}