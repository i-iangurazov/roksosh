'use client';

import React from 'react';
import queryString from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

type PriceRange = { id: string; label: string; min?: number; max?: number };

const PriceFilter = ({ ranges }: { ranges: PriceRange[] }) => {
	const t = useTranslations('Products');
	const router = useRouter();
	const searchParams = useSearchParams();
	const selected = searchParams.get('priceRange') || '';

	const onSelect = (range: PriceRange) => {
		const currentQuery = queryString.parse(searchParams.toString());
		const isSame = selected === range.id;
		const nextQuery = {
			...currentQuery,
			priceRange: isSame ? undefined : range.id,
			minPrice: isSame ? undefined : range.min,
			maxPrice: isSame ? undefined : range.max,
		};

		const url = queryString.stringifyUrl(
			{
				url: window.location.href,
				query: nextQuery,
			},
			{ skipNull: true },
		);

		router.push(url);
	};

	return (
		<div className='mb-8'>
			<h3 className='text-lg font-semibold'>{t("price")}</h3>
			<hr className='mt-2 mb-4' />
			<ul className='flex flex-wrap gap-2'>
				{ranges.map((range) => (
					<li key={range.id}>
						<Button
							variant='outline'
							className={cn(
								'rounded-md border text-sm',
								selected === range.id ? 'border-primary bg-primary text-white' : 'border-gray-300',
							)}
							onClick={() => onSelect(range)}
						>
							{range.label}
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PriceFilter;
