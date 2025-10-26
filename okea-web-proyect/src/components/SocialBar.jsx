import React from 'react';
import { FacebookIcon, InstagramIcon, YouTubeIcon, LinkedInIcon, TikTokIcon } from '../assets/iconos/Icons';
import { useTheme } from './ThemeContext';

export default function SocialBar() {
  const { isLight } = useTheme();

  const getSocialBarStyle = () => {
    return {
      width: 56,
      height: 264,
      position: 'fixed',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',
      zIndex: 50,
      borderRadius: 37,
      background: isLight 
        ? 'rgba(218, 226, 255, 0.6)' 
        : '#07004766',
      backdropFilter: 'blur(12px)',
      gap: 8,
      paddingTop: 16,
      paddingRight: 4,
      paddingBottom: 16,
      paddingLeft: 4,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.3s ease',
    };
  };

  const getIconColor = () => {
    return isLight ? undefined : '#E3E1F1';
  };

  return (
    <div
      className="hidden md:flex flex-col items-center justify-center shadow-lg"
      style={getSocialBarStyle()}
    >
      <a href="#" aria-label="Facebook" style={{ marginBottom: 20 }}>
        <FacebookIcon width={18} height={18} color={getIconColor()} />
      </a>
      <a href="#" aria-label="Instagram" style={{ marginBottom: 20 }}>
        <InstagramIcon width={18} height={18} color={getIconColor()} />
      </a>
      <a href="#" aria-label="YouTube" style={{ marginBottom: 20 }}>
        <YouTubeIcon width={18} height={18 } color={getIconColor()} />
      </a>
      <a href="#" aria-label="LinkedIn" style={{ marginBottom: 20 }}>
        <LinkedInIcon width={18} height={18} color={getIconColor()} />
      </a>
      <a href="#" aria-label="TikTok">
        <TikTokIcon width={18} height={18} color={getIconColor()} />
      </a>
    </div>
  );
}