'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';

import { Product } from '@/types';

import Currency from '@/components/ui/currency';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import useLocale from '@/hooks/use-locale';
import { useTranslations } from 'next-intl';

const Info = ({ data }: { data: Product }) => {
	const t = useTranslations('Cart');
	const t2 = useTranslations('Products');
	const { getLocalizedValue } = useLocale();
	const cart = useCart();
	const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
	const sortedSizes = React.useMemo(() => {
		return [...data.sizes].sort((a, b) => {
			const aIndex = sizeOrder.indexOf(a.value.toUpperCase());
			const bIndex = sizeOrder.indexOf(b.value.toUpperCase());
			if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
			if (aIndex !== -1) return -1;
			if (bIndex !== -1) return 1;
			return a.value.localeCompare(b.value, undefined, { numeric: true });
		});
	}, [data.sizes]);
	const [selectedColorId, setSelectedColorId] = React.useState<string>(data.colors[0]?.id || '');
	const [selectedSizeId, setSelectedSizeId] = React.useState<string>(sortedSizes[0]?.id || '');

	React.useEffect(() => {
		setSelectedColorId(data.colors[0]?.id || '');
		setSelectedSizeId(sortedSizes[0]?.id || '');
	}, [data, sortedSizes]);
	const onAddToCart: React.MouseEventHandler<HTMLButtonElement> = () => {
		cart.addItem(data, t, { colorId: selectedColorId, sizeId: selectedSizeId });
	};

	const selectedColor = data.colors.find((color) => color.id === selectedColorId);
	const selectedSize = sortedSizes.find((size) => size.id === selectedSizeId);

	return (
		<article>
			<h1 className='text-3xl font-bold text-gray-900'>{getLocalizedValue(data, "name")}</h1>
			<p className='text-md text-gray-600 mt-1'>{data.brand}</p>
			<div className='mt-3 flex items-end justify-between'>
				<p className='text-2xl text-gray-900'>
					<Currency value={data.price} />
				</p>
			</div>
			<hr className='my-4' />
			<div className='mb-4'>
				<div className='flex flex-col gap-y-3 mb-10'>
					<div className='flex items-center gap-x-4'>
						<h2 className='font-semibold text-black'>{t2('size')}</h2>
						<div className='flex flex-wrap gap-2'>
							{sortedSizes.map((size) => (
								<button
									key={size.id}
									type='button'
									className={`rounded-md border px-3 py-1 text-sm transition ${
										selectedSizeId === size.id
											? 'border-primary bg-primary text-white'
											: 'border-gray-300'
									}`}
									onClick={() => setSelectedSizeId(size.id)}
								>
									{getLocalizedValue(size, "value")}
								</button>
							))}
						</div>
						{selectedSize ? (
							<span className='text-sm text-gray-500'>{getLocalizedValue(selectedSize, "value")}</span>
						) : null}
					</div>
					<div className='flex items-center gap-x-4'>
						<h2 className='font-semibold text-black'>{t2('color')}</h2>
						<div className='flex items-center gap-3'>
							{data.colors.map((color) => (
								<button
									key={color.id}
									type='button'
									className={`h-8 w-8 rounded-full border-2 transition ${
										selectedColorId === color.id ? 'border-gray-900' : 'border-gray-300'
									}`}
									style={{ backgroundColor: color.value }}
									onClick={() => setSelectedColorId(color.id)}
									aria-label={getLocalizedValue(color, "name")}
								/>
							))}
						</div>
						{selectedColor ? (
							<span className='text-sm text-gray-500'>{getLocalizedValue(selectedColor, "name")}</span>
						) : null}
					</div>
				</div>
				<div className='text-xl'>
					{getLocalizedValue(data, "description").split('\n').map((paragraph: any, index: any) => (
						<React.Fragment key={index}>
							<p>{paragraph}</p>
							<br />
						</React.Fragment>
					))}
				</div>
			</div>
			<Button className='flex items-center gap-x-2' onClick={onAddToCart}>
				{t('add')}
				<ShoppingCart />
			</Button>
		</article>
	);
};

export default Info;
