import { create } from "zustand";

interface CalculatorState {
  components: { id: string; label: string }[];
  expression: string;
  addComponent: (component: { id: string; label: string }) => void;
  removeComponent: (id: string) => void;
  calculateResult: () => void;
  clearExpression: () => void;
  resetLayout: () => void;
}

// Load initial state from localStorage
const getInitialState = () => {
  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem("calculatorLayout");
    return savedState ? JSON.parse(savedState) : { components: [], expression: "" };
  }
  return { components: [], expression: "" };
};

export const useCalculatorStore = create<CalculatorState>((set) => ({
  ...getInitialState(),

  addComponent: (component) =>
    set((state) => {
      const updatedComponents = [...state.components, component];
      const updatedExpression = state.expression + component.label;

      // Save to localStorage
      localStorage.setItem("calculatorLayout", JSON.stringify({ components: updatedComponents, expression: updatedExpression }));

      return { components: updatedComponents, expression: updatedExpression };
    }),

  removeComponent: (id) =>
    set((state) => {
      const updatedComponents = state.components.filter((c) => c.id !== id);

      // Save to localStorage
      localStorage.setItem("calculatorLayout", JSON.stringify({ components: updatedComponents, expression: state.expression }));

      return { components: updatedComponents };
    }),

  calculateResult: () =>
    set((state) => {
      try {
        const result = eval(state.expression).toString();

        // Save result to localStorage
        localStorage.setItem("calculatorLayout", JSON.stringify({ components: state.components, expression: result }));

        return { expression: result };
      } catch {
        return { expression: "Error" };
      }
    }),

  clearExpression: () =>
    set(() => {
      localStorage.setItem("calculatorLayout", JSON.stringify({ components: [], expression: "" }));
      return { expression: "" };
    }),

  resetLayout: () =>
    set(() => {
      localStorage.removeItem("calculatorLayout");
      return { components: [], expression: "" };
    }),
}));
