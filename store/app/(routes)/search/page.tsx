import React from 'react';

import { getProducts } from '@/actions/get-products';
import ProductList from '@/components/product-list';
import NoResults from '@/components/ui/no-results';

export const revalidate = 0;

const SearchPage = async ({ searchParams }: { searchParams: { q?: string } }) => {
	const query = typeof searchParams.q === 'string' ? searchParams.q : '';
	const products = await getProducts({
		searchTerm: query || undefined,
	});

	return (
		<main className='bg-white py-8 px-4 sm:px-6 lg:px-8'>
			<div className='container mx-auto space-y-6'>
				<header>
					<p className='text-sm uppercase tracking-wide text-gray-500'>Search</p>
					<h1 className='text-3xl font-bold text-black'>
						{query ? `Results for "${query}"` : 'Browse all products'}
					</h1>
				</header>
				{products.length === 0 ? (
					<div className='mt-6'>
						<NoResults />
					</div>
				) : (
					<ProductList title='' items={products} />
				)}
			</div>
		</main>
	);
};

export default SearchPage;
