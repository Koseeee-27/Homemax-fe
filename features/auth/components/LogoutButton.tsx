// app/features/auth/components/LogoutButton.tsx
"use client";

import { useFormStatus } from "react-dom";
import { logout } from "../actions/logout";

// 送信状態を管理するボタン
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="..."
    >
      {pending ? "ログアウト中..." : "ログアウト"}
    </button>
  );
}

// フォーム本体
export const LogoutButton = () => {
  return (
    // ★ useActionState は使わず、logout アクションを直接渡す
    <form action={logout}>
      <SubmitButton />
    </form>
  );
};