"use client";

import { useSyncExternalStore } from "react";

export function useMounted() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}
