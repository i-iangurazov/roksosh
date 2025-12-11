import React from 'react';

import { getProducts } from '@/actions/get-products';
import { getColors } from '@/actions/get-colors';
import { getSizes } from '@/actions/get-sizes';
import { getCategory } from '@/actions/get-category';

import Billboard from '@/components/billboard';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card';
import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';
import PriceFilter from './components/price-filter';
import { getTranslations } from 'next-intl/server';

export const revalidate = 0;

const CategoryPage = async ({
	params,
	searchParams,
}: {
	params: { categoryId: string };
	searchParams: {
		colorId: string | string[];
		sizeId: string | string[];
		brand?: string | string[];
		priceSort?: 'asc' | 'desc';
	priceRange?: string;
	minPrice?: string;
	maxPrice?: string;
	};
}) => {
	const t = await getTranslations('Products');
	const products = await getProducts({
		categoryId: params.categoryId,
		colorId: searchParams.colorId,
		sizeId: searchParams.sizeId,
		brand: searchParams.brand,
		priceSort: searchParams.priceSort,
		minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
		maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
	});
	const allProducts = await getProducts({ categoryId: params.categoryId });
	const sizes = await getSizes();
	const colors = await getColors();
	const category = await getCategory(params.categoryId);
	const brands = Array.from(new Set(allProducts.map((p) => p.brand).filter(Boolean)));
	const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
	const sizeIdsInCategory = new Set(
		allProducts.flatMap((p) => p.sizes?.map((s) => s.id) ?? []),
	);
	const colorIdsInCategory = new Set(
		allProducts.flatMap((p) => p.colors?.map((c) => c.id) ?? []),
	);

	const availableSizes = sizes.filter((size) => sizeIdsInCategory.has(size.id));
	const availableColors = colors.filter((color) => colorIdsInCategory.has(color.id));

	const sortedSizes = [...availableSizes].sort((a, b) => {
		const aIndex = sizeOrder.indexOf(a.value.toUpperCase());
		const bIndex = sizeOrder.indexOf(b.value.toUpperCase());

		if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
		if (aIndex !== -1) return -1;
		if (bIndex !== -1) return 1;

		return a.value.localeCompare(b.value, undefined, { numeric: true });
	});
	const priceRanges = [
		{ id: 'under-3k', label: t('price_under_3k'), max: 3000 },
		{ id: '3k-6k', label: t('price_3k_6k'), min: 3000, max: 6000 },
		{ id: '6k-10k', label: t('price_6k_10k'), min: 6000, max: 10000 },
		{ id: '10k-plus', label: t('price_10k_plus'), min: 10000 },
	];

	return (
		<main className='bg-white py-8 px-4 sm:px-6 lg:px-8'>
			<div className='container mx-auto'>
				<div className='mb-8'>
					<Billboard data={category.billboard} />
				</div>

				<div className='lg:hidden'>
					<MobileFilters
						sizes={availableSizes}
						colors={availableColors}
						brands={brands}
						priceRanges={priceRanges}
					/>
				</div>

				<div className='lg:grid lg:grid-cols-[260px_1fr] lg:gap-10'>
					<aside className='hidden lg:block'>
						<div className='sticky top-6 space-y-6'>
							<Filter
								valueKey='sizeId'
								filters={sortedSizes.map((size) => ({ ...size, label: size.value }))}
								name={t('sizes')}
								variant='text'
							/>
							<Filter
								valueKey='colorId'
								filters={availableColors.map((color) => ({ ...color, swatch: color.value }))}
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
							<PriceFilter ranges={priceRanges} />
						</div>
					</aside>

					<section>
						{products.length === 0 ? (
							<div className='mt-8 mx-auto'>
								<NoResults />
							</div>
						) : (
							<div
								className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-6 lg:my-0
							justify-center sm:justify-start'
							>
								{products.map((product, index) => (
									<div key={product.id}>
										<ProductCard data={product} appearDelay={index} />
									</div>
								))}
							</div>
						)}
					</section>
				</div>
			</div>
		</main>
	);
};

export default CategoryPage;
