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

			// ==========================================
			// 💻 DESKTOP VERZIJA (Horizontalni Skener)
			// ==========================================
			mm.add('(min-width: 768px)', () => {
				// Resetujemo stilove ako se prozor smanjivao/povećavao
				gsap.set(beforeContainerRef.current, { height: '100%', width: '100%' });
				gsap.set(sliderLineRef.current, {
					top: 0,
					left: '100%',
					height: '100%',
					width: '2px',
				});

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

			// ==========================================
			// 📱 MOBILNA VERZIJA (Vertikalni Skener - Top to Bottom)
			// ==========================================
			mm.add('(max-width: 767px)', () => {
				// Inicijalno postavljamo Before da pokriva sve, a liniju na sam vrh
				gsap.set(beforeContainerRef.current, { width: '100%', height: '100%' });
				gsap.set(sliderLineRef.current, {
					left: 0,
					top: '0%',
					width: '100%',
					height: '2px',
				});

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: triggerRef.current,
						start: 'top top',
						end: '+=120%', // Zaključava ekran dok skener ne prođe
						scrub: 0.6,
						pin: true,
						anticipatePin: 1,
					},
				});

				// Smanjujemo visinu Before kontejnera odozgo na dole (otkriva After ispod)
				tl.to(beforeContainerRef.current, { height: '0%', ease: 'none' }).to(
					sliderLineRef.current,
					{ top: '100%', ease: 'none' },
					'<',
				);
			});

			return () => mm.revert();
		},
		{ scope: triggerRef },
	);

	const metrics = [
		{
			id: 'energy',
			label: 'ENERGY',
			beforeVal: 'LOW',
			afterVal: 'PEAK',
			beforePct: '15%',
			afterPct: '100%',
		},
		{
			id: 'fat',
			label: 'BODY FAT',
			beforeVal: '31%',
			afterVal: '11%',
			beforePct: '85%',
			afterPct: '25%',
		},
		{
			id: 'strength',
			label: 'STRENGTH',
			beforeVal: '38%',
			afterVal: '95%',
			beforePct: '38%',
			afterPct: '95%',
		},
		{
			id: 'mobility',
			label: 'MOBILITY',
			beforeVal: '42%',
			afterVal: '98%',
			beforePct: '42%',
			afterPct: '98%',
		},
		{
			id: 'focus',
			label: 'FOCUS',
			beforeVal: 'LOW',
			afterVal: 'PEAK',
			beforePct: '20%',
			afterPct: '100%',
		},
	];

	return (
		<div
			ref={triggerRef}
			id='before-after-section'
			className='relative w-full h-screen bg-bg-dark overflow-hidden font-body select-none'>
			{/* LEVO: ASIMETRIČNI NASLOV SEKCIJE */}
			<div className='absolute top-6 left-6 md:top-12 md:left-16 z-30 max-w-md pointer-events-none'>
				<span className='text-cyber-lime font-mono tracking-[0.3em] text-[10px] md:text-xs uppercase block mb-1 md:mb-3'>
					{'// RADICAL TRANSFORMATION'}
				</span>
				<h2 className='font-display text-3xl md:text-6xl font-black text-text-primary uppercase leading-none tracking-tighter'>
					METABOLIC <br className='hidden md:block' /> SHIFT
					<span className='text-cyber-lime'>.</span>
				</h2>
			</div>

			{/* DESNO: TECH INFO */}
			<div className='absolute top-6 right-6 md:top-12 md:right-16 z-30 text-right font-mono text-[9px] md:text-[10px] tracking-widest text-text-muted hidden sm:block'>
				[ DATA_SET: #0942 ] <br />[ VERIFIED_BY_VRTX_LAB ]
			</div>

			{/* GLAVNI PROSTOR */}
			<div className='relative w-full h-full flex items-center justify-center'>
				{/* =================================================== */}
				{/* === AFTER STRANA (Fiksna ispod) =================== */}
				{/* =================================================== */}
				<div className='absolute inset-0 w-full h-full z-10'>
					<div
						className='w-full h-full bg-cover bg-center filter contrast-115 brightness-95'
						style={{ backgroundImage: `url('/images/after-1.jpg')` }}
					/>

					{/* AFTER METRIKE (Traka na dnu za mobilni, vertikalno desno za desktop) */}
					<div className='absolute z-30 pointer-events-none w-full md:w-64 flex flex-row flex-wrap justify-center gap-2 px-4 bottom-24 left-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-16 md:left-auto md:flex-col md:gap-3'>
						{metrics.map((m) => (
							<div
								key={`after-${m.id}`}
								className='bg-black/60 backdrop-blur-md p-2 md:p-3 border border-cyber-lime/20 font-mono text-[10px] md:text-xs text-text-primary uppercase tracking-wider relative flex flex-col min-w-18.75 md:w-full'>
								<span className='text-text-muted text-[8px] md:text-[9px]'>
									{m.label}
								</span>
								<span className='text-cyber-lime font-bold text-xs md:text-sm'>
									{m.afterVal}
								</span>
								<div className='hidden md:block w-full h-1 bg-white/10 relative mt-1.5'>
									<div
										className='h-full bg-cyber-lime shadow-[0_0_8px_#CCFF00]'
										style={{ width: m.afterPct }}
									/>
								</div>
							</div>
						))}
					</div>

					<div className='absolute hidden md:block bottom-12 right-6 md:right-16 z-30 font-display text-4xl md:text-8xl font-black text-cyber-lime opacity-30 uppercase tracking-tighter pointer-events-none'>
						AFTER_
					</div>
					<div className='absolute md:hidden bottom-[40%] -rotate-90 right-6 w-8 z-10 font-display text-4xl font-black text-cyber-lime uppercase tracking-tighter pointer-events-none drop-shadow-[0_0_8px_#000]'>
						AFTER_
					</div>
				</div>

				{/* =================================================== */}
				{/* === BEFORE STRANA (Prekriva i skraćuje se na skrol) === */}
				{/* =================================================== */}
				<div
					ref={beforeContainerRef}
					className='absolute inset-x-0 top-0 w-full h-full z-20 overflow-hidden'>
					<div className='absolute top-0 left-0 w-full h-50 bg-linear-to-b from-bg-dark via-bg-dark/20 to-transparent pointer-events-none z-10' />
					<div className='absolute inset-0 w-full h-full bg-bg-dark/50 z-20' />
					<div
						className='absolute left-0 top-0 w-full h-screen bg-cover bg-center grayscale-60 contrast-100'
						style={{ backgroundImage: `url('/images/before.jpg')` }}
					/>
					{/* BEFORE METRIKE (Preklapa se tačno preko After trake na mobilnom) */}
					<div className='absolute z-30 pointer-events-none w-full md:w-64 flex flex-row flex-wrap justify-center gap-2 px-4 bottom-24 left-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-16 md:right-auto md:flex-col md:gap-3'>
						{metrics.map((m) => (
							<div
								key={`before-${m.id}`}
								className='bg-black/70 backdrop-blur-md p-2 md:p-3 border border-red-500/20 font-mono text-[10px] md:text-xs text-text-primary uppercase tracking-wider relative flex flex-col min-w-18.75 md:w-full'>
								<span className='text-text-muted text-[8px] md:text-[9px]'>
									{m.label}
								</span>
								<span className='text-red-500 font-bold text-xs md:text-sm animate-pulse'>
									{m.beforeVal}
								</span>
								<div className='hidden md:block w-full h-1 bg-white/10 relative mt-1.5'>
									<div
										className='h-full bg-red-500 shadow-[0_0_8px_#EF4444]'
										style={{ width: m.beforePct }}
									/>
								</div>
							</div>
						))}
					</div>

					<div className='absolute hidden md:block bottom-12 left-6 md:left-16 z-30 font-display text-4xl md:text-8xl font-black text-text-primary opacity-20 uppercase tracking-tighter pointer-events-none'>
						BEFORE_
					</div>
					<div className='absolute md:hidden bottom-[60%] rotate-90 left-6 w-8 z-10 font-display text-4xl font-black text-text-primary/40 uppercase tracking-tighter pointer-events-none'>
						BEFORE_
					</div>
				</div>

				{/* === SEPARATOR LINIJA SA SJAJEM (Rotira se u horizontalnu na mobilnom) === */}
				<div
					ref={sliderLineRef}
					className='absolute bg-cyber-lime z-30 pointer-events-none shadow-[0_0_20px_#CCFF00]'>
					{/* Mali tech kružić na sredini linije */}
					<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-bg-dark border-2 border-cyber-lime rounded-full' />
				</div>
			</div>

			{/* DONJI INFO PANEL */}
			<div className='absolute bottom-6 left-6 md:bottom-12 md:left-1/2 md:-translate-x-1/2 z-30 bg-bg-card/60 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 border border-white/10 text-left md:text-center font-mono text-[10px] md:text-xs uppercase tracking-widest text-text-muted w-[calc(100%-3rem)] md:w-auto'>
				<span className='text-text-primary'>Program:</span> METABOLIC PROTOCOL{' '}
				<span className='text-cyber-lime mx-1 md:mx-2'>{'//'}</span>{' '}
				<span className='text-text-primary'>TOTAL DURATION:</span> 12 Weeks
				<span className='text-cyber-lime mx-1 md:mx-2'>{'//'}</span>{' '}
				<span className='text-text-primary'>SYSTEM STATUS:</span> OPTIMIZED
			</div>
		</div>
	);
}
