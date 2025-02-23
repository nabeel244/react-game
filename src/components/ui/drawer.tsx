import React, { useEffect } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
// import CloseIcon from "../icons/CloseIcon";
import { useBlocker } from "react-router-dom";

export type DrawerProps = {
  hideClose?: boolean;
} & React.ComponentProps<typeof DrawerPrimitive.Root>;

export default function Drawer({ hideClose, children, ...props }: DrawerProps) {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname && !!props.open
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      props.onOpenChange?.(false);
      blocker.reset();
    }
  }, [blocker.state]);

  return (
    <DrawerPrimitive.Root {...props}>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 bg-[#272a2fb3]" />
        <DrawerPrimitive.Content className="fixed mt-24 z-[99] rounded-t-[40px] bottom-0 left-0 right-0 "
        style={{
          background: 'linear-gradient(180deg, #2D033B 0%, #0F0D3F 100%)',
          borderTop: '1px solid #670EAF',
        }}
        >
          <div className="overflow-y-auto modal-body max-h-[calc(100vh-6rem)]">
            {!hideClose && (
              <DrawerPrimitive.Close>
                <div className="absolute right-5 top-5 text-[#4e4f50] transition-all hover:text-[#8b8e93]">
                  <img src="/images/close_icon.png" alt="close" />
                  {/* <CloseIcon className="text-white w-7 h-7" /> */}
                </div>
              </DrawerPrimitive.Close>
            )}
            <DrawerPrimitive.Title className="invisible">
              Drawer
            </DrawerPrimitive.Title>
            <div className="px-6 py-12">{children}</div>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
