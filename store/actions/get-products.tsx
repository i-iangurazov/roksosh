// actions/get-products.ts
import queryString from 'query-string';
import { Product } from '@/types';

const productsUrl = `${process.env.NEXT_PUBLIC_API_URL}/products`;
let controller: AbortController;

type Query = {
  categoryId?: string | string[];
  colorId?: string | string[];
  sizeId?: string | string[];
  isFeatured?: boolean;
  brand?: string | string[];
  priceSort?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  limit?: number;
};

export const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = queryString.stringifyUrl({
      url: productsUrl,
      query,
    });

    const isBrowser = typeof window !== 'undefined';

    // Abort previous request on the client to avoid race conditions
    if (isBrowser) {
      if (controller) {
        controller.abort();
      }
      controller = new AbortController();
    }

    const res = await fetch(url, {
      signal: isBrowser ? controller?.signal : undefined,
    });

    const json = await res.json();

    // Normalize to always return Product[]
    if (Array.isArray(json)) {
      return json as Product[];
    }

    if (json && Array.isArray(json.products)) {
      return json.products as Product[];
    }

    if (json && Array.isArray(json.data)) {
      return json.data as Product[];
    }

    return [];
  } catch (error) {
    console.debug("Can`t load all products", error);
    return [];
  }
};
