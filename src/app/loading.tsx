import { FrameHighlight } from "@/components/frame-highlight";

export default function Loading() {
  return (
    <div className="inset-0 m-auto h-screen content-center text-center font-mono text-3xl font-semibold">
      <FrameHighlight>loading...</FrameHighlight>
    </div>
  );
}
