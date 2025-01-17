"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CircleMinus, CirclePlus } from "lucide-react";
import useDessertStore from "@/store/desserts-store";

export const DessertCard = (props) => {
  const { img, category, name , price } = props;
  const { mobile, tablet, desktop ,thumbnail} = img;
  const [quantity, setQuantity] = useState(0);
  const { setCart, cart } = useDessertStore();

  const handleQuantity = (action) => {
    try {
      switch (action) {
        case "add":
          setCart(name, quantity+1, price, thumbnail)
          setQuantity((prev) => prev + 1);
          break;
        case "remove":
          if (!quantity) return;
          setCart(name, quantity-1, price, thumbnail)
          setQuantity((prev) => prev - 1);
          break;
        default:
          console.log("Invalid Action!");
          break;
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const itemInCart = cart.find(item => item.name === name);
    if (!itemInCart) {
      setQuantity(0);
    }
  }, [cart,name]);

  return (
    <div>
      <div className="relative w-full">
        <Image
          src={desktop}
          width={100}
          height={100}
          alt={name}
          className={`w-full rounded-lg ${quantity ? "box-border border-2 border-[hsl(14,86%,42%)]":""}`}
        />

        <div className="absolute -bottom-4 w-32 left-1/2 transform -translate-x-1/2">
         {!quantity ? 
         <p className="flex items-center justify-between gap-2 w-full border bg-white border-[hsl(14,86%,42%)] p-1.5 px-4 rounded-full text-white cursor-pointer" onClick={(e)=>handleQuantity("add")}>
           <Image src="/desserts/images/icon-add-to-cart.svg" width={18} height={18} alt="cart"/>
           <span className="text-black text-sm whitespace-nowrap">
           Add to cart
           </span>
         </p>
         : <p className="flex items-center justify-between w-full min-w-32 bg-[hsl(14,86%,42%)] p-1.5 px-4 rounded-full text-white">
            <CircleMinus
              size={19}
              className="cursor-pointer"
              onClick={(e) => handleQuantity("remove")}
            />
            {quantity}
            <CirclePlus
              size={19}
              className="cursor-pointer"
              onClick={(e) => handleQuantity("add")}
            />
          </p>}
        </div>
      </div>
      <div className="mt-5">
        <span className="text-xs text-gray-400">{category}</span>
        <p className="text-xs">{name}</p>
        <span className="text-[hsl(14,86%,42%)] text-sm font-semibold">${price.toFixed(2)}</span>
      </div>
    </div>
  );
};

