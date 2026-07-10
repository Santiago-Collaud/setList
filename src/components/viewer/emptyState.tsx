interface EmptyStateProps {
  children?: React.ReactNode;
}

export default function EmptyState({ children }: EmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      {children ?? "No hay SetList cargado."}
    </div>
  );
}