import React from 'react';
import { v4 } from 'uuid';

type Testimony = {
  quote: string;
  author: string;
};

type Props = {
  testimonials: Testimony[];
};

const Testimonials = ({ testimonials }: Props) => (
  <div>
    {testimonials.map(testimonial => (
      <article key={v4()} className="message">
        <div className="message-body">
          {testimonial.quote}
          <br />
          <cite> – {testimonial.author}</cite>
        </div>
      </article>
    ))}
  </div>
);

export default Testimonials;
