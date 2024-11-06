import { formatPrice } from "../utils/formatPrice";

export default function ItemInCart({item, onClickRemove}) {
    return(
        <div className="flex items-center justify-between w-full border-b-[1px] pb-4 border-[#d8d8d8]">
            <div className="flex flex-col w-full">
                <p className="pb-[1.5px] font-semibold">{item.productoSeleccionado.name}</p>
                <div className="flex gap-4 items-center">
                    <p className="text-[#C83B0E] text-sm font-bold">{item.cuantity}X</p>
                    <div className="flex gap-2 items-center">
                        <span className="text-[#8A7874]">@{formatPrice(item.productoSeleccionado.price)}</span>
                        <span className="font-semibold text-[#8A7874]">{formatPrice(item.productoSeleccionado.price * item.cuantity)}</span>
                    </div>
                </div>
            </div>
            <button onClick={() => onClickRemove(item.productoSeleccionado.id)} className="rounded-full border-2 h-max w-max border-[#8A7874] p-2 hover:border-black"><img src="./icons/icon-remove-item.svg" className="h-min w-min" alt="remove item icon"/></button>
        </div>
    )
}