// components/ui/modal.tsx
"use client";

import React, { ReactNode } from "react";
// import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <Dialog
      open={open}
      // shadcn/Radix calls this whenever it wants to change open state
      onOpenChange={(isOpen) => {
        // Only call onClose when dialog is being closed
        if (!isOpen) onClose();
      }}
    >
      <DialogContent
        // Remove default padding so we can reuse your layout
        className="max-w-4xl overflow-hidden rounded-lg border-0 bg-transparent p-0 shadow-2xl"
      >
        <div
          className="relative flex w-full items-center overflow-hidden
                     bg-white px-4 py-8 shadow-2xl sm:px-6 sm:pt-10
                     md:p-6 lg:p-8"
        >
          {/* <div className="absolute right-3 top-3">
            <IconButton
              onClick={onClose}
              icon={<X size={15} />}
              aria-label="Close dialog"
            />
          </div> */}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
