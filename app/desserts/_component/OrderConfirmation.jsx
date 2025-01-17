"use Client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleCheck } from "lucide-react";
import CartCard from "./CartCard";
import useDessertStore from "@/store/desserts-store";

const OrderConfirmation = ({ isOpen, setIsOpen }) => {
  const { cart , totalPrice} = useDessertStore();

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"flex gap-2 items-center"}>
            <CircleCheck className="text-emerald-500" /> Your Dessert order has
            been confirmed!
          </DialogTitle>
          <DialogDescription>
            We&#39;re preparing your delicious dessert now.
          </DialogDescription>
        </DialogHeader>
        <div>
          {cart.map((eachItem) => {
            const { name, quantity, price, image } = eachItem;
            return (
              <span key={eachItem.name}>
                <CartCard
                  name={name}
                  quantity={quantity}
                  price={price}
                  image={image}
                  isOrderConfirmed={true}
                />
              </span>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-5">
          <p className="text-xs">Order Total </p>{" "}
          <span className="text-lg font-extrabold">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmation;
