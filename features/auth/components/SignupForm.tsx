"use client";
import { signup, SignupFormState } from "../actions/signup";
import SignupSubmitButton from "./SignupSubmitButton";
import { useActionState } from "react";


export default function SignupForm() {
  const initialState: SignupFormState = { message: "" };
  const [state, formAction] = useActionState(signup, initialState);
  return (
    <div className="w-full max-w-md mx-auto rounded-3xl border border-white/60 bg-white/70 px-8 py-10 shadow-[0_20px_45px_rgba(79,114,205,0.12)] backdrop-blur">
      <h2 className="text-2xl font-semibold text-slate-800 text-center mb-8 tracking-wide">サインアップ</h2>
      <form className="space-y-5" action={formAction}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-slate-600">
            ユーザー名
          </label>
          <input
            className="mt-1 block w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-slate-800 placeholder-slate-400 shadow-inner hover:border-indigo-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition"
            type="text"
            id="username"
            name="username"
            placeholder="例: taro"
            autoComplete="username"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-600">
            メールアドレス
          </label>
          <input
            className="mt-1 block w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-slate-800 placeholder-slate-400 shadow-inner hover:border-indigo-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition"
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
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
            minLength={6}
            required
          />
          <p className="mt-1 text-xs text-gray-400">6文字以上で入力してください</p>
        </div>
        {/* 6. サーバーからのエラーメッセージを表示 */}
        {state?.message && <p className="text-sm text-rose-500 text-center">{state.message}</p>}
        <div className="flex justify-center">
          <SignupSubmitButton />
        </div>
      </form>
    </div>
  );
}