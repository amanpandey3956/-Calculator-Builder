import { useDroppable } from "@dnd-kit/core";
import { useCalculatorStore } from "../store";

export const DropZone = () => {
  const { setNodeRef } = useDroppable({ id: "dropzone" });
  const { components, removeComponent, expression, calculateResult, clearExpression } = useCalculatorStore();

  return (
    <div 
      ref={setNodeRef} 
      className="w-full max-w-md min-h-[250px] rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800 p-4 flex flex-col items-center"
    >
      <div className="w-full mb-2 p-3 border border-gray-400 bg-white dark:bg-gray-700 rounded text-lg font-mono text-gray-900 dark:text-gray-100 text-right">
        {expression || "Enter expression"}
      </div>

      {components.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Drop components here</p>
      ) : (
        <div className="grid grid-cols-4 gap-2 w-full">
          {components.map((comp) => (
            <button
              key={comp.id}
              className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 p-3 rounded shadow-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              onClick={() => removeComponent(comp.id)}
            >
              {comp.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <button onClick={calculateResult} className="bg-green-500 text-white p-3 rounded shadow hover:bg-green-600 transition">=</button>
        <button onClick={clearExpression} className="bg-red-500 text-white p-3 rounded shadow hover:bg-red-600 transition">Clear</button>
      </div>
    </div>
  );
};
