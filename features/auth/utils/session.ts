import { cookies } from "next/headers"; // 'next/server' ではない
import { authCookieName } from "@/lib/config";
import type { User } from "@/features/auth/utils/authAtoms";
import * as jose from "jose";

/**
 * サーバーコンポーネント (layout.tsx) から呼び出す関数
 * クッキーを検証し、ユーザー情報を返す
 */
export async function getCurrentUser(): Promise<User | null> {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get(authCookieName);
  if (!tokenCookie) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) return null;

  try {
    const secretKey = new TextEncoder().encode(secret);

    interface JwtPayload {
      id: number;
      username: string;
    }

    const { payload } = await jose.jwtVerify<JwtPayload>(
      tokenCookie.value,
      secretKey
    );

    // 検証成功！ ペイロードからユーザー情報を返す
    return { id: payload.id, username: payload.username };
  } catch (error) {
    // 検証失敗
    return null;
  }
}
