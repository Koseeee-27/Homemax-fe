"use client";

import { useFormStatus } from "react-dom";

export default function SignupSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(79,114,205,0.35)] transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "登録中..." : "登録する"}
    </button>
  );
}