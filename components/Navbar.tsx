'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {
	const navRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			// Navbar je inicijalno sakriven (y: -100)
			gsap.to(navRef.current, {
				y: 0,
				opacity: 1,
				duration: 0.4,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: document.body,
					start: 'top -100', // Čim korisnik skrolne 100px naniže
					toggleActions: 'play none none reverse', // Vrati se gore = nestane
				},
			});
		},
		{ scope: navRef },
	);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<nav
			ref={navRef}
			className='fixed top-0 left-0 w-full z-50 bg-bg-dark/70 backdrop-blur-md border-b border-white/5 px-6 md:px-16 py-4 font-mono select-none opacity-0 -translate-y-full'>
			<div className='max-w-6xl mx-auto flex justify-between items-center'>
				{/* LOGO BLOCK */}
				<div
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className='flex items-center gap-2 cursor-pointer group'>
					<div className='font-display font-black text-xl tracking-widest text-text-primary'>
						VRTX<span className='text-cyber-lime'>_</span>
					</div>
				</div>

				{/* NAV LINKS (Skriveni na mobilnom, čista estetika na desktopu) */}
				<div className='hidden md:flex items-center gap-8 text-xs text-text-muted'>
					<button
						onClick={() => scrollToSection('timeline')}
						className='hover:text-text-primary transition-colors duration-300 flex items-center gap-1'>
						<span className='text-cyber-lime/80'>[01]</span> TIMELINE
					</button>
					<button
						onClick={() => scrollToSection('pricing')}
						className='hover:text-text-primary transition-colors duration-300 flex items-center gap-1'>
						<span className='text-cyber-lime/80'>[02]</span> PRICING
					</button>
					<button
						onClick={() => scrollToSection('faq')}
						className='hover:text-text-primary transition-colors duration-300 flex items-center gap-1'>
						<span className='text-cyber-lime/80'>[03]</span> FAQ
					</button>
				</div>

				{/* DIREKTNO CTA DUGME KOJE VODI NA SCHEDULIFY */}
				<div>
					<button
						onClick={() => scrollToSection('schedulify')}
						className='border border-cyber-lime/30 hover:border-cyber-lime bg-cyber-lime/2 hover:bg-cyber-lime text-cyber-lime hover:text-black font-bold text-[10px] md:text-xs tracking-widest uppercase px-4 py-2 rounded-sm transition-all duration-300 box-border shadow-[0_0_15px_rgba(204,255,0,0.02)] hover:shadow-[0_0_20px_rgba(204,255,0,0.2)]'>
						[ BOOK_SYSTEM ]
					</button>
				</div>
			</div>
		</nav>
	);
}
