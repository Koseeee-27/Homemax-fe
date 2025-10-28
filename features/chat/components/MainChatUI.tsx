// app/(main)/chat/components/MainChatUI.tsx
"use client";

import { useActionState } from "react";

import MessageInputBar from "./MessageInputBar";
import Image from "next/image";
import HomemaxMessageBubble from "./HomemaxMessageBubble";
import UserMessageBubble from "./UserMessageBubble";
import { ChatState, continueConversation } from "../actions/continueConversation";
import { User } from "@/features/auth/utils/authAtoms";
import { useFormStatus } from "react-dom";

// 2. Server Action が返す「状態」の初期値
const initialState: ChatState = {
  latestUserMessage: null,
  latestHomemaxMessage: null,
  error: null,
};

function CharacterImage() {
  const { pending } = useFormStatus(); // フォームの送信状態を取得

  // pending 状態に応じて画像パスを切り替え
  const imageUrl = pending
    ? "/images/Homemax_thinking.png" // 待機中の画像
    : "/images/Homemax_default.png"; // 通常の画像

  return (
    <Image src={imageUrl} alt="HomeMax" width={300} height={300} />
  );
}


export default function MainChatUI({ user }: { user: User }) {
  const [state, formAction] = useActionState(continueConversation, initialState);

  // ★ 3. stateから最新のメッセージ（配列ではなく単一オブジェクト）を取得
  const homemaxMessage = state.latestHomemaxMessage?.content;
  const userMessage = state.latestUserMessage?.content;

  return (
    // ★ 1. このコンポーネント自体を <form> に変更
    <form action={formAction} className="flex-1 flex flex-col">
      <div className="flex-1 flex">
        <div className="flex-1">
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <HomemaxMessageBubble message={homemaxMessage} />
          <CharacterImage />
        </div>
        <div className="flex-1 flex items-center justify-start">
          <UserMessageBubble message={userMessage} />
        </div>
      </div>
      <div className="">
        <MessageInputBar user={user} />
      </div>

      {state.error && <p className="text-red-500 text-center">{state.error}</p>}
    </form>
  );
}