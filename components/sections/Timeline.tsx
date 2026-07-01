'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function MetabolicTimeline() {
	const containerRef = useRef<HTMLDivElement>(null);
	const progressLineRef = useRef<HTMLDivElement>(null);
	const phaseRefs = useRef<HTMLDivElement[]>([]);

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top 70%',
				},
				defaults: { ease: 'power4.out', duration: 0.8 },
			});
			tl.fromTo('.header', { opacity: 0, y: 20 }, { opacity: 1, y: 0 });
			// Animacija punjenja neonske linije dok skrolujemo kroz sekciju
			gsap.fromTo(
				progressLineRef.current,
				{ height: '0%' },
				{
					height: '100%',
					ease: 'none',
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top 30%',
						end: 'bottom 70%',
						scrub: 0.5,
					},
				},
			);

			// Paljenje (fade-in i lagani skok) svake faze pojedinačno kako stigne na ekran
			phaseRefs.current.forEach((phase) => {
				if (!phase) return;

				const triggerPoint = phase.querySelector('.phase-trigger');
				const contentNode = phase.querySelector('.phase-content');

				gsap.fromTo(
					contentNode,
					{ opacity: 0.2, y: 20, filter: 'blur(4px)' },
					{
						opacity: 1,
						y: 0,
						filter: 'blur(0px)',
						duration: 0.6,
						scrollTrigger: {
							trigger: triggerPoint || phase,
							start: 'top 85%',
							toggleActions: 'play none none reverse',
						},
					},
				);
			});
		},
		{ scope: containerRef },
	);

	const phases = [
		{
			num: '01',
			title: 'BASE CONDITIONING',
			duration: 'WEEKS 01 - 04',
			status: 'INITIALIZED',
			color: 'border-white/10 text-text-primary',
			bullets: [
				'Metabolic reset and baseline assessment',
				'Restoring joint mobility & fixing posture imbalances',
				'CNS adaptation to structural load',
			],
		},
		{
			num: '02',
			title: 'HYPERTROPHIC SHIFT',
			duration: 'WEEKS 05 - 08',
			status: 'COMPILING',
			color:
				'border-cyber-lime/30 text-cyber-lime filter drop-shadow-[0_0_10px_rgba(204,255,0,0.15)]',
			bullets: [
				'Accelerated myofibrillar hypertrophy',
				'Increasing metabolic rate during rest periods',
				'Targeting weak links in the posterior chain',
			],
		},
		{
			num: '03',
			title: 'PEAK POWER & SHRED',
			duration: 'WEEKS 09 - 12',
			status: 'LOCKED',
			color: 'border-white/10 text-text-primary',
			bullets: [
				'Maximal force production & conditioning',
				'Aggressive lipid oxidation (shred phase)',
				'Finalizing systemic optimization',
			],
		},
	];

	return (
		<section
			ref={containerRef}
			className='bg-bg-dark w-full min-h-screen py-24 px-6 md:px-16 relative overflow-hidden font-body select-none'>
			{/* BACKGROUND TECH GRID DECORATION */}
			<div className='absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-30 pointer-events-none' />

			{/* HEADER SEKCIJE */}
			<div className='max-w-5xl mx-auto mb-20 md:mb-32 relative z-10 header'>
				<span className='text-cyber-lime font-mono tracking-[0.3em] text-[10px] md:text-xs uppercase block mb-3'>
					{'// SYSTEM_ARCHITECTURE'}
				</span>
				<h2 className='font-display text-4xl md:text-7xl font-black text-text-primary uppercase leading-none tracking-tighter'>
					THE METABOLIC <br /> TIMELINE
					<span className='text-cyber-lime'>.</span>
				</h2>
			</div>

			{/* TIMELINE GLAVNI KONTEJNER */}
			<div className='max-w-5xl mx-auto relative grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 md:gap-0'>
				{/* 1. LEVA KOLONA: GLAVNA VERTIKALNA LINIJA (Na desktopu fiksirana levo) */}
				<div className='relative hidden md:flex justify-center w-full'>
					{/* Pozadinska tamna linija */}
					<div className='absolute top-0 bottom-0 w-px bg-white/10' />
					{/* Aktivna neonska linija koja se puni na skrol */}
					<div
						ref={progressLineRef}
						className='absolute top-0 w-0.5 bg-linear-to-b from-cyber-lime to-emerald-500 shadow-[0_0_10px_#CCFF00]'
						style={{ height: '0%' }}
					/>
				</div>

				{/* 2. DESNA KOLONA: FAZE PROGRAMA */}
				<div className='flex flex-col gap-16 md:gap-32 relative z-10'>
					{phases.map((p, idx) => (
						<div
							key={p.num}
							ref={(el) => {
								if (el) phaseRefs.current[idx] = el;
							}}
							className='grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6 md:gap-12 items-start'>
							{/* Marker / Okidač za GSAP */}
							<div className='phase-trigger font-mono flex md:flex-col justify-between md:justify-start gap-2 pt-2 border-b border-white/5 md:border-none pb-3 md:pb-0'>
								<div className='text-5xl md:text-7xl font-black tracking-tighter text-white/10 leading-none'>
									{p.num}
								</div>
								<div className='text-right md:text-left'>
									<div className='text-xs text-text-muted tracking-widest'>
										{p.duration}
									</div>
									<div className='text-[9px] text-cyber-lime/60 tracking-wider mt-1'>
										[{p.status}]
									</div>
								</div>
							</div>

							{/* Sadržaj faze (HUD BOX) */}
							<div className='phase-content transition-all duration-300'>
								<div
									className={`border p-6 md:p-8 bg-bg-card/40 backdrop-blur-md relative overflow-hidden ${p.color}`}>
									{/* Tech ćoškovi */}
									<div className='absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-40' />
									<div className='absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-40' />

									<h3 className='font-display text-xl md:text-2xl font-black tracking-tight mb-6 uppercase text-text-primary'>
										{p.title}
									</h3>

									<ul className='flex flex-col gap-4 font-mono text-xs md:text-sm text-text-muted'>
										{p.bullets.map((bullet, bIdx) => (
											<li
												key={bIdx}
												className='flex items-start gap-3'>
												<span className='text-cyber-lime '>_</span>
												<span className='leading-relaxed'>{bullet}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
