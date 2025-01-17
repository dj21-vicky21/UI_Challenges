"use client";

import React, { useEffect, useState } from "react";
import data from "./_component/data/data.json";
import useDessertStore from "@/store/desserts-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import OrderConfirmation from "./_component/OrderConfirmation";
import { DessertCard } from "./_component/DessertCard";
import CartCard from "./_component/CartCard";

const DessertsPage = () => {
  const { cart, totalPrice, resetCart } = useDessertStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (value) => {
    if (value) {
      setIsOpen(false);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (!isOpen) resetCart();

    setTimeout(() => {
      if (!isOpen) return;
      resetCart();
      handleOpenModal("close");
    }, 3000);
    
  }, [isOpen,resetCart]);

  return (
    <section className="flex justify-center gap-8 w-full shadow-[0px_0px_5px_0px_rgba(0,_0,_0,_0.1)] p-10 bg-[hsl(20,50%,98%)]">
      <div
        className={cn(
          "grid grid-cols-1 gap-7 transition-all duration-500 ease-in-out",
          cart.length > 0 ? "sm:w-2/6 md:w-4/6" : "w-full"
        )}
      >
        <h1 className="text-2xl sm:text-4xl font-bold">Desserts</h1>
        <div
          className={cn(
            "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4",
            cart.length != 0 && "grid-cols-1"
          )}
        >
          {data.map((data) => {
            return (
              <div key={data.name} className="">
                <DessertCard
                  img={data.image}
                  name={data.name}
                  category={data.category}
                  price={data.price}
                />
              </div>
            );
          })}
        </div>
      </div>
      {cart.length > 0 && (
        <div className="w-4/6 md:w-2/6 rounded-lg h-auto">
          <div className="w-full bg-white sticky top-2 rounded-lg p-5 shadow-lg">
            <h1 className="text-xl text-[hsl(14,86%,42%)] font-extrabold">
              Your Cart ({cart.length})
            </h1>
            <div className="mt-3">
              {cart.map((eachItem) => {
                const { name, quantity, price, image } = eachItem;
                return (
                  <div key={eachItem.name}>
                    <CartCard
                      name={name}
                      quantity={quantity}
                      price={price}
                      image={image}
                      isOrderConfirmed={false}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-5">
              <p className="text-xs">Order Total </p>{" "}
              <span className="text-lg font-extrabold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Button
              className={
                "bg-[hsl(14,86%,42%)] hover:bg-[hsl(14,86%,32%)] w-full mt-5 rounded-full"
              }
              onClick={(e) => handleOpenModal()}
            >
              Confirm Order
            </Button>
          </div>
        </div>
      )}
      <OrderConfirmation isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
};

export default DessertsPage;
