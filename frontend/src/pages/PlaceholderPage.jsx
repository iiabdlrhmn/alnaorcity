import React from 'react';
import { Link } from 'react-router-dom';

export default function PlaceholderPage({ title }) {
  return (
    <main className="w-full min-h-[580px] pt-28 flex flex-col items-center justify-center bg-gradient-to-b from-[#163d0b] to-[#22660F] text-white px-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-semibold mb-4 tracking-wide">
        {title}
      </h1>
      <p className="text-white/80 text-lg max-w-md mb-8 font-light">
        This section will be designed next. Stay tuned!
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 rounded bg-[#4A2368] hover:bg-[#5d2c82] text-white transition-colors duration-300 shadow-lg"
      >
        ← Back to Home
      </Link>
    </main>
  );
}

