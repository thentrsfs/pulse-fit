'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function PricingAndBooking() {
	const containerRef = useRef<HTMLDivElement>(null);
	const bookingRef = useRef<HTMLDivElement>(null);
	const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
	const [isBookingOpen, setIsBookingOpen] = useState(false);

	const { contextSafe } = useGSAP({ scope: containerRef });

	const handleInitialize = (protocolId: string) => {
		setSelectedProtocol(protocolId);
		setIsBookingOpen(true); // Samo palimo stanje da je otvoreno
	};
	useGSAP(
		() => {
			if (!isBookingOpen || !bookingRef.current) return;

			// 1. Prvo osiguraj da element nije sakriven preko CSS-a da bi GSAP mogao da mu izmeri visinu
			bookingRef.current.classList.remove('hidden');

			// 2. Pokreni animaciju otvaranja
			gsap.fromTo(
				bookingRef.current,
				{
					height: 0,
					opacity: 0,
					marginTop: 0,
				},
				{
					height: 'auto',
					opacity: 1,
					marginTop: 48,
					duration: 0.6,
					ease: 'power3.out',
					onComplete: () => {
						bookingRef.current?.scrollIntoView({
							behavior: 'smooth',
							block: 'start',
						});
					},
				},
			);
		},
		{ dependencies: [isBookingOpen], scope: containerRef },
	);

	const protocols = [
		{
			id: 'base',
			num: '01',
			name: 'BASE PROTOCOL',
			tag: 'REMOTE_ACCESS',
			price: '99',
			period: 'MO',
			recommended: false,
			features: [
				'Customized 12-week metabolic training architecture',
				'Hyper-tailored macronutrient & fueling strategy',
				'Weekly biometrics audit & remote adjustments',
				'24/7 direct encrypted chat with your coach',
			],
		},
		{
			id: 'hybrid',
			num: '02',
			name: 'HYBRID HYPER PROTOCOL',
			tag: 'RECOMMENDED_SYSTEM',
			price: '189',
			period: 'MO',
			recommended: true,
			features: [
				'Everything in Base Protocol included',
				'2x Monthly high-tier bio-mechanical form audits (In-Person)',
				'Advanced bloodwork & biomarker optimization analysis',
				'Priority server queue response status (<4h)',
			],
		},
		{
			id: 'apex',
			num: '03',
			name: 'APEX 1-ON-1 VIP',
			tag: 'MAXIMUM_CAPACITY',
			price: '399',
			period: 'MO',
			recommended: false,
			features: [
				'Full executive tier private coaching (1-on-1)',
				'Unlimited private gym lab entry & real-time monitoring',
				'Custom physiological data tracking & cellular recovery plan',
				'Direct hotline access with guaranteed 30-min response',
			],
		},
	];

	return (
		<section
			ref={containerRef}
			className='bg-bg-dark w-full min-h-screen py-24 px-6 md:px-16 relative overflow-hidden font-body select-none'>
			{/* GRID BACKGROUND */}
			<div className='absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none' />

			{/* HEADER */}
			<div className='max-w-6xl mx-auto mb-20 relative z-10'>
				<span className='text-cyber-lime font-mono tracking-[0.3em] text-[10px] md:text-xs uppercase block mb-3'>
					{'// CHOOSE_YOUR_DEPLOYMENT'}
				</span>
				<h2 className='font-display text-4xl md:text-7xl font-black text-text-primary uppercase leading-none tracking-tighter'>
					AVAILABLE <br /> PROTOCOLS<span className='text-cyber-lime'>.</span>
				</h2>
			</div>

			{/* KARTICE / PAKETI */}
			<div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 items-stretch'>
				{protocols.map((p) => (
					<div
						key={p.id}
						className={`border p-6 md:p-8 bg-bg-card/30 backdrop-blur-md relative flex flex-col justify-between transition-all duration-300 ${
							p.recommended
								? 'border-cyber-lime text-text-primary shadow-[0_0_30px_rgba(204,255,0,0.1)] lg:-translate-y-2'
								: 'border-white/10 text-text-primary hover:border-white/20'
						}`}>
						{/* TECH CORNERS */}
						<div
							className={`absolute top-0 left-0 w-2 h-2 border-t border-l border-current ${p.recommended ? 'text-cyber-lime' : 'opacity-40'}`}
						/>
						<div
							className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current ${p.recommended ? 'text-cyber-lime' : 'opacity-40'}`}
						/>

						{/* TOP META DATA */}
						<div>
							<div className='flex justify-between items-center font-mono text-[10px] text-text-muted mb-6 border-b border-white/5 pb-4'>
								<span>[{p.tag}]</span>
								<span
									className={p.recommended ? 'text-cyber-lime font-bold' : ''}>
									SYS_ID: #{p.num}
								</span>
							</div>

							{/* TITLES */}
							<h3 className='font-display text-2xl font-black uppercase tracking-tight mb-2'>
								{p.name}
							</h3>

							{/* PRICE */}
							<div className='font-mono flex items-baseline gap-1 my-6'>
								<span className='text-text-muted text-sm'>EUR_</span>
								<span
									className={`text-4xl md:text-5xl font-black tracking-tighter ${p.recommended ? 'text-cyber-lime filter drop-shadow-[0_0_8px_#CCFF00]' : 'text-text-primary'}`}>
									{p.price}
								</span>
								<span className='text-text-muted text-xs'>/_{p.period}</span>
							</div>

							{/* FEATURES LIST */}
							<ul className='flex flex-col gap-4 font-mono text-xs text-text-muted my-8'>
								{p.features.map((feat, fIdx) => (
									<li
										key={fIdx}
										className='flex items-start gap-3'>
										<span
											className={`mt-0.5 font-bold ${p.recommended ? 'text-cyber-lime' : 'text-text-primary'}`}>
											[+]
										</span>
										<span className='leading-relaxed'>{feat}</span>
									</li>
								))}
							</ul>
						</div>

						{/* CTA DUGME */}
						<button
							onClick={() => handleInitialize(p.id)}
							className={`w-full py-4 font-mono text-xs uppercase tracking-widest transition-all duration-300 border font-bold relative overflow-hidden group ${
								p.recommended
									? 'bg-cyber-lime text-bg-dark border-cyber-lime hover:bg-transparent hover:text-cyber-lime'
									: 'bg-transparent text-text-primary border-white/20 hover:border-cyber-lime hover:text-cyber-lime'
							}`}>
							{selectedProtocol === p.id
								? 'INITIALIZED_'
								: 'INITIALIZE PROTOCOL_'}
						</button>
					</div>
				))}
			</div>

			{/* =================================================== */}
			{/* === SCHEDULIFY INTEGRACIJA (Skrivena dok se ne klikne) === */}
			{/* =================================================== */}
			<div
				ref={bookingRef}
				className='max-w-6xl mx-auto hidden opacity-0 overflow-hidden relative z-10'
				style={{ height: 0 }}>
				<div className='border border-white/10 bg-bg-card/20 backdrop-blur-md p-6 md:p-12 relative'>
					<div className='absolute top-0 left-0 w-3 h-3 border-t border-l border-cyber-lime' />
					<div className='absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyber-lime' />

					{/* HUD Header za kalendar */}
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-white/5 pb-6 font-mono'>
						<div>
							<span className='text-cyber-lime text-xs uppercase block tracking-widest'>
								{'// INTERACTIVE_SECURE_BOOKING'}
							</span>
							<h4 className='text-xl font-display font-black text-text-primary uppercase mt-1'>
								SECURING PROTOCOL:{' '}
								<span className='text-cyber-lime'>
									{selectedProtocol?.toUpperCase()}
								</span>
							</h4>
						</div>
						<div className='text-right text-[10px] text-text-muted uppercase tracking-widest hidden sm:block'>
							[ STATUS: WAITING_FOR_USER_INPUT ] <br />[ Schedulify_v2.1_Live ]
						</div>
					</div>

					{/* OVDE LEŽI TVOJ SCHEDULIFY KALENDAR / ZAŠLEPLJUJEŠ TVOJ KOD FORME ILI IFRAME-A */}
					<div className='w-full min-h-[450px] border border-white/5 bg-black/40 flex flex-col items-center justify-center font-mono text-xs text-text-muted relative p-4'>
						{/* Blueprint dekoracije unutar samog kalendarskog prostora */}
						<div className='absolute top-4 right-4 text-[9px] text-red-500/40 animate-pulse'>
							[ LINK_ESTABLISHED ]
						</div>

						<p className='mb-4 text-center text-text-primary tracking-wide'>
							[ OVDE INTEGRISES SVOJ POSTOJEĆI SCHEDULIFY / CALENDLY KOD ]
						</p>
						<p className='max-w-md text-center text-[11px] leading-relaxed'>
							Forma, grid dana, i selektor slobodnih termina koji vuku podatke u
							realnom vremenu bez registracije. Sve u tamnom i monospaced stilu.
						</p>

						{/* Primer placeholder strukture za kalendar */}
						<div className='w-full max-w-xl mt-8 grid grid-cols-7 gap-2 text-center opacity-50'>
							{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
								<div
									key={d}
									className='text-[10px] text-cyber-lime font-bold pb-2 border-b border-white/5'>
									{d}
								</div>
							))}
							{Array.from({ length: 14 }).map((_, i) => (
								<div
									key={i}
									className='py-3 border border-white/5 bg-white/5 text-[10px] hover:border-cyber-lime cursor-pointer transition-colors'>
									{10 + i} <br />
									<span className='text-[8px] text-emerald-500'>[FREE]</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
