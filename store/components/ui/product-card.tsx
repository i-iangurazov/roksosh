// store/components/ui/product-card.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Expand, ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useLocale from "@/hooks/use-locale";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface ProductCardProps {
  data: Product;
  appearDelay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ data, appearDelay = 0 }) => {
  const t = useTranslations("Cart");
  const boundingRef = React.useRef<DOMRect | null>(null);
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();
  const { getLocalizedValue } = useLocale();

  const handleMouseMove = (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!boundingRef.current) return;

    const x = ev.clientX - boundingRef.current.left;
    const y = ev.clientY - boundingRef.current.top;
    const xPercentage = x / boundingRef.current.width;
    const yPercentage = y / boundingRef.current.height;
    const xRotation = (xPercentage - 0.5) * 20;
    const yRotation = (0.5 - yPercentage) * 20;

    ev.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
    ev.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
    ev.currentTarget.style.setProperty("--x", `${xPercentage * 80}%`);
    ev.currentTarget.style.setProperty("--y", `${yPercentage * 60}%`);
  };

  const handleClick = () => {
    router.push(`/product/${data.id}`);
  };

  const onPreview: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data, t);
  };

  return (
    <div
      className="[perspective:800px] max-w-lg animate-card opacity-0"
      style={{ animationDelay: `${appearDelay * 0.1}s` }}
    >
      <Card
        onClick={handleClick}
        onMouseLeave={() => {
          boundingRef.current = null;
        }}
        onMouseEnter={(ev) => {
          boundingRef.current = ev.currentTarget.getBoundingClientRect();
        }}
        onMouseMove={handleMouseMove}
        className="group cursor-pointer rounded-xl border bg-white p-3
                   space-y-4 relative overflow-hidden card-hover-3d-effect"
      >
        <CardContent className="p-0 space-y-4">
          <div className="relative aspect-square rounded-xl bg-gray-100">
            <Image
              src={data.images[0].url}
              alt={getLocalizedValue(data, "name")}
              width={500}
              height={500}
              className="aspect-square rounded-md object-cover"
            />

            <div
              className="opacity-0 group-hover:opacity-100 flex justify-center
                         transition absolute px-6 bottom-5 w-full gap-4 z-10"
            >
              <IconButton
                onClick={onPreview}
                icon={<Expand size={20} className="text-gray-600" />}
                aria-label="Show product preview"
              />
              <IconButton
                onClick={onAddToCart}
                icon={<ShoppingCart size={20} className="text-gray-600" />}
                aria-label="Add to cart"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              {getLocalizedValue(data, "name")}
            </h3>
            <p className="text-sm text-gray-600">{data.brand}</p>
            <p className="text-sm text-gray-500">
              {getLocalizedValue(data.category, "name")}
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-0">
          <Currency value={data.price} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
