import { useDraggable } from "@dnd-kit/core";

export const DraggableButton = ({ id, label }: { id: string; label: string }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600 transition"
      style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined }}
    >
      {label}
    </button>
  );
};