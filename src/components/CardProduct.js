import { useEffect, useState } from "react";
import { formatPrice } from "../utils/formatPrice";

export default function CardComponent({
  idProduct,
  urlImage,
  nameMenu,
  categoryMenu,
  priceMenu,
  addCart,
  removeItem,
  onCuantityItemChange,
  resetSelectorCuantity,
}) {
  const [selectorCuantity, setSelectorCuantity] = useState(0);

  useEffect(() => {
    if(resetSelectorCuantity) {
      setSelectorCuantity(0);
    };
    if (removeItem.removeItemCard === idProduct && removeItem.observable) {
      setSelectorCuantity(0);
    }
  }, [idProduct, removeItem, resetSelectorCuantity]);

  const decrementQuantity = (id) => {
    if (selectorCuantity === 1) return;
    setSelectorCuantity(selectorCuantity - 1);
  };

  const icrementQuantity = (id) => {
    setSelectorCuantity(selectorCuantity + 1);
  };

  useEffect(() => {
    onCuantityItemChange({ selectorCuantity, idProduct });
  }, [onCuantityItemChange, idProduct, selectorCuantity]);

  return (
    <div className="min-w-full sm:w-1/4 lg:w-2/12">
      <div className="rounded-xl">
        <div className="relative pb-4 mb-2 flex justify-center">
          <img
            className="rounded-xl object-cover"
            src={urlImage}
            alt="product"
          />
          {selectorCuantity > 0 ? (
            <div className="rounded-full py-3 px-4 cursor-pointer text-[#1E1614] border-[1.8px] absolute bottom-0 hover:border-[#C83B0E] bg-[#C83B0E]">
              <div className="flex gap-2">
                <img
                  onClick={() => decrementQuantity(idProduct)}
                  src="./icons/icon-decrement-quantity.svg"
                  alt="cart"
                />
                <span className="text-white mx-4">{selectorCuantity}</span>
                <img
                  onClick={() => icrementQuantity(idProduct)}
                  src="./icons/icon-increment-quantity.svg"
                  alt="cart"
                />
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                setSelectorCuantity(selectorCuantity + 1);
                addCart(idProduct, selectorCuantity);
              }}
              className="rounded-full bg-white py-3 px-4 cursor-pointer text-[#1E1614] border-[1.8px] border-[#1E1614] absolute bottom-0 hover:text-[#C83B0E] hover:border-[#C83B0E]"
            >
              <div className="flex gap-2">
                <img src="./icons/icon-add-to-cart.svg" alt="cart" />
                <span className="text-sm font-bold">Add to cart</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <h3 className="text-[#ABA3A0]">{categoryMenu}</h3>
      <p className="font-bold">{nameMenu}</p>
      <span className="text-[#C83B0E] font-bold">{formatPrice(priceMenu)}</span>
    </div>
  );
}
