"use Client";

import { CircleX } from "lucide-react";
import React from "react";
import useDessertStore from "@/store/desserts-store";

const CartCard = (props) => {
  const { name, quantity, price } = props;
  const total = (quantity * price).toFixed(2);
  const { removeItemByName } = useDessertStore();

  const handleRemoveItem = () => {
    removeItemByName(name);
  };

  return (
    <div className="flex flex-col text-xs mt-2 border-b py-4 group">
    <p className="text-xs font-extrabold flex items-center justify-between">
      {name}{" "}
      <CircleX
        size={18}
        className="cursor-pointer text-gray-400 group-hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={(e) => handleRemoveItem()}
      />
    </p>
    <div className="mt-2 flex justify-between gap-4">
      <div className="flex gap-4">
        <span className="text-[hsl(14,86%,42%)] font-bold">{quantity}x</span>{" "}
        <span>@{price.toFixed(2)}</span>
        <div></div>
      </div>{" "}
      <span>${total}</span>
    </div>
  </div>
  
  );
};

export default CartCard;
