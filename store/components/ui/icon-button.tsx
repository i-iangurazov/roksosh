// components/ui/icon-button.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  className,
  type = "button",
  ...props
}) => {
  return (
    <Button
      type={type}
      variant="outline"
      size="icon"
      className={cn(
        // keep your original “pill” + shadow + hover effects
        "rounded-full bg-white/70 shadow-md border",
        "hover:scale-110 hover:bg-white active:scale-95",
        "flex items-center justify-center p-2",
        className,
      )}
      {...props}
    >
      {icon}
    </Button>
  );
};

export default IconButton;
