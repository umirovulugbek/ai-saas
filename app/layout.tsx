import { CrispProvider } from '@/components/crisp-provider';
import ToastProvider from '@/components/toast-provider';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Genius',
	description: 'Ai platform',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<CrispProvider />
				<body className={inter.className}>
					<ToastProvider />

					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
