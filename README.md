# ほめマックス (HomeMAX) - フロントエンド

あなたの毎日を肯定し、褒めてくれるAIパートナー「ほめマックス」のNext.jsフロントエンドリポジトリです。

## 概要

このアプリケーションは、ユーザーが日々の出来事を「手紙」として送信すると、AI（Google Gemini）がそれを読み、ポジティブな側面を見つけて褒めてくれるチャットアプリです。
ユーザーは認証機能を通じて自分の対話履歴を安全に保存できます。

**※注意:** このリポジトリはフロントエンドのみを含みます。動作には別途バックエンドAPIサーバーが必要です。

## 🚀 技術スタック (Frontend)

* **Framework**: Next.js (App Router)
* **State Management**: Jotai
* **Styling**: Tailwind CSS
* **Authentication**: Server Actions + `jose` (JWT検証) + HttpOnly Cookie
* **Animation**: Framer Motion (予定)

## 🛠️ 環境構築

### 1. 依存関係のインストール

```bash
npm install
```
### 2. 環境変数の設定
プロジェクトのルートに .env.local ファイルを作成します。 backend サーバーのURLなど、必要な情報を .env.example を参照して設定してください。

```bash

# .env.example をコピーして作成
cp .env.example .env.local
```
### 3. 開発サーバーの起動
```bash
npm run dev
```
ブラウザで http://localhost:3000 を開いてください。

## 🔑 必要な環境変数
セットアップには以下の環境変数が必要です。詳細は.env.exampleを参照してください。

NEXT_PUBLIC_API_BASE_URL: クライアントサイドから参照するバックエンドAPIのURL (例: http://localhost:8000)

API_BASE_URL: サーバーサイドから参照するバックエンドAPIのURL (例: http://localhost:8000)

JWT_SECRET: バックエンドと共通のJWT秘密鍵 (32文字以上)