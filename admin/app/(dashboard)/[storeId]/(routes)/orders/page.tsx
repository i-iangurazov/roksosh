import React from "react";
import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import OrderClient from "./components/client";
import { OrderColumn } from "./components/columns";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
          color: true,
          size: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    customer: order.address.split("\n")[0] || "Customer",
    productsList: order.orderItems.map((orderItem) => {
      const productName = [orderItem.product.brand, orderItem.product.name].filter(Boolean).join(" ");
      const variant = [orderItem.color?.name, orderItem.size?.name].filter(Boolean).join(" / ");
      return `${productName} - ${variant || "N/A"} - x${orderItem.quantity}`;
    }),
    itemCount: order.orderItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: formatter.format(
      order.orderItems.reduce(
        (total, item) => total + (Number(item.product.price) * item.quantity),
        0,
      ),
    ),
    isPaid: order.isPaid,
    createdAt: format(new Date(order.createdAt), "MMMM do, yyyy"),
  }));

  return <OrderClient data={formattedOrders} />;
};

export default OrdersPage;
