// app/(main)/chat/components/MessageInputBar.tsx
"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react"; // ★ useState をインポート
import { User } from "@/features/auth/utils/authAtoms";


// 送信ボタンコンポーネント (変更なし)
function SubmitButton({ isEmpty }: { isEmpty: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || isEmpty}
      className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center disabled:bg-purple-300"
    >
      {pending ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.875L5.999 12zm0 0h7.5" />
        </svg>
      )}
    </button>
  );
}

interface Props {
  user: User;
}

export default function MessageInputBar({ user }: Props) {
  // ★ 1. 入力値をローカルの state で管理
  const [message, setMessage] = useState("");
  const { pending } = useFormStatus(); // 親フォームの pending 状態を取得

  const isEmpty = message.trim() === "";

  // ★ 2. 送信が完了したら (pending が false に戻ったら) 入力欄をクリア
  useEffect(() => {
    if (!pending) {
      setMessage("");
    }
  }, [pending]);

  return (
    // ★ 3. <form> タグを削除し、<div> に変更
    <div className="p-4 bg-white/70 backdrop-blur-sm">
      <div className="flex max-w-lg mx-auto gap-3">
        <input type="hidden" name="userId" value={user.id} />

        <input
          type="text"
          name="message"
          value={message} // ★ 4. state をバインド
          onChange={(e) => setMessage(e.target.value)} // ★ 5. state を更新
          placeholder={pending ? "ほめマックスが考え中..." : "メッセージを入力..."}
          disabled={pending}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50"
        />
        <SubmitButton isEmpty={isEmpty} />
      </div>
    </div>
  );
}