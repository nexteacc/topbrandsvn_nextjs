import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[#222222] dark:border-gray-700 py-6 mt-auto">
    
      <div className="container mx-auto px-6">
        <p className="text-[11px] text-center text-[#555] dark:text-gray-400">
          © {new Date().getFullYear()} TopBrandsVN
        </p>
      </div>
    </footer>
  );
}