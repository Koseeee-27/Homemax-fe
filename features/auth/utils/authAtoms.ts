import { atom } from 'jotai';

// アプリ全体で使うユーザー情報の型
export interface User {
  username: string;
  id: number;
}

// ユーザー情報を保持するAtom
// 初期値は null (未認証)
// このAtomにサーバーから取得した情報を「注入」します
export const userAtom = atom<User | null>(null);