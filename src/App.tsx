import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { DropZone } from "./components/DropZone";
import { DraggableButton } from "./components/DraggableButton";
import { useCalculatorStore } from "./store";

const App = () => {
  const { addComponent } = useCalculatorStore();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleDragEnd = (event: any) => {
    const { active } = event;
    if (active) {
      addComponent({ id: active.id, label: active.id });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen flex flex-col items-center gap-4 p-10 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded shadow"
        >
          Switch Mode
        </button>
        <div className="flex gap-2 flex-wrap">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/"].map((label) => (
            <DraggableButton key={label} id={label} label={label} />
          ))}
        </div>
        <DropZone />
      </div>
    </DndContext>
  );
};

export default App;
