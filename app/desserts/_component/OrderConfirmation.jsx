import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleCheck } from "lucide-react";

const OrderConfirmation = ({isOpen, setIsOpen}) => {
  return (
    <Dialog open={isOpen} onOpenChange={()=>setIsOpen(prev=>!prev)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"flex gap-2 items-center"}>
           <CircleCheck className="text-emerald-500" /> Your food order has been confirmed! 
            </DialogTitle>
          <DialogDescription>
          We&#39;re preparing your delicious desserts now.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmation;
