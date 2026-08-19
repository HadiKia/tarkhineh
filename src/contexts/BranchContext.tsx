"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { useGetBranches } from "@/hooks/useBranches";
import type { Branch } from "@/types";

const SELECTED_BRANCH_STORAGE_KEY = "selectedBranchId";
const BRANCH_SELECTION_EVENT = "branch-selection-change";

type BranchContextValue = {
  branches: Branch[];
  selectedBranch: Branch | null;
  selectedBranchId: string | null;
  selectBranch: (branchId: string) => void;
  isLoading: boolean;
};

const BranchContext = createContext<BranchContextValue | null>(null);

const getStoredBranchId = () => {
  if (typeof window === "undefined") return null;

  return window.localStorage.getItem(SELECTED_BRANCH_STORAGE_KEY);
};

const subscribeToBranchSelection = (onStoreChange: () => void) => {
  if (typeof window === "undefined") return () => undefined;

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(BRANCH_SELECTION_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(BRANCH_SELECTION_EVENT, onStoreChange);
  };
};

const getServerBranchId = () => null;

export default function BranchProvider({ children }: { children: ReactNode }) {
  const { data, isFetching } = useGetBranches();
  const branches = useMemo(() => data?.branches ?? [], [data?.branches]);
  const storedBranchId = useSyncExternalStore(
    subscribeToBranchSelection,
    getStoredBranchId,
    getServerBranchId,
  );

  const selectedBranch = useMemo(
    () =>
      branches.find((branch) => branch._id === storedBranchId) ??
      branches[0] ??
      null,
    [branches, storedBranchId],
  );

  const persistBranchId = useCallback((branchId: string) => {
    window.localStorage.setItem(SELECTED_BRANCH_STORAGE_KEY, branchId);
    window.dispatchEvent(new Event(BRANCH_SELECTION_EVENT));
  }, []);

  const selectBranch = useCallback(
    (branchId: string) => {
      if (branches.some((branch) => branch._id === branchId)) {
        persistBranchId(branchId);
      }
    },
    [branches, persistBranchId],
  );

  useEffect(() => {
    if (branches.length === 0) return;

    const hasStoredBranch = branches.some(
      (branch) => branch._id === storedBranchId,
    );

    if (!hasStoredBranch) {
      persistBranchId(branches[0]._id);
    }
  }, [branches, persistBranchId, storedBranchId]);

  const value = useMemo<BranchContextValue>(
    () => ({
      branches,
      selectedBranch,
      selectedBranchId: selectedBranch?._id ?? null,
      selectBranch,
      isLoading: isFetching,
    }),
    [branches, isFetching, selectBranch, selectedBranch],
  );

  return (
    <BranchContext.Provider value={value}>{children}</BranchContext.Provider>
  );
}

export function useBranchContext() {
  const context = useContext(BranchContext);

  if (!context) {
    throw new Error("useBranchContext must be used within a BranchProvider");
  }

  return context;
}
