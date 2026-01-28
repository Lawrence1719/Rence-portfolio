import { create } from "zustand";

interface TerminalStore {
  isOpen: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleTerminal: () => void;
}

export const useTerminal = create<TerminalStore>((set) => ({
  isOpen: false,
  openTerminal: () => set({ isOpen: true }),
  closeTerminal: () => set({ isOpen: false }),
  toggleTerminal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
