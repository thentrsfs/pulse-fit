import type { Metadata } from 'next';
import { Syne, Space_Grotesk } from 'next/font/google';
import './globals.css';

// Agresivni, futuristički tech font za naslove
const syne = Syne({
	subsets: ['latin'],
	variable: '--font-tech-heading',
	weight: ['400', '500', '700'],
});

// Čist, ultra-moderan font za paragrafe i sitnije elemente
const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-tech-body',
	weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
	title: 'VRTX // Elite Performance Studio',
	description: 'Next-gen personal training and athletic optimization.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className={`${spaceGrotesk.variable} ${syne.variable} h-full antialiased`}>
			<body className='min-h-full flex flex-col'>{children}</body>
		</html>
	);
}
