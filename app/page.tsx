import Hero from '@/components/sections/Hero';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Timeline from '@/components/sections/Timeline';
import PricingAndBooking from '@/components/sections/PricingAndBooking';
import Faq from '@/components/sections/Faq';

export default function Home() {
	return (
		<div>
			<Hero />
			<BeforeAfter />
			<Timeline />
			<PricingAndBooking />
			<Faq />
		</div>
	);
}
