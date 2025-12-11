'use client';

import React from 'react';
import queryString from 'query-string';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import useLocale from '@/hooks/use-locale';
import { useTranslations } from 'next-intl';

type FilterOption = {
	id: string;
	label?: string;
	name?: string;
	nameRu?: string;
	nameKg?: string;
	value?: string;
	swatch?: string;
};

const Filter = ({
	valueKey,
	filters: values,
	name,
	mode = 'multi',
	variant = 'text',
}: {
	valueKey: string;
	filters: FilterOption[];
	name: string;
	mode?: 'multi' | 'single';
	variant?: 'text' | 'color';
}) => {
	const t = useTranslations('Products');
	const { getLocalizedValue } = useLocale();
	const searchParams = useSearchParams();
	const router = useRouter();
	const selectedValues = searchParams.getAll(valueKey);

	const onFilter = (filterId: string) => {
		const currentQuery = queryString.parse(searchParams.toString());
		let nextValues: string[];

		if (mode === 'single') {
			nextValues = selectedValues.includes(filterId) ? [] : [filterId];
		} else {
			const newSelectedValues = new Set(selectedValues);
			if (newSelectedValues.has(filterId)) {
				newSelectedValues.delete(filterId);
			} else {
				newSelectedValues.add(filterId);
			}
			nextValues = Array.from(newSelectedValues);
		}

		const query = {
			...currentQuery,
			[valueKey]: nextValues,
		};

		const url = queryString.stringifyUrl(
			{
				url: window.location.href,
				query,
			},
			{ skipNull: true },
		);

		router.push(url);
	};

	const title =
		name === 'Sizes'
			? t('sizes')
			: name === 'Colors'
				? t('colors')
				: name;

	return (
		<div className='mb-8'>
			<h3 className='text-lg font-semibold'>{title}</h3>
			<hr className='mt-2 mb-4' />
			<ul className='flex flex-wrap gap-2'>
				{values.map((filter) => {
					const isSelected = selectedValues.includes(filter.id);
					const ariaLabel = filter.label || getLocalizedValue(filter, 'name');
					return (
						<li key={filter.id} className='flex items-center'>
							<Button
								variant='outline'
								className={cn(
									'rounded-md text-sm p-2 capitalize border',
									isSelected ? 'border-primary bg-primary text-white' : 'border-gray-300',
								)}
								onClick={() => onFilter(filter.id)}
								aria-label={ariaLabel}
							>
								{variant === 'color' ? (
									<span className='flex items-center gap-2'>
										<span
											className='inline-block h-4 w-4 rounded-full border border-gray-300'
											style={{ backgroundColor: filter.swatch || filter.value }}
										/>
										<span>{ariaLabel}</span>
									</span>
								) : (
									<span>{ariaLabel}</span>
								)}
							</Button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Filter;
