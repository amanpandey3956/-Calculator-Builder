import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { DropZone } from "./components/DropZone";
import { DraggableButton } from "./components/DraggableButton";
import { useCalculatorStore } from "./store";

const App = () => {
  const { addComponent, resetLayout } = useCalculatorStore();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const handleDragEnd = (event: any) => {
    const { active } = event;
    if (active) {
      addComponent({ id: active.id, label: active.id });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
        
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center">
          
          <div className="flex gap-2 w-full mb-4">
            <button
              onClick={toggleDarkMode}
              className="flex-1 p-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded shadow"
            >
              Switch Mode
            </button>

            <button
              onClick={resetLayout}
              className="flex-1 p-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600"
            >
              Reset Layout
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 w-full mb-4">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/"].map((label) => (
              <DraggableButton key={label} id={label} label={label} />
            ))}
          </div>

          <DropZone />
        </div>

      </div>
    </DndContext>
  );
};

export default App;
