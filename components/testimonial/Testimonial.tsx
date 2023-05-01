// components/testimonial/Testimonial.tsx
import React from 'react';

type TestimonialProps = {
  imageUrl: string;
  name: string;
  testimonial: string;
};

const Testimonial = ({ imageUrl, name, testimonial }: TestimonialProps) => {
  return (
    <div className="bg-base-100 p-6 rounded-md shadow-md my-2">
      <div className="flex items-center mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
      <p className="text-base leading-relaxed">{testimonial}</p>
    </div>
  );
};

export default Testimonial;
