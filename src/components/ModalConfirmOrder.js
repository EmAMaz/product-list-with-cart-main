import ItemModalOrder from "./ItemModalOrder";

export default function ModalConfirmOrder({
  items,
  orderFinish,
  total,
  setShowModal,
}) {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-zinc-800 opacity-75"></div>
          </div>
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <div className="mt-2">
              <img
                src="./icons/icon-order-confirmed.svg"
                alt="order confirmed icon"
              />
              <h1 className="text-2xl md:text-3xl font-bold mt-4">Order Confirmed</h1>
              <p className="text-sm md:text-lg mt-2 text-zinc-400">We hope you enjoy your food!</p>
            </div>
            <ul className="p-4 bg-[#FCF8F5] rounded-lg my-6 flex flex-col gap-4">
              {items.map((item) => (
                <ItemModalOrder key={item.id} item={item} />
              ))}
              <div className="flex justify-between items-center py-4">
                <span className="font-semibold text-base md:text-base">Order Total</span>
                <span className="font-bold text-black text-xl md:text-2xl">{total}</span>
              </div>
            </ul>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  orderFinish();
                }}
                className="w-full bg-[#C83B0E] text-sm md:text-lg text-white font-bold py-4 rounded-full hover:brightness-90"
              >
                Start New Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
