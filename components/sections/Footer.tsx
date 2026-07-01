'use client';
import { useRef } from 'react';

export default function Footer() {
	const footerRef = useRef<HTMLDivElement>(null);

	return (
		<footer
			ref={footerRef}
			className='bg-bg-dark w-full pt-24 pb-8 px-6 md:px-16 border-t border-white/5 relative overflow-hidden select-none font-mono'>
			{/* AMBIENT GLOW (Blagi neon odsjaj u levom uglu) */}
			<div className='absolute bottom-0 left-0 w-96 h-96 bg-cyber-lime/5 rounded-full filter blur-[120px] pointer-events-none' />

			<div className='max-w-6xl mx-auto relative z-10 flex flex-col justify-between h-full'>
				{/* GORNJI DEO: REŠETKA SA PODACIMA */}
				<div className='grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 border-b border-white/5 pb-16'>
					{/* KOLONA 1: LOKACIJA */}
					<div className='flex flex-col gap-2'>
						<span className='text-cyber-lime text-[10px] tracking-widest uppercase'>
							{'// PHYSICAL_HQ'}
						</span>
						<p className='text-text-primary font-bold text-xs leading-relaxed mt-2'>
							ARGENTINSKÁ 1621/36
							<br />
							170 00 HOLEŠOVICE
							<br />
							PRAGUE, CZECH REPUBLIC
						</p>
					</div>

					{/* KOLONA 2: RADNO VREME TERMINALA */}
					<div className='flex flex-col gap-2'>
						<span className='text-cyber-lime text-[10px] tracking-widest uppercase'>
							{'// CORE_OPERATIONS'}
						</span>
						<p className='text-text-muted text-xs leading-relaxed mt-2'>
							MON - FRI:{' '}
							<span className='text-text-primary'>06:00 - 22:00</span>
							<br />
							SATURDAY: <span className='text-text-primary'>08:00 - 18:00</span>
							<br />
							SUNDAY: <span className='text-cyber-lime'>[ LAB_CLOSED ]</span>
						</p>
					</div>

					{/* KOLONA 3: MREŽNI PARAMETRI */}
					<div className='flex flex-col gap-2'>
						<span className='text-cyber-lime text-[10px] tracking-widest uppercase'>
							{'// DEV_CONTACT'}
						</span>
						<div className='flex flex-col gap-2 text-xs mt-2 font-mono'>
							<a
								href='https://www.linkedin.com/in/filip-stojkov-315773a1/'
								target='_blank'
								rel='noopener noreferrer'
								className='text-text-muted hover:text-cyber-lime transition-colors duration-300 flex items-center gap-2'>
								[LN] LINKEDIN_NODE
							</a>
							<a
								href='https://www.instagram.com/filip.webdev/'
								target='_blank'
								rel='noopener noreferrer'
								className='text-text-muted hover:text-cyber-lime transition-colors duration-300 flex items-center gap-2'>
								[IG] INSTAGRAM_FEED
							</a>
							<a
								href='https://www.filipstojkov.com/'
								target='_blank'
								rel='noopener noreferrer'
								className='text-text-primary hover:text-cyber-lime transition-colors duration-300 flex items-center gap-2 font-bold'>
								[WEB] MY_PORTFOLIO
							</a>
						</div>
					</div>

					{/* KOLONA 4: SISTEMSKI STATUS */}
					<div className='flex flex-col gap-2 md:items-end md:text-right'>
						<span className='text-cyber-lime text-[10px] tracking-widest uppercase'>
							{'// SERVER_LOG'}
						</span>
						<div className='mt-2 flex flex-col gap-1 text-[11px] text-text-muted'>
							<div>
								STATUS:{' '}
								<span className='text-emerald-500 animate-pulse'>
									[ ONLINE_ ]
								</span>
							</div>
							<div>LOCATION: 50.1062° N, 14.4442° E</div>
							<div>YEAR_BUILD: [ 2026 ]</div>
						</div>
					</div>
				</div>

				{/* SREDNJI DEO: BRUTALISTIČKI DŽINOVSKI LOGO */}
				<div className='my-12 md:my-16 overflow-hidden'>
					<h1 className='font-display font-black text-[15vw] md:text-[18vw] text-white/2 uppercase leading-none tracking-tighter text-center select-none pointer-events-none'>
						VRTX_LAB
					</h1>
				</div>

				{/* DONJI DEO: COPYRIGHT I TVOJ POTPIS */}
				<div className='flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-text-muted tracking-widest uppercase pt-4'>
					<div>
						© {new Date().getFullYear()} VRTX METABOLIC LAB. ALL RIGHTS
						RESERVED.
					</div>

					{/* TVOJ BRENDING KOJI PRODAJE TVOJ SAAS */}
					<div className='flex items-center gap-1.5 bg-white/2 border border-white/5 px-3 py-1.5 rounded-sm'>
						<span>BUILT BY FILIP STOJKOV</span>
						<span className='text-white/20'>|</span>
						<span>
							POWERED BY{' '}
							<span className='text-cyber-lime font-bold'>SCHEDULIFY</span>
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
