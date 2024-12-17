import Drawer, { DrawerProps } from "./ui/drawer";

export default function ExchangeDrawer({
    card,
    ...props
}: DrawerProps & { card: any | null }) {
    return (
        <>
            <Drawer {...props}>
                {card && (
                    <div className="p-4 text-center rounded-lg shadow-xl">
                        {/* Exchange Logo */}
                        <div className="flex justify-center">
                            <img
                                src={card.logo || "/images/market_ceo.png"}
                                alt={card.name}
                                style={{ width: "100px", height: "100px" }}
                            />
                        </div>

                        {/* Success Message */}
                        <h2 className="mt-6 text-lg text-white">
                            You’ve signed a contract with {card.name}
                        </h2>

                        {/* CTA Button */}
                        <button
                            className="w-full py-3 mt-6 font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 focus:ring-2 focus:ring-blue-300"
                            onClick={() => props.onOpenChange && props.onOpenChange(false)} // Ensure onOpenChange exists
                        >
                            Good luck, CEO
                        </button>

                    </div>
                )}
            </Drawer>
        </>
    );
}
