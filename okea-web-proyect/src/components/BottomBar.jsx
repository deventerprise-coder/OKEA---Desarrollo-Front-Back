import React, { useState, useEffect, useRef } from 'react';
import {HouseIconBottomBar, UserIconBottomBar, ChatBubbleIconBottomBar, TagIconBottomBar, HeartIconBottomBar} from '../assets/iconos/Icons';
import { useTheme } from './ThemeContext';

export default function BottomBar() {
  const { isLight } = useTheme();
  
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const horizontalMargin = 54; 

  useEffect(() => {
    const HIDE_THRESHOLD = 30; 

    const handleScroll = () => {
      const currentScrollY = document.body.scrollTop || document.documentElement.scrollTop;
      
      if (currentScrollY <= 64) {
        setIsVisible(true);
      } 
      
      else if (isVisible && currentScrollY > lastScrollY.current + HIDE_THRESHOLD) {
        setIsVisible(false);
      } 

      else if (!isVisible && currentScrollY < lastScrollY.current) { 
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };


    window.addEventListener('scroll', handleScroll, { capture: true });

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [isVisible]); 

  const bottomBarStyle = {
    position: 'fixed',
    bottom: 0, 
    left: horizontalMargin,
    right: horizontalMargin,
    width: `calc(100% - ${2 * horizontalMargin}px)`,
    height: 64,
    zIndex: 50,
    background: isLight 
      ? 'rgba(44, 80, 158, 0.44)'
      : 'rgba(7, 0, 71, 0.44)',
    backdropFilter: 'blur(12px)',
    transition: 'background 0.3s ease, transform 0.3s ease-out',
    transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 8px',
    borderRadius: 30, 
  };

  const getIconColor = () => {
    return isLight ? undefined : '#E3E1F1';
  };

  return (
    <div
      className="bottom-bar flex flex-row md:hidden items-center justify-around shadow-lg"
      style={bottomBarStyle}
    >
      <a href="#" aria-label="Facebook"><HouseIconBottomBar width={24} height={24} color={getIconColor()} /></a>
      <a href="#" aria-label="Instagram"><UserIconBottomBar width={24} height={24} color={getIconColor()} /></a>
      <a href="#" aria-label="YouTube"><ChatBubbleIconBottomBar width={24} height={24 } color={getIconColor()} /></a>
      <a href="#" aria-label="LinkedIn"><TagIconBottomBar width={24} height={24} color={getIconColor()} /></a>
      <a href="#" aria-label="TikTok"><HeartIconBottomBar width={24} height={24} color={getIconColor()} /></a>
    </div>
  );
}