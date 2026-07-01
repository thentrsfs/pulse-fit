'use client';

import gsap from 'gsap';

import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Timeline from '@/components/sections/Timeline';
import PricingAndBooking from '@/components/sections/PricingAndBooking';
import Faq from '@/components/sections/Faq';
import Footer from '@/components/sections/Footer';
import SplashScreen from '@/components/SplashScreen';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
	const mainContentRef = useRef<HTMLDivElement>(null);
	const [startHeroAnim, setStartHeroAnim] = useState(false);

	useEffect(() => {
		// Sprečavamo skakanje stranice tako što fiksiramo scrollbar prostor odmah
		document.documentElement.style.overflowY = 'scroll';
		document.body.style.overflow = 'hidden'; // Zaključan skrol dok traje splash
	}, []);

	const handleSplashComplete = () => {
		// Otključavamo skrol tek kada je zavesa skroz podignuta
		document.body.style.overflow = '';

		setStartHeroAnim(true);

		// Ultra glatki ulazak Hero sekcije
		gsap.fromTo(
			mainContentRef.current,
			{ opacity: 0.8 },
			{ opacity: 1, duration: 0.4, ease: 'power2.out' },
		);
	};
	return (
		<div className='overflow-x-hidden'>
			<SplashScreen onComplete={handleSplashComplete} />
			<div
				ref={mainContentRef}
				className='relative bg-bg-dark text-text-primary'>
				<Navbar />
				<main>
					<Hero startAnimation={startHeroAnim} />
					<BeforeAfter />
					<Timeline />
					<PricingAndBooking />
					<Faq />
					<Footer />
				</main>
			</div>
		</div>
	);
}
