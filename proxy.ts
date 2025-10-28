// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authCookieName } from "./lib/config";
import * as jose from 'jose';

// 2. ミドルウェアを適用するパス（保護したいページ）を定義
export const config = {
  matcher: [
    "/history/:path*",
    "/analytics/:path*",
  ],
};

// 3. ミドルウェア本体
export default async function proxy(request: NextRequest) {
  // 4. リクエストから認証Cookieを取得
  const token = request.cookies.get(authCookieName);

  // 5. Cookieがない（未認証）場合
  if (!token) {
    // ログインページへリダイレクト
    // request.url を使うと、現在のURLを保持したままリダイレクトURLを構築できます
    const redirectUrl  = new URL("/", request.url);

    return NextResponse.redirect(redirectUrl);
  }

  try {
    const secret = process.env.JWT_SECRET;
    if(!secret) {
      throw new Error("JWT_SECRETが設定されていません");
    }

    // 秘密鍵をjoseが使える形式に変換
    const secretKey = new TextEncoder().encode(secret);

    // トークンを検証
    await jose.jwtVerify(token.value, secretKey);

    // 検証に成功した場合はそのままページに進む
    return NextResponse.next();

  } catch (error) {
    console.warn("JWTの検証に失敗しました:", error);

    const redirectUrl = new URL('/', request.url);
    return NextResponse.redirect(redirectUrl);
  }
}
