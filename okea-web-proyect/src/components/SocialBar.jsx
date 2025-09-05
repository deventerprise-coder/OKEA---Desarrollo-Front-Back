import React from 'react';
import { FacebookIcon, InstagramIcon, YouTubeIcon, LinkedInIcon, TikTokIcon } from '../assets/iconos/Icons';

export default function SocialBar() {
  return (
    <div
      className="flex flex-col items-center justify-center shadow-lg"
      style={{
        width: 56,
        height: 264,
        position: 'fixed',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        zIndex: 50,
        borderRadius: 37,
        background: 'rgba(218, 226, 255, 0.6)',
        backdropFilter: 'blur(12px)',
        gap: 8,
        paddingTop: 16,
        paddingRight: 4,
        paddingBottom: 16,
        paddingLeft: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <a href="#" aria-label="Facebook" style={{ marginBottom: 20 }}>
        <FacebookIcon width={28} height={28} />
      </a>
      <a href="#" aria-label="Instagram" style={{ marginBottom: 20 }}>
        <InstagramIcon width={28} height={28} />
      </a>
      <a href="#" aria-label="YouTube" style={{ marginBottom: 20 }}>
        <YouTubeIcon width={28} height={28} />
      </a>
      <a href="#" aria-label="LinkedIn" style={{ marginBottom: 20 }}>
        <LinkedInIcon width={28} height={28} />
      </a>
      <a href="#" aria-label="TikTok">
        <TikTokIcon width={28} height={28} />
      </a>
    </div>
  );
}