import { create } from "zustand";

interface CalculatorState {
  components: { id: string; label: string }[];
  expression: string;
  addComponent: (component: { id: string; label: string }) => void;
  removeComponent: (id: string) => void;
  calculateResult: () => void;
  clearExpression: () => void;
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
  components: [],
  expression: "",
  addComponent: (component) =>
    set((state) => ({
      components: [...state.components, component],
      expression: state.expression + component.label,
    })),
  removeComponent: (id) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
      expression: state.expression.replace(id, ""),
    })),
  calculateResult: () =>
    set((state) => {
      try {
        return { expression: eval(state.expression).toString() };
      } catch {
        return { expression: "Error" };
      }
    }),
  clearExpression: () => set(() => ({ expression: "" })),
}));
