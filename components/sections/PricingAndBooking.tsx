'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PricingAndBooking() {
	const containerRef = useRef<HTMLDivElement>(null);

	// Tvoj živi Schedulify link ka javnoj stranici biznisa
	const SCHEDULIFY_PUBLIC_URL =
		'https://schedulify-4tvf.vercel.app/book/vrtx-metabolic-lab';

	const protocols = [
		{
			num: '01',
			name: 'BASE PROTOCOL',
			tag: 'REMOTE_ACCESS',
			price: '2 500',
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
			num: '02',
			name: 'HYBRID HYPER PROTOCOL',
			tag: 'RECOMMENDED_SYSTEM',
			price: '4 750',
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
			num: '03',
			name: 'APEX 1-ON-1 VIP',
			tag: 'MAXIMUM_CAPACITY',
			price: '10 000',
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

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top 60%',
					toggleActions: 'play none none none',
				},
				defaults: { ease: 'power4.out', duration: 0.8 },
			});

			tl.fromTo('.header', { opacity: 0, y: 40 }, { opacity: 1, y: 0 })
				.fromTo(
					'.protocol-card',
					{ opacity: 0, y: 30 },
					{ opacity: 1, y: 0, stagger: 0.15 },
					'-=0.8',
				)
				.fromTo(
					'.schedulify-container',
					{ opacity: 0, y: 30 },
					{ opacity: 1, y: 0 },
				);
		},
		{ scope: containerRef },
	);

	return (
		<section
			ref={containerRef}
			className='bg-bg-dark w-full min-h-screen py-24 px-6 md:px-16 relative overflow-hidden font-body select-none'>
			{/* GRID BACKGROUND */}
			<div className='absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-30 pointer-events-none' />

			{/* HEADER SEKCIJE */}
			<div className='max-w-6xl mx-auto mb-20 relative z-10 header'>
				<span className='text-cyber-lime font-mono tracking-[0.3em] text-[10px] md:text-xs uppercase block mb-3'>
					{'// SYSTEM_INVESTMENT_TIERS'}
				</span>
				<h2 className='font-display text-4xl md:text-7xl font-black text-text-primary uppercase leading-none tracking-tighter'>
					AVAILABLE <br /> PROTOCOLS<span className='text-cyber-lime'>.</span>
				</h2>
			</div>

			{/* INFORMATIVNE KARTICE / PAKETI */}
			<div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 items-stretch mb-24'>
				{protocols.map((p) => (
					<div
						key={p.num}
						className={`border p-6 md:p-8 bg-bg-card/30 backdrop-blur-md relative flex flex-col justify-between transition-all duration-300 protocol-card ${
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

						<div>
							<div className='flex justify-between items-center font-mono text-[10px] text-text-muted mb-6 border-b border-white/5 pb-4'>
								<span>[{p.tag}]</span>
								<span
									className={p.recommended ? 'text-cyber-lime font-bold' : ''}>
									SYS_ID: #{p.num}
								</span>
							</div>

							<h3 className='font-display text-2xl font-black uppercase tracking-tight mb-2'>
								{p.name}
							</h3>

							<div className='font-mono flex items-baseline gap-1 my-6'>
								<span
									className={`text-4xl md:text-5xl font-black tracking-tighter ${p.recommended ? 'text-cyber-lime filter drop-shadow-[0_0_8px_#CCFF00]' : 'text-text-primary'}`}>
									{p.price}
								</span>
								<span className='text-text-muted text-xs'>
									_CZK / {p.period}
								</span>
							</div>

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
					</div>
				))}
			</div>

			{/* =================================================== */}
			{/* === SCHEDULIFY INTEGRACIJA */}
			{/* =================================================== */}
			<div className='max-w-6xl mx-auto relative z-10 schedulify-container '>
				<div className='border border-white/10 bg-bg-card/20 backdrop-blur-md md:p-8 relative'>
					<div className='absolute top-0 left-0 w-3 h-3 border-t border-l border-cyber-lime' />
					<div className='absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyber-lime' />

					{/* HUD Header za kalendar */}
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/5 max-md:p-6 md:pb-6 font-mono'>
						<div>
							<span className='text-cyber-lime text-xs uppercase block tracking-widest'>
								{'// LIVE_SCHEDULIFY_GATEWAY'}
							</span>
							<h4 className='text-xl font-display font-black text-text-primary uppercase mt-1'>
								INITIALIZE YOUR SYSTEM DEPLOYMENT
							</h4>
						</div>
						<div className='text-right text-[10px] text-text-muted uppercase tracking-widest hidden sm:block'>
							[ SECURE ACCESS GATEWAY ] <br />[ POWERED_BY_SCHEDULIFY ]
						</div>
					</div>

					{/* ŽIVI IFRAME KOJI ODMAH POKAZUJE TVOJ SISTEM */}
					<div className='w-full min-h-187 bg-black/50 relative border border-white/5 z-20'>
						<iframe
							src={SCHEDULIFY_PUBLIC_URL}
							className='w-full md:h-187 h-250 border-none opacity-95'
							title='Schedulify Live Booking Engine'
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
