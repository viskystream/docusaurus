import React from 'react';

interface CTAProps {
  children?: React.ReactNode
  title?: string
  description?: string
}
function CTA({ children, title = '', description = '' }: CTAProps) {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
        <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
          <div className="lg:self-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-6 text-primary-200">{description}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CTA;
