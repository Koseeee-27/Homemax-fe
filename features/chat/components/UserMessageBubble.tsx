import { useFormStatus } from "react-dom";

// app/(main)/chat/components/UserMessageBubble.tsx
interface Props {
  message: string | undefined | null; // ★ 配列から変更
}

export default function UserMessageBubble({ message }: Props) {
  const { pending } = useFormStatus(); // フォームの送信状態を取得
  return (
    <div className="h-96 w-80">
      <section className="h-full flex flex-col rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[...] backdrop-blur">
        <div className="flex-1 h-full overflow-y-auto space-y-4 pr-2">
          {!pending && message && (
            <div className="ml-auto max-w-[85%] rounded-2xl bg-indigo-200/60 px-4 py-3 text-right text-slate-800 shadow-sm">
              {message}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}