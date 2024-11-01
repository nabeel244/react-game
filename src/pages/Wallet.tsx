import ListItem from "@/components/ListItem";
// import CheckIcon from "@/components/icons/CheckIcon";
import Drawer from "@/components/ui/drawer";
import { useTonConnect } from "@/hooks/useTonConnect";
import useTonPay from "@/hooks/useTonPay";
import { CHAIN, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import {  Loader2Icon, Wallet2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
// import { useUserStore } from "@/store/user-store";
import { Button } from "@/components/ui/button";

export default function Wallet() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const [, copy] = useCopyToClipboard();
  const tonAddress = useTonAddress();
  const { connected: isConnected, network } = useTonConnect();

  // const user = useUserStore();

  const tonPay = useTonPay({
    onSuccess: () => toast.success("Your transaction has been completed"),
    onError: () => toast.error("Request rejected"),
  });

  // useEffect(() => {
  //   if (tonAddress) {
  //     $http.post("/clicker/set-ton-wallet", { ton_wallet: tonAddress });
  //   }
  // }, [tonAddress]);

  return (
    // <div className="flex flex-col justify-end bg-cover flex-1" style={{backgroundImage: `url(${levelConfig.bg[user?.level?.level || 1]})`,}}>
    <div className="flex flex-col justify-end bg-cover flex-1"
    style={{
      background: 'linear-gradient(90deg, rgba(127,0,255,0.2) 0%, rgba(62,0,116,0.83) 78%, rgba(43,0,78,1) 100%)',
    }}
    >
      <div className="flex flex-col flex-1 w-full h-full px-6 py-8 pb-24 modal-body">
        <img
          src="/images/aridrop.png"
          alt="toncoin"
          className="object-contain w-32 h-32 mx-auto"
        />
        <h1 className="mt-4 text-2xl font-bold text-center uppercase">
        Airdrop task
        </h1>
        <p className="mt-2.5 font-small text-center text-gray-400">
        Listing is on its way. Tasks will appear below. Complete them to participate in the Airdrop
        </p>

        <div className="mt-4 space-y-2">
          <ListItem
            title={"Pay"}
            image="/images/connect_wallet.png"
            style={{ backgroundColor: '#6D00DA' }}
            onClick={async () => {
              if (network !== CHAIN.MAINNET) {
                toast.error("Please switch to mainnet");
                return;
              }
              tonPay.send(0.001, "CryptoCoin Payment");
            }}
          />
          <ListItem
            title={"Connect your TON Wallet"}
            image="/images/connect_wallet.png"
            onClick={() => setOpenDrawer(true)}
            style={{ backgroundColor: '#6D00DA' }}
            // action={isConnected && <CheckIcon className="text-green-500" />}
            action = {
              isConnected ? 
              (
                <img src="/images/task_completed.png" alt="checked" />
                    ) : <img src="/images/arrow_right.png" alt="checked" />
            }
          />
        </div>
      </div>
      <Drawer open={tonPay.isLoading} hideClose>
        <div className="flex flex-col items-center justify-center">
          <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
          <p className="mt-4">
            Waiting for transaction to complete proccessing...
          </p>
        </div>
      </Drawer>
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <div className="mb-4">
          <img
            src={"/images/connect_wallet.png"}
            alt={"wallet"}
            className="object-contain mx-auto w-28 h-28"
          />
        </div>
        <h2 className="mb-3 text-3xl font-bold text-center">
          {isConnected
            ? "Your TON wallet is connected"
            : "Connect your TON wallet"}
        </h2>
        <p className="mx-auto mb-6 text-sm text-center max-w-72">
          {isConnected
            ? "You can disconnect it or copy wallet address"
            : "Connect your crypto wallet. If you don't have one, create one in your Telegram account"}
        </p>
        {isConnected ? (
           <>
           <div className="flex gap-2">
           <button
             className="flex-1 bg-[#ffffff1a] text-[#999a9c] rounded-full text-sm px-4 h-11 flex items-center"
           >
             <span className="font-semibold text-white">
               {tonAddress.slice(0, 8)}...
               {tonAddress.slice(-8, tonAddress.length)}
             </span>
          
           </button>
           <Button
             className="flex bg-gradient-to-r from-[#03F6F4] to-[#03F6F4] rounded-full"
             onClick={() => {
               copy(tonAddress);
               toast.success("Copied to clipboard");
             }}
           >
             <img src="/images/copy_icon.png" alt="" />
           </Button>
           </div>
           <button
             className="flex items-center justify-center py-0 px-3 mt-2 font-bold h-11 text-sm w-full bg-gradient-to-r from-purple-700 to-cyan-400 shadow-md rounded-full text-white"
             onClick={() => tonConnectUI.disconnect()}
           >
             Disconnect Wallet
           </button>
           </>
          // <div className="flex gap-2">
          //   <button
          //     className="bg-[#ffffff1a] text-[#999a9c] rounded-xl text-sm px-4 h-11 flex items-center"
          //     onClick={() => tonConnectUI.disconnect()}
          //   >
          //     <XIcon className="w-6 h-6" />
          //   </button>
          //   <button
          //     className="flex-1 bg-[#ffffff1a] text-[#999a9c] rounded-xl text-sm px-4 h-11 flex items-center"
          //     onClick={() => {
          //       copy(tonAddress);
          //       toast.success("Copied to clipboard");
          //     }}
          //   >
          //     <Wallet2Icon className="w-6 h-6 mr-2" />
          //     <span className="font-semibold text-white">
          //       {tonAddress.slice(0, 8)}...
          //       {tonAddress.slice(-8, tonAddress.length)}
          //     </span>
          //     <div className="ml-auto">
          //       <img src="/images/connect_ton_icon.png" alt="" />
          //       {/* <CopyIcon className="w-5 h-5" /> */}
          //     </div>
          //   </button>
          // </div>
        ) : (
         
          <button
            className="flex items-center justify-center py-0 px-3 font-bold h-11 text-sm w-full bg-gradient-to-r from-purple-700 to-cyan-400 shadow-md rounded-full text-white"
            onClick={() => {
              tonConnectUI.openModal();
              setOpenDrawer(false);
            }}
          >
            <Wallet2Icon className="w-6 h-6 mr-2" />
            Connect your TON wallet
          </button>
        )}
      </Drawer>
    </div>
  );
}
