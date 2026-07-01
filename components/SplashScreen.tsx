'use client';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SplashScreenProps {
	onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [progress, setProgress] = useState(0);
	const [statusText, setStatusText] = useState('INITIALIZING_BOOT_SEQUENCE...');

	// 1. Logika za kucanje procenta (0-100)
	useEffect(() => {
		const textLogs = [
			'CONNECTING_TO_VRTX_CORE...',
			'LOADING_METABOLIC_ENGINES...',
			'SYNC_SCHEDULIFY_GATEWAY...',
			'ESTABLISHING_BIOMETRIC_PROTOCOLS...',
			'SYSTEM_READY.',
		];

		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					return 100;
				}

				// Menjamo usputne tekstove u zavisnosti od procenta za bolji sci-fi efekat
				const logIndex = Math.floor((prev / 100) * textLogs.length);
				if (textLogs[logIndex] && statusText !== textLogs[logIndex]) {
					setStatusText(textLogs[logIndex]);
				}

				// Nasumični skokovi procenta (da deluje kao pravo učitavanje softvera)
				const increment = Math.floor(Math.random() * 12) + 4;
				return Math.min(prev + increment, 100);
			});
		}, 80);

		return () => clearInterval(interval);
	}, [statusText]);

	// 2. GSAP Animacija odlaska kada stigne do 100%
	useGSAP(() => {
		if (progress === 100) {
			const tl = gsap.timeline();

			tl.to('.splash-text-node', {
				opacity: 0,
				y: -10,
				duration: 0.25,
				ease: 'power2.in',
			}).to(
				containerRef.current,
				{
					yPercent: -100,
					duration: 0.55, // Brzo i fluidno podizanje
					ease: 'power3.inOut',
					onComplete: () => {
						// Kada ode gore, dozvoli klikove kroz njega i javi glavnoj stranici
						if (containerRef.current) {
							containerRef.current.style.display = 'none'; // Potpuno ga gasimo sa ekrana
						}
						onComplete();
					},
				},
				'+=0.05',
			);
		}
	}, [progress, onComplete]);

	return (
		<div
			ref={containerRef}
			className='fixed inset-0 bg-bg-dark z-9999 flex flex-col justify-between p-8 md:p-16 font-mono select-none'>
			{/* Top dekoracija */}
			<div className='flex justify-between items-center text-[10px] text-white/20 splash-text-node'>
				<div>SYS_BOOT: v4.0.2</div>
				<div>LOCATION: 50.1062° N</div>
			</div>

			{/* Sredina: Glavni brojač i status */}
			<div className='max-w-xl splash-text-node'>
				<div className='text-6xl md:text-8xl font-black text-text-primary tracking-tighter mb-4'>
					{progress < 10 ? `0${progress}` : progress}
					<span className='text-cyber-lime'>%</span>
				</div>
				<div className='text-xs text-cyber-lime tracking-widest animate-pulse'>
					{'//'} {statusText}
				</div>
			</div>

			{/* Bottom dekoracija / Loading bar */}
			<div className='w-full flex flex-col gap-3 splash-text-node'>
				<div className='w-full h-0.5 bg-white/5 relative overflow-hidden'>
					<div
						className='h-full bg-cyber-lime transition-all duration-100 ease-out shadow-[0_0_10px_#CCFF00]'
						style={{ width: `${progress}%` }}
					/>
				</div>
				<div className='text-[9px] text-white/20 text-right'>
					AUTHENTICATION_REQUIRED // SYSTEM_LOAD_ACTIVE
				</div>
			</div>
		</div>
	);
}
