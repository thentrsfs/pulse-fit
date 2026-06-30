'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
	const container = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

			tl.fromTo(
				'.ambient-glow',
				{ opacity: 0, scale: 0.8 },
				{ opacity: 0.12, scale: 1, duration: 2 },
			)
				.fromTo(
					'.aside-bar',
					{ x: 100, opacity: 0 },
					{ x: 0, opacity: 1, duration: 1 },
					'-=1.5',
				)
				.fromTo(
					'.huge-title',
					{ opacity: 0, x: -100 },
					{ opacity: 1, x: 0, duration: 1.4 },
					'-=1',
				)
				.fromTo(
					'.floating-card',
					{ opacity: 0, y: 50 },
					{ opacity: 1, y: 0, duration: 1 },
					'-=0.8',
				)
				.fromTo(
					'.mobile-cta',
					{ opacity: 0, y: 20 },
					{ opacity: 1, y: 0, duration: 0.8 },
					'-=0.5',
				);
		},
		{ scope: container },
	);

	return (
		<section
			ref={container}
			className='relative h-screen w-full bg-bg-dark flex items-center overflow-hidden font-body select-none'>
			{/* 1. LUKSUZNI AMBIJENTALNI SJAJ */}
			<div className='ambient-glow absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyber-lime rounded-full blur-[180px] pointer-events-none' />

			{/* 2. POZADINSKI VIDEO */}
			<div className='absolute inset-0 z-0 pr-0 md:pr-20'>
				{' '}
				{/* Ostavljamo prostor za desni sajdbar */}
				<video
					autoPlay
					loop
					muted
					playsInline
					className='w-full h-full object-cover opacity-50 filter contrast-110'
					src='video/video-1.mp4'
				/>
				<div className='absolute inset-0 bg-linear-to-r from-bg-dark via-bg-dark/40 to-bg-dark' />
			</div>

			{/* 3. ASIMETRIČNI SADRŽAJ */}
			<div className='relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-16 pr-8 md:pr-30'>
				{/* TOP ROW: Minimalni Branding */}
				<div className='flex items-center justify-between w-full'>
					<div className='font-display font-black text-xl tracking-widest text-text-primary'>
						VRTX<span className='text-cyber-lime'>_</span>
					</div>
					<div className='md:text-[10px] text-[9px] font-mono md:tracking-[0.3em] tracking-[0.15em] text-text-muted uppercase'>
						{'// METABOLIC ENGINE: ACTIVE'}
					</div>
				</div>

				{/* MIDDLE ROW: Ogroman, pomeren naslov (Bleed izgled) */}
				<div className='w-full my-auto'>
					<h1 className='huge-title opacity-0 font-display text-5xl md:text-[9vw] font-black text-text-primary uppercase md:leading-[0.8] leading-none tracking-tighter max-w-4xl'>
						OWN YOUR <br />
						<span className='text-transparent bg-clip-text bg-linear-to-r from-white  to-text-muted/50'>
							STRENGTH
						</span>
						<span className='text-cyber-lime drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]'>
							.
						</span>
					</h1>
				</div>

				{/* BOTTOM ROW: Lebdeća tehnička kartica u desnom uglu */}
				<div className='w-full flex max-md:flex-col gap-3 justify-between items-end'>
					{/* Levica ostaje prazna, daje prostor videu da "diše" */}
					<div className='hidden md:block text-[10px] font-mono tracking-widest text-text-muted'>
						[ MODEL: ALPHA_PHASE ] <br />[ FOCUS: POSTERIOR_CHAIN ]
					</div>

					{/* Desna asimetrična kartica sa pasusom */}
					<div className='floating-card opacity-0 bg-bg-card/40 border border-white/10 p-6 md:p-8 max-w-md backdrop-blur-md relative'>
						<div className='absolute top-0 left-0 w-8 h-px bg-cyber-lime' />
						<div className='absolute top-0 left-0 w-px h-8 bg-cyber-lime' />

						<span className='text-cyber-lime font-mono text-[10px] tracking-widest block mb-3 uppercase'>
							{'// METHODOLOGY_01'}
						</span>
						<p className='text-text-muted text-sm md:text-base font-light leading-relaxed tracking-wide'>
							An architectural approach to human performance. We ditch generic
							routines to forge elite physical discipline and unyielding power.
						</p>
					</div>
					{/* MOBILNI CTA GUMB - Vidljiv SAMO na mobilnom, fiksiran odmah ispod kartice */}
					<div className='mobile-cta opacity-0 w-full block md:hidden'>
						<a
							href='#booking'
							className='w-full flex items-center justify-center py-4 bg-cyber-lime text-black font-mono font-bold uppercase text-xs tracking-widest shadow-[0_4px_20px_rgba(204,255,0,0.3)]'>
							Book Session _
						</a>
					</div>
				</div>
			</div>

			{/* 4. DESNI FIKSIRANI CTA SAJDBAR (Zaboravi klasične gumbiće) */}
			<div className='aside-bar hidden opacity-0 absolute top-0 right-0 h-full w-20 md:w-25 border-l border-white/10 bg-bg-card/20 backdrop-blur-md z-20 md:flex flex-col items-center justify-between py-12'>
				{/* Gornji indeks u sajdbaru */}
				<div className='text-[10px] font-mono tracking-widest text-text-muted rotate-90 my-4 uppercase whitespace-nowrap'>
					VRTX // INT
				</div>

				{/* GLAVNI OKIDAČ OKRENUT ZA 90 STEPENI */}
				<a
					href='#booking'
					className='group relative flex items-center justify-center h-48 w-full transition-all duration-300'>
					{/* Pozadinski neon koji se pali na hover duž celog sajdbara */}
					<div className='absolute inset-0 bg-cyber-lime scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out' />

					{/* Tekst gumba */}
					<span className='font-mono font-bold uppercase text-xs tracking-[0.4em] rotate-270 whitespace-nowrap text-text-primary group-hover:text-black transition-colors duration-300 z-10'>
						BOOK SESSION _
					</span>
				</a>

				{/* Donji indeks - Verzija */}
				<div className='text-[10px] font-mono text-cyber-lime tracking-tighter'>
					V.4.0
				</div>
			</div>
		</section>
	);
}
