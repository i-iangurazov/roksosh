import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { toast } from 'react-hot-toast';

import { Product } from '@/types';

type CartSelection = { colorId?: string; sizeId?: string };
type CartItem = Product & {
	count: number;
	cartItemId: string;
	selectedColorId?: string;
	selectedSizeId?: string;
};

type CartStore = {
	items: CartItem[];
	addItem: (item: Product, t: Function, selection?: CartSelection) => void;
	removeItem: (cartItemId: string, t: Function) => void;
	removeAll: (t: Function) => void;
};

const createCartItemId = (productId: string, colorId?: string, sizeId?: string) =>
	[productId, colorId || 'none', sizeId || 'none'].join(':');

const useCart = create(
	persist<CartStore>(
		(set, get) => ({
			items: [],
			addItem: (data: Product, t: Function, selection?: CartSelection) => {
				const currentItems = get().items;
				const selectedColorId = selection?.colorId || data.colors?.[0]?.id;
				const selectedSizeId = selection?.sizeId || data.sizes?.[0]?.id;
				const cartItemId = createCartItemId(data.id, selectedColorId, selectedSizeId);
				const existingItemIndex = currentItems.findIndex((item) => item.cartItemId === cartItemId);

				if (existingItemIndex !== -1) {
					// Increase count if item exists
					const updatedItems = [...currentItems];
					updatedItems[existingItemIndex].count += 1;
					set({ items: updatedItems });
					toast.success(t("item_added"));
				} else {
					// Add new item with count 1
					set({
						items: [
							...currentItems,
							{
								...data,
								cartItemId,
								selectedColorId,
								selectedSizeId,
								count: 1,
							},
						],
					});
					toast.success(t("item_added"));
				}
			},
			removeItem: (cartItemId: string, t: Function) => {
				const currentItems = get().items;
				const existingItemIndex = currentItems.findIndex((item) => item.cartItemId === cartItemId);

				if (existingItemIndex !== -1) {
					const updatedItems = [...currentItems];
					const item = updatedItems[existingItemIndex];

					if (item.count > 1) {
						// Decrease count if more than one
						item.count -= 1;
						set({ items: updatedItems });
						toast.success(t("item_removed"));
					} else {
						// Remove item entirely if count is 1
						set({ items: currentItems.filter((item) => item.cartItemId !== cartItemId) });
						toast.success(t("item_removed"));
					}
				}
			},
			removeAll: (t: Function) => {
				set({ items: [] });
				toast.success(t("all_items_removed"));
			},
		}),
		{
			name: 'cart-store',
			storage: createJSONStorage(() => localStorage),
			version: 2,
			migrate: (persistedState: any, version) => {
				if (version < 2) {
					return { ...persistedState, items: [] } as CartStore;
				}
				return persistedState as CartStore;
			},
		},
	),
);

export default useCart;
