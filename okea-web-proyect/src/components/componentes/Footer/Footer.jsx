import React from 'react';
import FooterPequeño from '../Footer/FooterPequeño';
import FooterGrande from '../Footer/FooterGrande';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center bg-transparent mt-12 overflow-visible">
      <div className="w-full flex flex-col items-center">
        <FooterPequeño />
        <FooterGrande />
      </div>
    </footer>
  );
}