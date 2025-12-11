'use client';

import React from 'react';
import Image from 'next/image';
import { X, Plus, Minus } from 'lucide-react';

import { Product } from '@/types';
import IconButton from '@/components/ui/icon-button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import Link from 'next/link';
import useLocale from '@/hooks/use-locale';
import { useTranslations } from 'next-intl';

const CartItem = ({
	data,
	count,
	appearDelay = 0,
}: {
	data: Product & { cartItemId: string; selectedColorId?: string; selectedSizeId?: string };
	count: number;
	appearDelay: number;
}) => {
	const t = useTranslations('Cart');
	const { getLocalizedValue } = useLocale();
	const cart = useCart();
	const selectedColor = data.colors.find((color) => color.id === data.selectedColorId) || data.colors[0];
	const selectedSize = data.sizes.find((size) => size.id === data.selectedSizeId) || data.sizes[0];

	const onRemove = () => {
		cart.removeItem(data.cartItemId, t);
	};

	const onIncrease = () => {
		cart.addItem(data, t, { colorId: data.selectedColorId, sizeId: data.selectedSizeId });
	};

	const onDecrease = () => {
		cart.removeItem(data.cartItemId, t);
	};

	return (
		<div
			className='flex py-6 border-b animate-card opacity-0'
			style={{ animationDelay: `${appearDelay * 0.1}s` }}
		>
			<div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
				<Image
					src={data.images[0].url}
					alt={getLocalizedValue(data, "name")}
					fill
					className='object-cover object-center'
				/>
			</div>
			<div className='relative ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
				<div className='absolute z-10 right-0 top-0'>
					<IconButton
						aria-label='Remove from cart'
						onClick={onRemove}
						icon={<X size={15} />}
					/>
				</div>
				<div
					className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0
					mr-3'
				>
					<div className='flex justify-between'>
						<h2 className='text-lg font-semibold text-black'>
							<Link href={`/product/${data.id}`}>{getLocalizedValue(data, "name")}</Link>
						</h2>
					</div>
					<p className='text-sm text-gray-500'>{data.brand}</p>
					<div className='my-3 flex text-sm'>
						<p className='text-gray-500 flex items-center gap-2'>
							<span className='inline-flex h-4 w-4 rounded-full border' style={{ backgroundColor: selectedColor?.value }} />
							{getLocalizedValue(selectedColor, "name")}
						</p>
						{selectedSize ? (
							<p className='text-gray-500 ml-4 border-l border-gray-200 pl-4'>
								{selectedSize.value || getLocalizedValue(selectedSize, "name")}
							</p>
						) : null}
					</div>
					<Currency value={Number(data.price) * count} /> {/* Updated Price */}

					{/* Quantity controls */}
					<div className='flex items-center mt-2'>
						<IconButton
							aria-label='Decrease quantity'
							onClick={onDecrease}
							icon={<Minus size={15} />}
						/>
						<span className='mx-2 text-lg font-semibold'>{count}</span>
						<IconButton
							aria-label='Increase quantity'
							onClick={onIncrease}
							icon={<Plus size={15} />}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
