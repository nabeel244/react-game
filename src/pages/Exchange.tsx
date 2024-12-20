import { useEffect, useState } from "react";
import useExchangeStore from "@/store/ceo-store";
import ListItem from "@/components/ListItem";
import LoadingPage from "@/components/LoadingPage";
import { cn } from "@/lib/utils";
import ExchangeDrawer from "@/components/ExchangeDrawer";
import { useUserStore } from "@/store/user-store";

export default function Exchange() {
  const {exchanges, fetchExchanges, signContract, loading } = useExchangeStore();
  const [isExchangeDrawerOpen, setIsExchangeDrawerOpen] = useState(false);
  const [activeExchange, setActiveExchange]: any = useState(null);
  const [selectedExchangeId, setSelectedExchangeId] = useState<number | null>(null);
  const user = useUserStore();
  const { updateSelectedExchange } = useUserStore((state) => ({
    updateSelectedExchange: state.updateSelectedExchange,
  }));
  useEffect(() => {
    fetchExchanges(); // Fetch exchanges on component mount
  }, [fetchExchanges]);

  useEffect(() => {
    // Set the active exchange if user.selected_exchange_id matches an exchange
    if (user.selected_exchange_id && exchanges.length > 0) {
      const matchedExchange = exchanges.find((ex) => ex.id === user.selected_exchange_id);
      setSelectedExchangeId(matchedExchange ? matchedExchange.id : null);
    }
  }, [user.selected_exchange_id, exchanges]);

  const handleExchangeClick = async (exchange: any) => {

    try {
      await signContract(exchange.id);
      setSelectedExchangeId(exchange.id);
      setActiveExchange(exchange);
      setIsExchangeDrawerOpen(true);
      updateSelectedExchange(exchange.id);
    } catch (error) {
      alert("Failed to sign contract. Please try again.");
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div
      className="flex flex-col justify-end bg-cover flex-1 pb-16"
      style={{
        background: "linear-gradient(90deg, rgba(127,0,255,0.2) 0%, rgba(62,0,116,0.83) 78%, rgba(43,0,78,1) 100%)",
      }}
    >
      <div className="flex flex-col flex-1 w-full h-full px-6 py-8 pb-24 modal-body">
        <h1 className="mt-4 text-2xl font-bold text-center uppercase">Choose Exchange</h1>
        {exchanges.length > 0 ? (
          <>
            <div className="mt-4 space-y-2">
              {exchanges.map((exchange) => (
                <ListItem
                  key={exchange.id}
                  title={exchange.name}
                  image={exchange.logo || "/images/bounty.png"}
                  onClick={() => handleExchangeClick(exchange)}
                  className={cn(
                    ""
                  )}
                  disabled={selectedExchangeId === exchange.id}
                  action={
                    selectedExchangeId === exchange.id ? (
                      <img src="/images/task_completed.png" alt="Task Completed" />
                    ) : (
                      <img src="/images/arrow_right.png" alt="Arrow Right" />
                    )
                  }
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center mt-8">No exchanges available at the moment.</p>
        )}
      </div>
      <ExchangeDrawer
        card={activeExchange}
        open={isExchangeDrawerOpen}
        onOpenChange={setIsExchangeDrawerOpen}
      />
    </div>
  );
}
