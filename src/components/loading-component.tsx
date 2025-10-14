import { FrameHighlight } from "./frame-highlight";

export function LoadingComponent() {
  return (
    <div className="inset-0 m-auto h-screen content-center text-center font-mono font-semibold text-3xl">
      <FrameHighlight>loading...</FrameHighlight>
    </div>
  );
}
