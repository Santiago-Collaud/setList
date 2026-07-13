interface ControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

export default function Controls({
  onPrevious,
  onNext,
}: ControlsProps) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        className="btn btn-primary flex-1 h-32"
        onClick={onPrevious}
      >
        ◀
      </button>
      <button
        className="btn btn-primary flex-1 h-32"
        onClick={onNext}
      >
        ▶
      </button>

    </div>
  );
}