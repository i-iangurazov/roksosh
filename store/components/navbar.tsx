'use client';

import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import MainNav from '@/components/main-nav';
import NavbarActions from '@/components/navbar-actions';
// import { Icons } from '@/components/icons';

import { Category } from '@/types';
import LanguageSwitcher from '@/components/language-switcher';
import GlobalSearch from '@/components/search/global-search';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

export const revalidate = 0;

const Navbar = ({ categories }: { categories: Category[] }) => {
	const [open, setOpen] = React.useState(false);

	return (
		<header className='border-b py-4 px-4 sm:px-6 lg:px-8'>
			<div className='container m-auto flex items-center gap-3'>
				<Link href='/' className='flex-shrink-0 mr-4'>
					{/* <Icons.logo className="h-[20px] w-20 transform translate-y-[-3px]" /> */}
					<span className='text-xl'>ROKSOSH</span>
				</Link>

				<div className='hidden lg:flex items-center gap-4 flex-1 min-w-0'>
					<MainNav data={categories} />
					<div className='min-w-[200px] flex-1 max-w-lg'>
						<GlobalSearch />
					</div>
				</div>

				<div className='flex items-center gap-2 ml-auto'>
					<NavbarActions />
					<LanguageSwitcher />
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<button
								className='lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50'
								aria-label='Open navigation'
							>
								<Menu className='h-5 w-5' />
							</button>
						</SheetTrigger>
						<SheetContent side='left' className='w-[320px] p-0'>
							<SheetHeader className='p-4 border-b'>
								<SheetTitle>
									<Link href='/' onClick={() => setOpen(false)}>
										<span className='text-xl font-semibold'>ROKSOSH</span>
									</Link>
								</SheetTitle>
							</SheetHeader>
							<div className='p-4 space-y-6'>
								<div>
									<GlobalSearch onResultSelect={() => setOpen(false)} />
								</div>
								<nav className='space-y-3'>
									<MainNav data={categories} onNavigate={() => setOpen(false)} />
								</nav>
								<div className='flex items-center gap-3'>
									<NavbarActions />
									<LanguageSwitcher />
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
