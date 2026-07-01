'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface FAQItem {
	id: string;
	question: string;
	answer: string;
}

export default function FAQ() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [openId, setOpenId] = useState<string | null>(null);
	const { contextSafe } = useGSAP({ scope: containerRef });

	const faqData: FAQItem[] = [
		{
			id: 'faq-1',
			question: 'DO I NEED TO BE BASED IN PRAGUE FOR THE HYBRID PROTOCOL?',
			answer:
				'Yes, for the in-person structural and biomechanical audits, you will need to visit our Prague HQ (Argentinská 36, Holešovice). However, the rest of the monitoring, nutritional architecture, and weekly data adjustments are fully remote via encrypted direct server dashboard.',
		},
		{
			id: 'faq-2',
			question: 'HOW DOES THE WEEKLY BIOMETRIC AUDIT WORK?',
			answer:
				'Every Sunday, you upload your physiological metric data log (weight, sleep latency, HRV, and blood glucose markers if tracking). Our system analyzes the delta, and your chief architect modifies your exact compound training volume and metabolic fueling blocks for the upcoming 7 days.',
		},
		{
			id: 'faq-3',
			question: 'HOW CAN I CANCEL OR MODIFY MY APPOINTMENT?',
			answer:
				'If you need to change your session, you can do so by contacting us directly via email or our priority chat line at least 24 hours in any direction before your scheduled slot, allowing the system to reallocate the laboratory resources.',
		},
		{
			id: 'faq-4',
			question: 'WHAT IS THE DELIVERABILITY PROTOCOL OF THE APEX 1-ON-1 TIER?',
			answer:
				'The APEX tier is strictly capped at 5 elite clients simultaneously to ensure absolute system fidelity. It includes unconditional access to the private facility, real-time cellular recovery analysis, and a guaranteed 30-minute response matrix directly from your head coach.',
		},
	];

	const toggleFAQ = contextSafe((id: string, index: number) => {
		const answerEl = document.getElementById(`answer-${id}`);
		const iconEl = document.getElementById(`icon-${id}`);

		if (!answerEl || !iconEl) return;

		if (openId === id) {
			// Zatvaranje trenutno otvorenog
			gsap.to(answerEl, {
				height: 0,
				opacity: 0,
				duration: 0.4,
				ease: 'power2.inOut',
			});
			gsap.to(iconEl, {
				rotate: 0,
				textShadow: 'none',
				color: '#888888',
				duration: 0.3,
			});
			setOpenId(null);
		} else {
			// Ako je već neki drugi otvoren, prvo zatvori njega
			if (openId) {
				const prevAnswer = document.getElementById(`answer-${openId}`);
				const prevIcon = document.getElementById(`icon-${openId}`);
				if (prevAnswer)
					gsap.to(prevAnswer, {
						height: 0,
						opacity: 0,
						duration: 0.4,
						ease: 'power2.inOut',
					});
				if (prevIcon)
					gsap.to(prevIcon, { rotate: 0, color: '#888888', duration: 0.3 });
			}

			// Otvaranje kliknutog
			gsap.fromTo(
				answerEl,
				{ height: 0, opacity: 0 },
				{ height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' },
			);
			gsap.to(iconEl, { rotate: 45, color: '#CCFF00', duration: 0.3 }); // Rotiramo [+] da postane [x] / [-] vizuelno
			setOpenId(id);
		}
	});

	return (
		<section
			ref={containerRef}
			className='bg-bg-dark w-full py-24 px-6 md:px-16 relative overflow-hidden font-body select-none border-t border-white/5'>
			<div className='max-w-4xl mx-auto relative z-10'>
				{/* HEADLINE */}
				<div className='mb-16'>
					<span className='text-cyber-lime font-mono tracking-[0.3em] text-[10px] uppercase block mb-3'>
						{'// SYSTEM_QUERY_RESOLUTIONS'}
					</span>
					<h2 className='font-display text-3xl md:text-5xl font-black text-text-primary uppercase tracking-tighter'>
						FREQUENTLY ASKED <br /> OPERATIONS
						<span className='text-cyber-lime'>?</span>
					</h2>
				</div>

				{/* FAQ ACCORDION LIST */}
				<div className='flex flex-col border-b border-white/5'>
					{faqData.map((faq, idx) => {
						const isOpen = openId === faq.id;
						return (
							<div
								key={faq.id}
								className={`border-t border-white/5 transition-colors duration-300 ${
									isOpen ? 'bg-white/1' : 'hover:bg-white/0.5'
								}`}>
								{/* GLAVA HARMONIKE (Dugme) */}
								<button
									onClick={() => toggleFAQ(faq.id, idx)}
									className='w-full max-md:pl-4 py-6 md:py-8 flex justify-between items-center text-left gap-6 group'>
									<span
										className={`font-display text-sm md:text-lg font-bold uppercase tracking-wide transition-colors duration-300 ${
											isOpen
												? 'text-cyber-lime'
												: 'text-text-primary group-hover:text-white'
										}`}>
										<span className='font-mono text-xs text-text-muted mr-4'>
											[0{idx + 1}]
										</span>
										{faq.question}
									</span>

									{/* INTERAKTIVNI INDIKATOR */}
									<span
										id={`icon-${faq.id}`}
										className='font-mono text-sm md:text-base text-text-muted transition-colors duration-300 shrink-0'>
										[+]
									</span>
								</button>

								{/* TELO HARMONIKE (Odgovor - GSAP kontroliše visinu) */}
								<div
									id={`answer-${faq.id}`}
									className='overflow-hidden opacity-0 h-0'>
									<div className='pb-8 pr-6 md:pr-12 font-mono text-xs md:text-sm text-text-muted leading-relaxed pl-10 border-l border-cyber-lime/30 ml-3 mb-2'>
										{faq.answer}
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* HUD FOOTNOTE */}
				<div className='mt-8 font-mono text-[9px] text-text-muted text-right uppercase tracking-widest'>
					[ END_OF_QUERY_LIST // DATA_STABLE ]
				</div>
			</div>
		</section>
	);
}
