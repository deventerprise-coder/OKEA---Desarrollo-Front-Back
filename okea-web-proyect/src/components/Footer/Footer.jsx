import React, { useState, useEffect } from 'react';
import FooterPequeño from '../Footer/FooterPequeño';
import FooterGrande from '../Footer/FooterGrande';

export default function Footer() {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const getFooterStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? '#120F31' : 'transparent',
      transition: 'background-color 0.3s ease',
    };
  };

  return (
    <footer
      className="w-full flex flex-col items-center mt-0 overflow-visible px-4"
      style={getFooterStyles()}
    >
      <div className="w-full flex flex-col items-center">
        <FooterPequeño />
        <FooterGrande />
      </div>
    </footer>
  );
}