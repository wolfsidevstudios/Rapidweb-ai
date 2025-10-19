import { BlockType } from './types';
import Navbar from './components/blocks/Navbar';
import Hero from './components/blocks/Hero';
import Features from './components/blocks/Features';
import CallToAction from './components/blocks/CallToAction';
import Testimonials from './components/blocks/Testimonials';
import Contact from './components/blocks/Contact';
import Footer from './components/blocks/Footer';
import Gallery from './components/blocks/Gallery';
import Pricing from './components/blocks/Pricing';
import Team from './components/blocks/Team';
import Stats from './components/blocks/Stats';
import LogoCloud from './components/blocks/LogoCloud';
import { NavbarIcon } from './components/icons/NavbarIcon';
import { HeroIcon } from './components/icons/HeroIcon';
import { FeaturesIcon } from './components/icons/FeaturesIcon';
import { CtaIcon } from './components/icons/CtaIcon';
import { TestimonialsIcon } from './components/icons/TestimonialsIcon';
import { ContactIcon } from './components/icons/ContactIcon';
import { FooterIcon } from './components/icons/FooterIcon';
import { GalleryIcon } from './components/icons/GalleryIcon';
import { PricingIcon } from './components/icons/PricingIcon';
import { TeamIcon } from './components/icons/TeamIcon';
import { StatsIcon } from './components/icons/StatsIcon';
import { LogoCloudIcon } from './components/icons/LogoCloudIcon';

interface BlockConfig {
  name: string;
  type: BlockType;
  component: React.FC<any>;
  icon: React.FC<{ className?: string }>;
  defaultProps: Record<string, any>;
}

interface BlockCategory {
  name: string;
  blocks: BlockConfig[];
}

export const AVAILABLE_BLOCKS: BlockCategory[] = [
  {
    name: 'Layout',
    blocks: [
      { name: 'Navbar', type: 'navbar', component: Navbar, icon: NavbarIcon, defaultProps: { logoText: 'Logo', links: [{ text: 'Home', href: '#' }, { text: 'About', href: '#' }, { text: 'Contact', href: '#' }], buttonText: 'Sign Up' } },
      { name: 'Hero', type: 'hero', component: Hero, icon: HeroIcon, defaultProps: { title: 'Build Your Next Website', subtitle: 'Create beautiful, responsive websites in minutes.', primaryButtonText: 'Get Started', secondaryButtonText: 'Learn More' } },
      { name: 'Footer', type: 'footer', component: Footer, icon: FooterIcon, defaultProps: { text: `© ${new Date().getFullYear()} Your Company. All rights reserved.`, links: [{ text: 'Privacy', href: '#' }, { text: 'Terms', href: '#' }] } },
    ],
  },
  {
    name: 'Content',
    blocks: [
      { name: 'Features', type: 'features', component: Features, icon: FeaturesIcon, defaultProps: { title: 'Features', subtitle: 'Everything you need to succeed.', features: [{ name: 'Feature One', description: 'Description for feature one.' }, { name: 'Feature Two', description: 'Description for feature two.' }, { name: 'Feature Three', description: 'Description for feature three.' }] } },
      { name: 'Testimonials', type: 'testimonials', component: Testimonials, icon: TestimonialsIcon, defaultProps: { title: 'What Our Customers Say', testimonials: [{ quote: 'This is a fantastic product!', author: 'Jane Doe', role: 'CEO, Example Inc.' }, { quote: 'I love how easy it is to use.', author: 'John Smith', role: 'Developer' }] } },
      { name: 'Gallery', type: 'gallery', component: Gallery, icon: GalleryIcon, defaultProps: { title: 'Our Gallery', images: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'] } },
      { name: 'Team', type: 'team', component: Team, icon: TeamIcon, defaultProps: { title: 'Meet Our Team', members: [{ name: 'Person One', role: 'Founder', imageUrl: 'https://via.placeholder.com/150' }, { name: 'Person Two', role: 'Designer', imageUrl: 'https://via.placeholder.com/150' }] } },
      { name: 'Stats', type: 'stats', component: Stats, icon: StatsIcon, defaultProps: { stats: [{ value: '10k+', label: 'Users' }, { value: '98%', label: 'Satisfaction' }, { value: '1M+', label: 'Downloads' }] } },
    ]
  },
  {
    name: 'Marketing',
    blocks: [
      { name: 'Call To Action', type: 'cta', component: CallToAction, icon: CtaIcon, defaultProps: { title: 'Ready to dive in?', subtitle: 'Start your free trial today.', buttonText: 'Get Started' } },
      { name: 'Pricing', type: 'pricing', component: Pricing, icon: PricingIcon, defaultProps: { title: 'Our Pricing', plans: [{ name: 'Basic', price: '$10/mo', features: ['Feature A', 'Feature B'] }, { name: 'Pro', price: '$25/mo', features: ['Feature A', 'Feature B', 'Feature C'] }] } },
      { name: 'Logo Cloud', type: 'logocloud', component: LogoCloud, icon: LogoCloudIcon, defaultProps: { title: 'Trusted By', logos: ['https://via.placeholder.com/150x60/d1d5db/808080?text=Logo', 'https://via.placeholder.com/150x60/d1d5db/808080?text=Logo'] } },
      { name: 'Contact', type: 'contact', component: Contact, icon: ContactIcon, defaultProps: { title: 'Contact Us', description: 'We\'d love to hear from you.', buttonText: 'Send Message' } },
    ]
  }
];
