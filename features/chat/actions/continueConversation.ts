"use server";

export interface Message {
  id: string;
  role: "user" | "homemax";
  content: string;
}

export interface ChatState {
  // ★ 履歴ではなく、最新のメッセージ（ペア）だけを持つようにする
  // messages: Message[];
  latestUserMessage: Message | null;
  latestHomemaxMessage: Message | null;
  error: string | null;
}

const API_BASE_URL = process.env.API_BASE_URL;

export async function continueConversation(
  // ★ prevState を無視する（引数名は必要）
  prevState: ChatState,
  formData: FormData
): Promise<ChatState> {
  const userInput = formData.get("message") as string;
  const userIdStr = formData.get("userId") as string;

  if (!userInput.trim()) {
    return { latestUserMessage: null, latestHomemaxMessage: null, error: null };
  }

  const newUserMessage: Message = {
    id: crypto.randomUUID(),
    role: "user",
    content: userInput,
  };

  try {
    const letterRes = await fetch(`${API_BASE_URL}/letter/addLetter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: Number(userIdStr),
        message: userInput,
      }),
    });

    const letterData = await letterRes.json();
    if (!letterRes.ok || !letterData.result?.insertId) {
      throw new Error("レター登録に失敗しました");
    }
    const letter_id = letterData.result.insertId;

    const complimentRes = await fetch(`${API_BASE_URL}/api/compliment/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: Number(userIdStr),
        letter_message: userInput,
        letter_id: letter_id,
        mode: "default",
      }),
    });

    if (!complimentRes.ok) {
      throw new Error("APIエラーが発生しました");
    }

    const data = await complimentRes.json();

    const homemaxMessage: Message = {
      id: crypto.randomUUID(),
      role: "homemax",
      content: data.compliment,
    };

    // ★ 成功時：最新のメッセージペアだけを返す
    return {
      latestUserMessage: newUserMessage,
      latestHomemaxMessage: homemaxMessage,
      error: null,
    };
  } catch (error: any) {
    // ★ エラー時：ユーザーメッセージとエラーメッセージを返す
    const errorMessage: Message = {
      id: crypto.randomUUID(),
      role: "homemax",
      content: "ごめんなさい、うまく褒められませんでした...",
    };
    return {
      latestUserMessage: newUserMessage,
      latestHomemaxMessage: errorMessage,
      error: error.message,
    };
  }
}
