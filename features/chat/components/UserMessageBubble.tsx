import { useFormStatus } from "react-dom";
interface Props {
  message: string | undefined | null; // ★ 配列から変更
}

export default function UserMessageBubble({ message }: Props) {
  const { pending } = useFormStatus(); // フォームの送信状態を取得
  return (
    <>
      {!pending && message && (
        <div className="ml-auto max-w-[85%] rounded-2xl bg-indigo-200/60 px-4 py-3 text-right text-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-4">
          {message}
        </div>
      )}
    </>
  );
}