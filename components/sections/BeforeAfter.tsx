'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfter() {
	const triggerRef = useRef<HTMLDivElement>(null);
	const beforeContainerRef = useRef<HTMLDivElement>(null);
	const sliderLineRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			// DESKTOP VERZIJA (Sa zaključavanjem ekrana - Pin)
			mm.add('(min-width: 768px)', () => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: triggerRef.current,
						start: 'top top',
						end: '+=150%',
						scrub: 0.5,
						pin: true,
						anticipatePin: 1,
					},
				});

				tl.to(beforeContainerRef.current, { width: '0%', ease: 'none' }).to(
					sliderLineRef.current,
					{ left: '0%', ease: 'none' },
					'<',
				);
			});

			// MOBILNA VERZIJA (Fluidno otvaranje tokom klasičnog skrola bez kočenja)
			mm.add('(max-width: 767px)', () => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: triggerRef.current,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 0.8,
					},
				});

				tl.to(beforeContainerRef.current, {
					width: '0%',
					ease: 'power1.inOut',
				}).to(sliderLineRef.current, { left: '0%', ease: 'power1.inOut' }, '<');
			});

			return () => mm.revert();
		},
		{ scope: triggerRef },
	);

	return (
		<div
			ref={triggerRef}
			className='relative w-full h-screen bg-bg-dark overflow-hidden font-body select-none'>
			{/* LEVO: ASIMETRIČNI NASLOV SEKCIJE */}
			<div className='absolute top-12 left-6 md:left-16 z-30 max-w-md pointer-events-none'>
				<span className='text-cyber-lime font-mono tracking-[0.3em] text-xs uppercase block mb-3'>
					{'// RADICAL TRANSFORMATION'}
				</span>
				<h2 className='font-display text-4xl md:text-6xl font-black text-text-primary uppercase leading-none tracking-tighter'>
					METABOLIC <br />
					SHIFT<span className='text-cyber-lime'>.</span>
				</h2>
			</div>

			{/* DESNO: DODATNI TECH INFO */}
			<div className='absolute top-12 right-6 md:right-16 z-30 text-right font-mono text-[10px] tracking-widest text-text-muted hidden md:block'>
				[ DATA_SET: #0942 ] <br />[ VERIFIED_BY_VRTX_LAB ]
			</div>

			{/* GLAVNI PROSTOR ZA SLIKE */}
			<div className='relative w-full h-full flex items-center justify-center'>
				{/* === OPTION 1: AFTER IMAGE (Fiksna u pozadini) === */}
				<div className='absolute inset-0 w-full h-full z-10'>
					<div
						className='w-full h-full bg-cover bg-center filter contrast-115 brightness-95'
						style={{
							backgroundImage: `url('/images/after-1.jpg')`,
						}}
					/>
					<div className='absolute bottom-12 right-6 md:right-16 z-30 font-display text-5xl md:text-8xl font-black text-cyber-lime opacity-40 uppercase tracking-tighter'>
						AFTER_
					</div>
				</div>

				{/* === OPTION 2: BEFORE IMAGE (Smanjuje se sa skrolom) === */}
				<div
					ref={beforeContainerRef}
					className='absolute inset-y-0 right-0 w-full h-full z-20 overflow-hidden'>
					<div
						className='absolute inset-y-0 right-0 w-screen h-full bg-cover bg-center filter brightness-60 grayscale-50 contrast-100'
						style={{
							backgroundImage: `url('/images/before.jpg')`,
						}}
					/>

					<div className='absolute bottom-12 left-6 md:left-16 z-30 font-display text-5xl md:text-8xl font-black text-text-primary opacity-30 uppercase tracking-tighter'>
						BEFORE_
					</div>
				</div>

				{/* === SEPARATOR LINIJA SA SJAJEM === */}
				<div
					ref={sliderLineRef}
					className='absolute inset-y-0 left-full w-0.5 bg-cyber-lime z-30 pointer-events-none shadow-[0_0_20px_#CCFF00]'>
					<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-bg-dark border-2 border-cyber-lime rounded-full' />
				</div>
			</div>

			{/* DONJI INFO PANEL */}
			<div className='absolute bottom-12 left-6 md:left-1/2 md:-translate-x-1/2 z-30 bg-bg-card/60 backdrop-blur-md px-6 py-4 border border-white/10 text-left md:text-center font-mono text-xs uppercase tracking-widest text-text-muted w-[calc(100%-3rem)] md:w-auto'>
				<span className='text-text-primary'>Phase 01:</span> Base Conditioning{' '}
				<span className='text-cyber-lime mx-2'>{'//'}</span>{' '}
				<span className='text-text-primary'>Duration:</span> 12 Weeks
			</div>
		</div>
	);
}
