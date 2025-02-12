import { useDroppable } from "@dnd-kit/core";
import { useCalculatorStore } from "../store";

export const DropZone = () => {
  const { setNodeRef } = useDroppable({ id: "dropzone" });
  const { components, removeComponent, expression, calculateResult, clearExpression } = useCalculatorStore();

  return (
    <div ref={setNodeRef} className="border-dashed border-2 border-gray-500 p-10 min-h-[200px] rounded-lg shadow-md bg-gray-100 dark:bg-gray-800">
      <div className="mb-2 p-2 border border-gray-400 bg-white dark:bg-gray-700 rounded text-lg font-mono text-gray-900 dark:text-gray-100">
        {expression || "Enter expression"}
      </div>
      {components.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Drop components here</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {components.map((comp) => (
            <button
              key={comp.id}
              className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 p-2 m-1 rounded shadow-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              onClick={() => removeComponent(comp.id)}
            >
              {comp.label}
            </button>
          ))}
        </div>
      )}
      <div className="mt-4 flex gap-2">
        <button onClick={calculateResult} className="bg-green-500 text-white p-2 rounded shadow hover:bg-green-600 transition">=</button>
        <button onClick={clearExpression} className="bg-red-500 text-white p-2 rounded shadow hover:bg-red-600 transition">Clear</button>
      </div>
    </div>
  );
};
