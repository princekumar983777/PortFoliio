type Props = {
  value: number; // 0-100
  label?: string;
};

export default function ProgressBar({ value, label }: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div>
      {label && (
        <div className="mb-1 flex items-center justify-between text-sm">
          <span>{label}</span>
          <span className="tabular-nums text-gray-600 dark:text-gray-300">{clamped}%</span>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-neutral-800">
        <div
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 rounded-full bg-blue-600"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}


