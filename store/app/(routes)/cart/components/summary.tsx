'use client';

import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import { useTranslations } from 'next-intl';

const Summary = () => {
	const t = useTranslations('Cart');
	const items = useCart((state) => state.items);
	const removeAll = useCart((state) => state.removeAll);
	const searchParams = useSearchParams();
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [fullName, setFullName] = React.useState('');
	const [phone, setPhone] = React.useState('');
	const [address, setAddress] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	// Calculate total price by taking item count into account
	const totalPrice = items.reduce((totalSum, item) => {
		return totalSum + Number(item.price) * item.count;
	}, 0);

	const formatPhone = (value: string) => {
		const digits = value.replace(/\D/g, '');
		const noPrefix = digits.startsWith('996') ? digits.slice(3) : digits;
		const trimmed = noPrefix.slice(0, 9);
		const parts = [trimmed.slice(0, 3), trimmed.slice(3, 6), trimmed.slice(6, 9)].filter(Boolean);
		return trimmed
			? `+996 ${parts[0] || ''}${parts[1] ? ' ' + parts[1] : ''}${parts[2] ? ' ' + parts[2] : ''}`
			: '+996 ';
	};

	const onCheckOut = () => {
		setIsModalOpen(true);
	};

	const onSubmitOrder = async () => {
		const formattedPhone = formatPhone(phone);
		const phoneDigits = formattedPhone.replace(/\D/g, '');
		if (!fullName.trim() || !address.trim()) {
			toast.error(t('fill_fields'));
			return;
		}
		if (!(phoneDigits.startsWith('996') && phoneDigits.length === 12)) {
			toast.error(t('invalid_phone'));
			return;
		}

		try {
			setLoading(true);
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/manual-order`, {
				fullName,
				phone: formattedPhone,
				address,
				products: items.map((item) => ({
					id: item.id,
					count: item.count,
					colorId: item.selectedColorId,
					sizeId: item.selectedSizeId,
				})),
			});
			toast.success(t('order_placed'));
			removeAll(t);
			setIsModalOpen(false);
		} catch (error) {
			console.error(error);
			toast.error(t('order_failed'));
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		if (searchParams.get('success')) {
			toast.success(t("payment_ok"));
			removeAll(t);
		}

		if (searchParams.get('canceled')) {
			toast.error(t("payment_cancel"));
		}
	}, [searchParams, removeAll]);

	return (
		<>
			<section
				className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5
					lg:mt-0 lg:p-8'
			>
				<h2 className='text-lg font-medium text-gray-900'>{t('summary')}</h2>
				<div className='mt-6 space-y-4'>
					<div
						className='flex items-center justify-between border-t border-gray-200
					pt-4'
					>
						<div className='text-base font-medium text-gray-900'>{t('total')}</div>
						<Currency value={totalPrice} />
					</div>
				</div>
				<Button className='w-full mt-6' onClick={onCheckOut}>
					{t('checkout')}
				</Button>
			</section>

			<Dialog open={isModalOpen} onOpenChange={(open) => !loading && setIsModalOpen(open)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t('checkout_title')}</DialogTitle>
						<DialogDescription>{t('checkout_desc')}</DialogDescription>
					</DialogHeader>
					<div className='space-y-3'>
						<div className='space-y-1'>
							<label className='text-sm text-gray-700 block'>{t('full_name')}</label>
							<input
								className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								disabled={loading}
							/>
						</div>
						<div className='space-y-1'>
							<label className='text-sm text-gray-700 block'>{t('phone_label')}</label>
							<input
								className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
								value={phone}
								onChange={(e) => setPhone(formatPhone(e.target.value))}
								disabled={loading}
								placeholder='+996 XXX XXX XXX'
							/>
						</div>
						<div className='space-y-1'>
							<label className='text-sm text-gray-700 block'>{t('address_label')}</label>
							<textarea
								className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								disabled={loading}
								rows={3}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button variant='outline' onClick={() => setIsModalOpen(false)} disabled={loading}>
							{t('cancel')}
						</Button>
						<Button onClick={onSubmitOrder} disabled={loading}>
							{loading ? t('placing') : t('place_order')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default Summary;
