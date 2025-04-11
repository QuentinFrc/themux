"use client";

import React, { use } from "react";

type CollapsibleCustomizerContextProps = {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const CollapsibleCustomizerContext = React.createContext<
  CollapsibleCustomizerContextProps | undefined
>(undefined);

export function CollapsibleCustomizerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <CollapsibleCustomizerContext value={{ isExpanded, setIsExpanded }}>
      {children}
    </CollapsibleCustomizerContext>
  );
}

export function useCollapsibleCustomizer() {
  const context = use(CollapsibleCustomizerContext);

  if (!context) {
    throw Error(
      "useCollapsibleCustomizer must be used withing a 'CollapsibleCustomizerContext' provider",
    );
  }

  return context;
}
