'use client';

import React from 'react';
import { Dialog } from '@headlessui/react';
import { Plus, X } from 'lucide-react';

import { Size, Color } from '@/types';
import PriceFilter from './price-filter';

import { Button } from '@/components/ui/button';
import IconButton from '@/components/ui/icon-button';
import Filter from './filter';
import { useTranslations } from 'next-intl';

const MobileFilters = ({
	sizes,
	colors,
	brands = [],
	priceRanges = [],
}: {
	sizes: Size[];
	colors: Color[];
	brands?: string[];
	priceRanges?: { id: string; label: string; min?: number; max?: number }[];
}) => {
	const t = useTranslations('Products');
	const sortedSizes = React.useMemo(() => {
		const order = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
		return [...sizes].sort((a, b) => {
			const aIndex = order.indexOf(a.value.toUpperCase());
			const bIndex = order.indexOf(b.value.toUpperCase());
			if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
			if (aIndex !== -1) return -1;
			if (bIndex !== -1) return 1;
			return a.value.localeCompare(b.value, undefined, { numeric: true });
		});
	}, [sizes]);
	const [open, setOpen] = React.useState(false);
	const onOpen = () => setOpen(true);
	const onClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={onOpen} className='flex items-center gap-x-2'>
				{t("filters")}
				<Plus size={20} />
			</Button>

			<Dialog
				as='div'
				open={open}
				onClose={onClose}
				className='relative z-40 lg:hidden'
			>
				<div className='fixed inset-0 bg-primary/30' aria-hidden='true' />
				<div className='fixed inset-0 z-40 flex'>
					<Dialog.Panel
						className='relative ml-auto flex h-full w-full max-w-xs flex-col
							overflow-y-auto bg-white py-4 pb-6 shadow-xl'
					>
						<div className='flex items-center justify-end px-4'>
							<IconButton
								icon={<X size={15} />}
								onClick={onClose}
								aria-label='Close filters'
							/>
						</div>

						<div className='p-4'>
							<Filter
								valueKey='sizeId'
								filters={sortedSizes.map((size) => ({ ...size, label: size.value }))}
								name={t('sizes')}
								variant='text'
							/>
							<Filter
								valueKey='colorId'
								filters={colors.map((color) => ({ ...color, swatch: color.value }))}
								name={t('colors')}
								variant='color'
							/>
							{brands.length ? (
								<Filter
									valueKey='brand'
									filters={brands.map((brand) => ({ id: brand, label: brand }))}
									name={t('brand')}
								/>
							) : null}
							<Filter
								valueKey='priceSort'
								filters={[
									{ id: 'asc', label: t('price_low_high') },
									{ id: 'desc', label: t('price_high_low') },
								]}
								name={t('sort')}
								mode='single'
							/>
							{priceRanges.length ? <PriceFilter ranges={priceRanges} /> : null}
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
		</div>
	);
};

export default MobileFilters;
