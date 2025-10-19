
import React from 'react';
import { BlockComponentProps } from '../../types';

const testimonials = [
  {
    quote: "This is the best website builder I've ever used. It's intuitive, powerful, and the AI features are a game-changer. I launched my site in a single afternoon!",
    author: 'Sarah Johnson',
    title: 'Founder of TechNova',
    avatar: 'https://picsum.photos/id/237/100/100',
  },
  {
    quote: "I'm not a technical person, but this builder made me feel like a pro designer. The pre-made blocks are beautiful and saved me countless hours.",
    author: 'Michael Chen',
    title: 'Small Business Owner',
    avatar: 'https://picsum.photos/id/238/100/100',
  },
   {
    quote: "The mobile responsiveness is flawless out of the box. My site looks amazing on my phone, tablet, and desktop without any extra effort.",
    author: 'Emily Rodriguez',
    title: 'Freelance Photographer',
    avatar: 'https://picsum.photos/id/239/100/100',
  },
];

const Testimonials: React.FC<BlockComponentProps> = () => {
  return (
    <section className="bg-white py-12 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by creators worldwide
          </p>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="bg-gray-50 rounded-lg shadow-lg p-8">
              <blockquote className="flex flex-col h-full">
                <div className="flex-grow">
                  <p className="text-lg text-gray-700">"{testimonial.quote}"</p>
                </div>
                <footer className="mt-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-12 w-12 rounded-full" src={testimonial.avatar} alt={testimonial.author} />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-gray-900">{testimonial.author}</div>
                      <div className="text-base text-gray-500">{testimonial.title}</div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
