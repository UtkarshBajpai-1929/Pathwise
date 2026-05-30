"use client";

import { useEffect, useMemo } from "react";
import { Provider, useDispatch } from "react-redux";
import { fetchCompareWorkspace, fetchSavedCollegeIds } from "@/lib/client/workspace-api";
import { resetWorkspace, setCompare, setCompareHistory, setSaved, setUser } from "@/store/features";
import type { AppDispatch } from "@/store/store";
import { makeStore } from "@/store/store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => makeStore(), []);
  return (
    <Provider store={store}>
      <WorkspaceHydrator />
      {children}
    </Provider>
  );
}

function WorkspaceHydrator() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      try {
        const authResponse = await fetch("/api/auth/me");
        const authData = (await authResponse.json()) as {
          user: { id: string; name: string; email: string } | null;
        };

        if (!mounted) return;
        dispatch(setUser(authData.user));

        if (!authData.user) {
          dispatch(resetWorkspace());
          return;
        }

        const [savedIds, compare] = await Promise.all([
          fetchSavedCollegeIds(),
          fetchCompareWorkspace(),
        ]);

        if (!mounted) return;
        dispatch(setSaved(savedIds));
        dispatch(setCompare(compare.current?.collegeIds ?? []));
        dispatch(setCompareHistory(compare.history));
      } catch {
        if (mounted) dispatch(setUser(null));
      }
    };

    hydrate();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return null;
}
