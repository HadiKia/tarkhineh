"use client";

import { createContext, useContext, type ReactNode } from "react";

import useMenuFilters from "@/hooks/useMenuFilters";

interface MenuProviderProps {
  children: ReactNode;
}

export interface MenuContextValue {
  selectedMealCourse: string | null;
  selectedFoodGroup: string | null;
  selectedSearch: string | null;

  initializeMealCourse: (englishTitle: string) => void;

  onSelectMealCourse: (englishTitle: string | null) => void;
  onSelectFoodGroup: (englishTitle: string | null) => void;
  onSearch: (value: string | null) => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export default function MenuProvider({ children }: MenuProviderProps) {
  const value = useMenuFilters();

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenuContext() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }

  return context;
}
