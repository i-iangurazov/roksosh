import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

const allowedOrigin =
  process.env.NEXT_PUBLIC_STORE_URL ?? 'http://localhost:3001'; // your frontend URL

const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const body = await req.json();
    const { 
      name, description, nameRu, nameKg, descriptionRu, descriptionKg, 
      price, weight, brand, categoryId, colorIds, sizeIds, images, isFeatured, isArchived 
    } = body;

    // Input validation
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!description) return new NextResponse("Description is required", { status: 400 });
    if (!price) return new NextResponse("Price is required", { status: 400 });
    if (!weight) return new NextResponse("Weight is required", { status: 400 });
    if (!brand) return new NextResponse("Brand is required", { status: 400 });
    if (!categoryId) return new NextResponse("Category id is required", { status: 400 });
    if (!colorIds || !colorIds.length) return new NextResponse("At least one color is required", { status: 400 });
    if (!sizeIds || !sizeIds.length) return new NextResponse("At least one size is required", { status: 400 });
    if (!images || !images.length) return new NextResponse("Images are required", { status: 400 });

    // const storeByUserId = await prismadb.store.findUnique({
    //   where: { id: params.storeId, userId },
    // });

    // if (!storeByUserId) {
    //   return new NextResponse("You are not authorized to manage this store", { status: 403 });
    // }

    const product = await prismadb.product.create({
      data: {
        name,
        description,
        nameRu,
        nameKg,
        descriptionRu,
        descriptionKg,
        price,
        weight,
        categoryId,
        brand,
        colors: {
          connect: colorIds.map((id: string) => ({ id })),
        },
        sizes: {
          connect: sizeIds.map((id: string) => ({ id })),
        },
        isFeatured,
        isArchived,
        storeId: params.storeId,
        images: {
          createMany: {
            data: images.map((image: { url: string }) => ({ url: image.url })),
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("An error occurred while processing the request.", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const categories = searchParams.getAll("categoryId");
    const colors = searchParams.getAll("colorId") || undefined;
    const sizes = searchParams.getAll("sizeId") || undefined;
    const brandFilters = searchParams.getAll("brand") || undefined;
    const searchTerm = searchParams.get("searchTerm") || undefined;
    const priceSort = searchParams.get("priceSort");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const limit = searchParams.get("limit");
    const isFeatured = searchParams.get("isFeatured");
    const lang = searchParams.get("lang") || "en"; // Default to English if no language is specified

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId: categories.length > 0 ? { in: categories } : undefined,
        colors: colors.length > 0 ? { some: { id: { in: colors } } } : undefined,
        sizes: sizes.length > 0 ? { some: { id: { in: sizes } } } : undefined,
        brand: brandFilters && brandFilters.length > 0 ? { in: brandFilters } : undefined,
        price: {
          gte: minPrice ? parseFloat(minPrice) : undefined,
          lte: maxPrice ? parseFloat(maxPrice) : undefined,
        },
        ...(searchTerm
          ? {
              OR: [
                { name: { contains: searchTerm, mode: "insensitive" } },
                { nameRu: { contains: searchTerm, mode: "insensitive" } },
                { nameKg: { contains: searchTerm, mode: "insensitive" } },
                { description: { contains: searchTerm, mode: "insensitive" } },
                { descriptionRu: { contains: searchTerm, mode: "insensitive" } },
                { descriptionKg: { contains: searchTerm, mode: "insensitive" } },
                { brand: { contains: searchTerm, mode: "insensitive" } },
              ],
            }
          : {}),
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        colors: true,
        sizes: true,
      },
      orderBy:
        priceSort === "asc" || priceSort === "desc"
          ? { price: priceSort }
          : { createdAt: "desc" },
      take: limit ? Number(limit) : undefined,
    });

    // Modify products for multilingual support based on `lang`
    const updatedProducts = products.map((product) => {
      let productName = product.name || '';
      let productDescription = product.description || '';

      if (lang === "ru" && product.nameRu) {
        productName = product.nameRu;
      } else if (lang === "kg" && product.nameKg) {
        productName = product.nameKg;
      }

      if (lang === "ru" && product.descriptionRu) {
        productDescription = product.descriptionRu;
      } else if (lang === "kg" && product.descriptionKg) {
        productDescription = product.descriptionKg;
      }

      return { ...product, name: productName, description: productDescription };
    });

    return NextResponse.json(updatedProducts, { headers: corsHeaders });
  } catch (error) {
    console.error('[PRODUCTS_GET]', error);
    return new NextResponse('An error occurred while processing the request.', {
      status: 500,
      headers: corsHeaders,
    });
  }
}
