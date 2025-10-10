export type Status<TData = undefined> =
  | { success: true; data: TData }
  | { success: false; error: string; cause?: unknown };
