"use client";

import { useAtom } from 'jotai';
import { userAtom } from '@/features/auth/utils/authAtoms';
import MainChatUI from './MainChatUI';
// import GuestChatUI from './GuestChatUI';

// 2つのUIコンポーネントをインポート

export default function ChatUIRouter() {
  const [user] = useAtom(userAtom);

  if (user) {
    // Atomにユーザー情報があれば、メインUIを表示
    return <MainChatUI user={user} />;
  } else {
    // Atomがnullなら、お試しUIを表示
    // return <GuestChatUI />;
  }
}