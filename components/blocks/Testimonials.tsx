import React from 'react';

export interface TestimonialsProps {
  title: string;
  testimonials: { quote: string; author: string; role: string }[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ title, testimonials }) => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">{title}</h2>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.author} className="p-6 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-700">"{testimonial.quote}"</p>
              <footer className="mt-4">
                <p className="text-base font-medium text-gray-900">{testimonial.author}</p>
                <p className="text-base text-gray-500">{testimonial.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
