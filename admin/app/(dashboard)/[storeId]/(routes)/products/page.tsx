import React from "react";
import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import ProductClient from "./components/client";
import { ProductColumn } from "./components/columns";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      sizes: true,
      colors: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    brand: product.brand,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatter.format(product.price.toNumber()),
    weight: product.weight.toNumber(),
    category: product.category?.name || "Unknown", // Use fallback if category is null or undefined
    sizes: product.sizes?.map((size) => size.name).join(", ") || "Unknown", // Use fallback if size is null or undefined
    colors: product.colors?.map((color) => color.name).join(", ") || "Unknown", // Use fallback if color is null or undefined
    createdAt: format(new Date(product.createdAt), "MMMM do, yyyy"),
  }));

  return <ProductClient data={formattedProducts} />;
};

export default ProductsPage;
