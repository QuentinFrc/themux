"use client";

import { useEffect } from "react";
import { type Options, scan } from "react-scan";

interface ReactScanProps {
  options?: Options;
}

export function ReactScan({ options }: ReactScanProps) {
  useEffect(() => {
    scan({
      ...options,
    });
  }, [options]);
  return <></>;
}
