interface EmptyStateProps {
  children?: React.ReactNode;
  onDemo: () => Promise<void>;
}

export default function EmptyState({
  children,
  onDemo,
}: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center">

      <p>
        {children ?? "No hay SetList cargado."}
      </p>

      <button
        className="btn btn-primary"
        onClick={onDemo}
      >
        Probar Demo
      </button>

    </div>
  );
}