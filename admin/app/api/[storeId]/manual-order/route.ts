import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

type ProductPayload = {
  id: string;
  count: number;
  colorId?: string;
  sizeId?: string;
};

const allowedOrigin =
  process.env.NEXT_PUBLIC_STORE_URL ?? 'http://localhost:3001'; // your frontend URL

const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const body = await req.json();
    const { fullName, phone, address, products } = body as {
      fullName: string;
      phone: string;
      address: string;
      products: ProductPayload[];
    };

    if (!params.storeId) return new NextResponse("Store id required", { status: 400 });
    if (!fullName || !phone || !address) return new NextResponse("Missing customer data", { status: 400 });
    if (!products || !products.length) return new NextResponse("Products are required", { status: 400 });

    const productIds = products.map((p) => p.id);
    const existingProducts = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        id: { in: productIds },
      },
    });

    if (existingProducts.length !== productIds.length) {
      return new NextResponse("One or more products invalid", { status: 400 });
    }

    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        phone,
        address: `${fullName}\n${address}`,
        orderItems: {
          create: products.map((product) => ({
            product: { connect: { id: product.id } },
            quantity: product.count,
            color: product.colorId ? { connect: { id: product.colorId } } : undefined,
            size: product.sizeId ? { connect: { id: product.sizeId } } : undefined,
          })),
        },
      },
    });

    return NextResponse.json({ id: order.id }, { headers: corsHeaders });
  } catch (error) {
    console.error("[MANUAL_ORDER]", error);
    return new NextResponse("Internal Error", { status: 500, headers: corsHeaders, });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
