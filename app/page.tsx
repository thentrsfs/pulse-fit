import Hero from '@/components/sections/Hero';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Timeline from '@/components/sections/Timeline';
import PricingAndBooking from '@/components/sections/PricingAndBooking';
import Faq from '@/components/sections/Faq';
import Footer from '@/components/sections/Footer';

export default function Home() {
	return (
		<div>
			<Hero />
			<BeforeAfter />
			<Timeline />
			<PricingAndBooking />
			<Faq />
			<Footer />
		</div>
	);
}
