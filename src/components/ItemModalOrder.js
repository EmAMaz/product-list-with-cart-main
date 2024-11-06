import { formatPrice } from "../utils/formatPrice";

export default function ItemModalOrder({ item }) {
  return (
    <li className="flex items-center justify-between border-b-[1px] pb-4 border-[#d8d8d8]">
      <div className="flex gap-2">
        <img
          className="rounded-lg h-[60px] w-[60px]"
          src={item.productoSeleccionado.image.thumbnail}
          alt="tiramisu icon"
        />
        <div>
          <p className="font-semibold">{item.productoSeleccionado.name}</p>
          <div className="flex gap-2 items-center">
            <p className="text-[#C83B0E] font-bold text-sm">{item.cuantity}X</p>
            <p className="text-[#847878] text-sm">@{formatPrice(item.productoSeleccionado.price)}</p>
          </div>
        </div>
      </div>
      <span className="font-semibold">{formatPrice(item.productoSeleccionado.price * item.cuantity)}</span>
    </li>
  );
}
