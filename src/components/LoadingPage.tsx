import { Loader2Icon } from "lucide-react";
// import loader from "/images/loader_animation.gif";
export default function LoadingPage() {
  return (
    // <div className="flex flex-col justify-end bg-[url('/images/bg.png')] bg-cover flex-1">
    <div className="flex flex-col justify-end bg-black/10 bg-cover flex-1">
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full px-6 py-8 pb-24 mt-12 modal-body">
      <img src="/images/loader_animated.gif" alt="loader" />
        {/* <Loader2Icon className="animate-spin text-primary h-12 w-12" /> */}
      </div>
    </div>
  );
}
