"use client";

import { useCallback, useEffect, useState } from "react";

type CommitAuthorState = {
  name: string;
  email: string;
};

const STORAGE_KEY = "themux:commit-author";
const defaultState: CommitAuthorState = { name: "", email: "" };

export function useCommitAuthor() {
  const [author, setAuthorState] = useState<CommitAuthorState>(defaultState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored) as Partial<CommitAuthorState>;
      setAuthorState({
        name: parsed.name ?? "",
        email: parsed.email ?? "",
      });
    } catch (error) {
      console.error("Failed to parse commit author from storage", error);
    }
  }, []);

  const setAuthor = useCallback((value: CommitAuthorState) => {
    setAuthorState(value);

    if (typeof window === "undefined") {
      return;
    }

    if (!value.name && !value.email) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }, []);

  return { author, setAuthor } as const;
}
