export const API_BASE_URL = process.env.API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("Missing env: API_BASE_URL");
}

export const isProd = process.env.NODE_ENV === "production";

// 共通のクッキー設定
export const authCookieName = "auth_token";
export const authCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax" as const,
  path: "/",
  // 7日
  maxAge: 60 * 60 * 24 * 7,
};