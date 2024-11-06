import { useCallback, useEffect, useState } from "react";
import CardComponent from "./components/CardProduct";
import data from "./utils/data.json";
import ItemInCart from "./components/ItemInCart";
import { formatPrice } from "./utils/formatPrice";
import ModalConfirmOrder from "./components/ModalConfirmOrder";
import useWindowSize from "./utils/resize";

function App() {
  const [listCart, setListCart] = useState([]);
  const [removeItemCard, setRemoveItemCard] = useState([]);
  const [observable, setObservable] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalCart, setTotalCart] = useState(0);
  const [modalConfirmOrder, setModalConfirmOrder] = useState(false);
  const [resetSelectorCuantity, setResetSelectorCuantity] = useState(false);
  const { width, height } = useWindowSize();

  const handleCuantityItemChange = useCallback(
    (newCuantityItem) => {
      listCart.forEach((item) => {
        if (item.productoSeleccionado.id === newCuantityItem.idProduct) {
          item.cuantity = newCuantityItem.selectorCuantity;
        }
      });
      setTotalCart(listCart.reduce((acc, item) => acc + item.cuantity, 0));
      setTotal(
        formatPrice(
          listCart.reduce(
            (acc, item) =>
              acc + item.cuantity * item.productoSeleccionado.price,
            0
          )
        )
      );
    },
    [listCart]
  );

  const addProductToCart = (id) => {
    if (resetSelectorCuantity) {
      setResetSelectorCuantity(false);
    }
    if (observable) {
      setObservable(false);
    }
    let productoSeleccionado = data.filter((product) => product.id === id);
    setListCart([
      ...listCart,
      { productoSeleccionado: productoSeleccionado[0], cuantity: 1 },
    ]);
  };

  const removeOrder = () => {
    setResetSelectorCuantity(true);
    setListCart([]);
  };

  const removeItem = (id) => {
    setObservable(true);
    setRemoveItemCard(id);
    setListCart(listCart.filter((item) => item.productoSeleccionado.id !== id));
  };

  return (
    <div className="bg-[#FCF8F5] px-4 py-12 xl:px-12 2xl:w-10/12 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-10">
        <div className="grid col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
          <h1 className="text-4xl font-bold pb-8">Desserts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {data.map((product) => (
              <CardComponent
                key={product.id}
                idProduct={product.id}
                urlImage={width < 768 ? product.image.mobile : product.image.desktop}
                nameMenu={product.name}
                categoryMenu={product.category}
                priceMenu={product.price}
                addCart={(e) => addProductToCart(e)}
                onCuantityItemChange={handleCuantityItemChange}
                removeItem={{ removeItemCard, observable }}
                resetSelectorCuantity={resetSelectorCuantity}
              />
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl h-min px-4 pb-8">
          <h2 className="text-2xl font-bold text-[#C83B0E] p-4">
            Your Cart({totalCart})
          </h2>
          {listCart.length === 0 ? (
            <div className="flex flex-col justify-center items-center">
              <img
                className="h-[130px] w-[130px]"
                src="./icons/illustration-empty-cart.svg"
                alt="empty"
              />
              <h3 className="text-[#ABA3A0] font-semibold">
                Your added items will appear here
              </h3>
            </div>
          ) : (
            <>
              <div className="w-full px-4">
                {listCart.map((item) => (
                  <ItemInCart
                    key={item.productoSeleccionado.id}
                    item={item}
                    onClickRemove={(id) => removeItem(id)}
                  />
                ))}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center py-4">
                    <span>Order Total</span>
                    <span className="font-bold text-black text-2xl">
                      {total}
                    </span>
                  </div>
                  <span className="flex items-center text-[12px] xl:text-[16px] rounded-xl justify-center gap-2 p-4 bg-[#FCF8F5]">
                    <img src="./icons/icon-carbon-neutral.svg" alt="neutral" />
                    This is a<strong>carbon-neutral</strong>delivery
                  </span>
                  <button
                    onClick={() => setModalConfirmOrder(true)}
                    className="w-full bg-[#C83B0E] text-white font-bold py-4 rounded-full hover:brightness-90"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>

              {modalConfirmOrder && (
                <ModalConfirmOrder
                  items={listCart}
                  setShowModal={setModalConfirmOrder}
                  orderFinish={removeOrder}
                  total={total}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
