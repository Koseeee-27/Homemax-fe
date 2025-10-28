// components/layouts/Header/Header.tsx
"use client";

import { useAtom } from 'jotai';
import Link from 'next/link';
import { LogoutButton } from '@/features/auth/components/LogoutButton';
import { userAtom } from '@/features/auth/utils/authAtoms';

export default function Header({ className }: { className?: string }) {
  const [user] = useAtom(userAtom);

  return (
    <header className={className}>
      <nav className="container mx-auto flex justify-between items-center p-4">

        {/* --- 1. 左側：ロゴなど --- */}
        <Link href="/" className="font-bold text-xl">
          ほめマックス
        </Link>

        {/* --- 2. 右側：認証エリア --- */}
        <div className="flex items-center gap-4">
          {user ? (
            // ★ ログイン済みの場合
            <>
              {/* ユーザーアイコンとログアウトボタン */}
              <div className="flex items-center gap-2">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368
                L290.3 368z" />
                </svg> */}
                <LogoutButton />
              </div>
            </>
          ) : (
            // ★ 未認証の場合
            <>
              <Link href="/signup" className="text-sm text-gray-600 hover:underline">
                サインアップ
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium"
              >
                ログイン
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}