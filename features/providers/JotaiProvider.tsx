"use client";

import { Provider, useSetAtom } from 'jotai';
import { userAtom, type User } from '@/features/auth/utils/authAtoms';
import { ReactNode, useEffect } from 'react';

// Atomに初期値を設定する内部コンポーネント
function JotaiHydrator({ initialUser }: { initialUser: User | null }) {
  const setUser = useSetAtom(userAtom);

  // マウント時に一度だけ、サーバーから渡された値でAtomを初期化
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser, setUser]);

  return null;
}

// layout.tsx で使うプロバイダー
export default function JotaiProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User | null; // サーバーから渡すユーザー情報
}) {
  return (
    <Provider>
      <JotaiHydrator initialUser={initialUser} />
      {children}
    </Provider>
  );
}