'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {
	const navRef = useRef<HTMLElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	// 1. ANIMACIJA ZA SMART-HIDE NAVBAR NA SKROL
	useGSAP(
		() => {
			// Postavljamo početno stanje (sakriven iznad ekrana i providan)
			gsap.set(navRef.current, { yPercent: -100, opacity: 0 });

			gsap.to(navRef.current, {
				yPercent: 0,
				opacity: 1,
				duration: 0.4,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: document.body,
					start: 'top -100px', // Čim korisnik skrolne 100px naniže od samog vrha
					toggleActions: 'play none none reverse', // play (kad pređeš 100px), reverse (kad se vratiš na vrh)
				},
			});
		},
		{ scope: navRef },
	);

	// 2. GSAP ANIMACIJA ZA OTVARANJE HAMBURGER MENIJA
	const toggleMenu = () => {
		if (!isOpen) {
			setIsOpen(true);
			// Prvo se pobrinemo da je meni vidljiv na ekranu pre nego što krene da klizi
			gsap.killTweensOf([menuRef.current, '.mobile-link']);

			gsap
				.timeline()
				.to(menuRef.current, {
					x: '0%',
					opacity: 1,
					duration: 0.4,
					ease: 'power3.out',
				})
				.fromTo(
					'.mobile-link',
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						stagger: 0.08,
						duration: 0.3,
						ease: 'power2.out',
					},
					'-=0.1',
				);
		} else {
			gsap.killTweensOf([menuRef.current, '.mobile-link']);
			gsap.to(menuRef.current, {
				x: '100%',
				opacity: 0,
				duration: 0.3,
				ease: 'power3.inOut',
				onComplete: () => setIsOpen(false),
			});
		}
	};

	const scrollToSection = (id: string) => {
		// Ako je mobilni meni otvoren, prvo ga zatvori
		if (isOpen) toggleMenu();

		setTimeout(() => {
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}, 300); // Mala zadrška da se završi animacija zatvaranja menija
	};

	useEffect(() => {
		if (isOpen) {
			// Zaključaj skrolovanje i spreči "skakanje" ekrana ako postoji scrollbar
			document.body.style.overflow = 'hidden';
		} else {
			// Otključaj skrolovanje kada se meni zatvori
			document.body.style.overflow = '';
		}

		// Cleanup funkcija - obavezno ako klijent napusti stranicu dok je meni otvoren
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	return (
		<>
			{/* GLAVNI NAVBAR BAR */}
			<nav
				ref={navRef}
				className={`fixed top-0 left-0 w-full z-50 bg-bg-dark/70 backdrop-blur-xl border-b border-white/5 px-6 md:px-16 py-4 font-mono select-none transition-opacity duration-300 ${isOpen ? 'bg-transparent' : 'bg-bg-dark/70'}`}>
				<div className='max-w-6xl mx-auto flex justify-between items-center'>
					{/* LOGO BLOCK */}
					<div
						onClick={() => {
							window.scrollTo({ top: 0, behavior: 'smooth' });
							if (isOpen) {
								toggleMenu();
							}
						}}
						className='flex items-center gap-2 cursor-pointer group'>
						<div className='font-display font-black text-xl tracking-widest text-text-primary'>
							VRTX<span className='text-cyber-lime'>_</span>
						</div>
					</div>

					{/* DESKTOP NAV LINKS (Sakriveni na mobilnom) */}
					<div className='hidden md:flex items-center gap-8 text-[11px]'>
						<button
							onClick={() => scrollToSection('timeline')}
							className='text-white/50 hover:text-cyber-lime transition-colors duration-300'>
							<span className='text-cyber-lime/40'>[01]</span> TIMELINE
						</button>
						<button
							onClick={() => scrollToSection('pricing')}
							className='text-white/50 hover:text-cyber-lime transition-colors duration-300'>
							<span className='text-cyber-lime/40'>[02]</span> PRICING
						</button>
						<button
							onClick={() => scrollToSection('faq')}
							className='text-white/50 hover:text-cyber-lime transition-colors duration-300'>
							<span className='text-cyber-lime/40'>[03]</span> FAQ
						</button>
					</div>

					{/* DESKTOP CTA DUGME (Sakriveno na mobilnom) */}
					<div className='hidden md:block'>
						<button
							onClick={() => scrollToSection('booking-gateway')}
							className='border border-cyber-lime/30 hover:border-cyber-lime bg-cyber-lime/[0.02] hover:bg-cyber-lime text-cyber-lime hover:text-black font-bold text-xs tracking-widest uppercase px-4 py-2 rounded-sm transition-all duration-300'>
							[ BOOK_SYSTEM ]
						</button>
					</div>

					{/* HAMBURGER DUGME (Vidljivo samo na mobilnom) */}
					<button
						onClick={toggleMenu}
						className='md:hidden text-cyber-lime font-bold text-xs tracking-widest uppercase p-2 relative z-50'>
						{isOpen ? '[ CLOSE_X ]' : '[ MENU_// ]'}
					</button>
				</div>
			</nav>

			{/* CYBER FULL-SCREEN MOBILE OVERLAY MENI */}
			<div
				ref={menuRef}
				style={{ transform: 'translateX(100%)' }} // Inicijalno sakriven van ekrana sa desne strane
				className='fixed inset-0 bg-bg-dark/98 backdrop-blur-2xl z-40 opacity-0 flex flex-col justify-center items-center font-mono md:hidden border-l border-white/5'>
				{/* Mreža u pozadini */}
				<div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none' />

				<div className='flex flex-col gap-8 text-center relative z-10'>
					<button
						onClick={() => scrollToSection('timeline')}
						className='mobile-link text-xl text-white/60 hover:text-cyber-lime tracking-widest uppercase'>
						<span className='text-cyber-lime text-sm block mb-1'>[01]</span>{' '}
						TIMELINE_
					</button>
					<button
						onClick={() => scrollToSection('pricing')}
						className='mobile-link text-xl text-white/60 hover:text-cyber-lime tracking-widest uppercase'>
						<span className='text-cyber-lime text-sm block mb-1'>[02]</span>{' '}
						PRICING_
					</button>
					<button
						onClick={() => scrollToSection('faq')}
						className='mobile-link text-xl text-white/60 hover:text-cyber-lime tracking-widest uppercase'>
						<span className='text-cyber-lime text-sm block mb-1'>[03]</span>{' '}
						FAQ_RESOLUTIONS
					</button>

					<div className='h-[1px] w-12 bg-white/10 my-4 mx-auto mobile-link' />

					<button
						onClick={() => scrollToSection('booking-gateway')}
						className='mobile-link border border-cyber-lime bg-cyber-lime/10 text-cyber-lime font-bold text-sm tracking-widest uppercase px-6 py-3 rounded-sm shadow-[0_0_20px_rgba(204,255,0,0.15)]'>
						[ INITIALIZE_BOOKING ]
					</button>
				</div>
			</div>
		</>
	);
}
