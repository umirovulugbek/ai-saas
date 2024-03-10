'use client';
import SideBar from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

const MobileSidebar = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}
	return (
		<Sheet>
			<SheetTrigger>
				<Button variant={'ghost'} size={'icon'} className='md:hidden'>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side={'left'} className='p-0'>
				<SideBar />
			</SheetContent>
		</Sheet>
	);
};

export default MobileSidebar;
