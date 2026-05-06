export default function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full px-6 pt-6 pb-2">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span>Dilemma {current} of {total}</span>
          <span>{percentage}% complete</span>
        </div>
        <div className="w-full bg-gray-900 rounded-full h-1">
          <div
            className="bg-amber-600 h-1 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
