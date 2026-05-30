"use client";

import type { CompareSnapshot } from "@/store/features";

type ApiErrorPayload = {
  error?: string;
};

const requestJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const data = (await response.json().catch(() => ({}))) as ApiErrorPayload;

  if (!response.ok) {
    throw new Error(data.error ?? "Request failed");
  }

  return data as T;
};

export const fetchSavedCollegeIds = async () => {
  const data = await requestJson<{ saved: { collegeId: string }[] }>("/api/saved");
  return data.saved.map((item) => item.collegeId);
};

export const saveCollege = async (collegeId: string) =>
  requestJson<{ saved: { collegeId: string } }>("/api/saved", {
    method: "POST",
    body: JSON.stringify({ collegeId }),
  });

export const removeSavedCollege = async (collegeId: string) =>
  requestJson<{ ok: true }>("/api/saved", {
    method: "DELETE",
    body: JSON.stringify({ collegeId }),
  });

export const fetchCompareWorkspace = async () =>
  requestJson<{
    current: CompareSnapshot | null;
    history: CompareSnapshot[];
  }>("/api/compare");

export const saveCompareWorkspace = async (collegeIds: string[]) =>
  requestJson<{
    current: CompareSnapshot | null;
    history: CompareSnapshot[];
  }>("/api/compare", {
    method: "PUT",
    body: JSON.stringify({ collegeIds }),
  });
