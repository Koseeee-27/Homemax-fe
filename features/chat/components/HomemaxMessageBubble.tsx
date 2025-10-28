import { useFormStatus } from "react-dom";
interface Props {
  message: string | undefined | null; // ★ 配列から変更
}

export default function HomemaxMessageBubble({ message }: Props) {
  const { pending } = useFormStatus(); // フォームの送信状態を取得
  return (
    <div className="mb-4 max-w-xs min-h-16 flex items-center">
      {/* ★ メッセージが存在する場合のみ表示 */}
      {!pending && message && (
        <div className="rounded-2xl bg-indigo-50/80 px-4 py-3 text-slate-700 shadow-sm">
          {message}
        </div>
      )}

    </div>
  );
}