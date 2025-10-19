
import { Category } from './types';
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

export const AVAILABLE_BLOCKS: Category[] = [
  {
    name: 'Headers & Footers',
    blocks: [
      { type: 'Navbar', name: 'Navigation Bar', component: Navbar, icon: NavbarIcon },
      { type: 'Footer', name: 'Footer Section', component: Footer, icon: FooterIcon },
    ]
  },
  {
    name: 'Heroes & Calls to Action',
    blocks: [
      { type: 'Hero', name: 'Hero Section', component: Hero, icon: HeroIcon },
      { type: 'CallToAction', name: 'Call To Action', component: CallToAction, icon: CtaIcon },
    ]
  },
  {
    name: 'Content & Features',
    blocks: [
      { type: 'Features', name: 'Features Grid', component: Features, icon: FeaturesIcon },
      { type: 'Gallery', name: 'Image Gallery', component: Gallery, icon: GalleryIcon },
      { type: 'Stats', name: 'Stats Section', component: Stats, icon: StatsIcon },
      { type: 'LogoCloud', name: 'Logo Cloud', component: LogoCloud, icon: LogoCloudIcon },
    ]
  },
  {
    name: 'Social & Business',
    blocks: [
      { type: 'Testimonials', name: 'Testimonials', component: Testimonials, icon: TestimonialsIcon },
      { type: 'Team', name: 'Team Section', component: Team, icon: TeamIcon },
      { type: 'Pricing', name: 'Pricing Table', component: Pricing, icon: PricingIcon },
      { type: 'Contact', name: 'Contact Form', component: Contact, icon: ContactIcon },
    ]
  }
];
