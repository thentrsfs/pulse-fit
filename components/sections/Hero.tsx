'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
	const container = useRef<HTMLDivElement>(null);
	const tagRef = useRef<HTMLSpanElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const textRef = useRef<HTMLParagraphElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

			tl.fromTo(
				tagRef.current,
				{ opacity: 0, y: -30 },
				{ opacity: 1, y: 0, duration: 0.8 },
			)
				.fromTo(
					titleRef.current,
					{ opacity: 0, scale: 0.95, y: 40 },
					{ opacity: 1, scale: 1, y: 0, duration: 1.2 },
					'-=0.5',
				)
				.fromTo(
					textRef.current,
					{ opacity: 0, y: 20 },
					{ opacity: 1, y: 0, duration: 0.8 },
					'-=0.6',
				)
				.fromTo(
					buttonRef.current,
					{ opacity: 0, scale: 0.8 },
					{ opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
					'-=0.4',
				);
		},
		{ scope: container },
	);

	return (
		<section
			ref={container}
			className='relative h-screen w-full bg-bg-dark flex items-center justify-center overflow-hidden font-body'>
			{/* Background Cyber Grid */}
			<div className='absolute inset-0 opacity-10 pointer-events-none'>
				<div className='absolute inset-0 bg-[linear-gradient(to_right,#1F232B_1px,transparent_1px),linear-gradient(to_bottom,#1F232B_1px,transparent_1px)] bg-size-[4rem_4rem]' />
				<div className='absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_50%,transparent,transparent_40%,#0B0C10_100%)]' />
			</div>

			{/* Cyber Glow Pulse */}
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-cyber-lime opacity-5 rounded-full blur-[120px] pointer-events-none animate-pulse' />

			{/* Main Content */}
			<div className='relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center'>
				<span
					ref={tagRef}
					className='text-cyber-lime font-mono tracking-[0.3em] text-xs md:text-sm uppercase mb-6 opacity-0'>
					// VRTX PERFORMANCE LAB //
				</span>

				<h1
					ref={titleRef}
					className='font-display text-6xl md:text-8xl font-bold text-text-primary uppercase tracking-tight leading-[0.85] mb-8 select-none opacity-0'>
					Own Your <br />
					<span className='text-transparent bg-clip-text bg-linear-to-r from-white via-cyber-lime to-cyber-lime drop-shadow-[0_0_25px_rgba(204,255,0,0.4)]'>
						Evolution
					</span>
				</h1>

				<p
					ref={textRef}
					className='text-text-muted text-base md:text-xl max-w-2xl font-light mb-12 leading-relaxed tracking-wide opacity-0'>
					Elite athletic conditioning engineered for high-performers. Break
					boundaries and dominate your physical potential with the VRTX
					framework.
				</p>

				<div
					ref={buttonRef}
					className='opacity-0'>
					<a
						href='#booking'
						className='relative inline-flex items-center justify-center px-10 py-5 text-black font-mono font-bold uppercase tracking-widest text-sm bg-cyber-lime rounded-none overflow-hidden group shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(204,255,0,0.6)] hover:scale-105 active:scale-95'>
						<span className='absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer' />
						Book Initial Session
					</a>
				</div>
			</div>
		</section>
	);
}
