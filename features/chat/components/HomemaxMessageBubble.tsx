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
        <div className="w-full max-w-md mx-auto rounded-3xl border border-amber-200/80 bg-amber-50/90 p-8 shadow-[0_20px_45px_rgba(228,164,90,0.2)] backdrop-blur-sm animate-in fade-in zoom-in-95">
          <p className="text-lg text-amber-900 leading-relaxed tracking-wider font-semibold text-center">
            {message}
          </p>
        </div>
      )}

    </div>
  );
}