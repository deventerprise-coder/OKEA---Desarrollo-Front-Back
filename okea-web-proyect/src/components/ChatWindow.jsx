import React from 'react';
import {
  OkeaBotIcon, FlechaEnvioIcon, AspaChatIcon
} from "../assets/iconos/Icons";
import { useTheme } from "./ThemeContext";

export default function ChatWindow({ onClose }) {
  const { isLight } = useTheme();
  
  const suggestedQuestions = [
    "¿Cómo hago el seguimiento?",
    "¿Cómo actualizo mi dirección?",
    "¿Puedo cancelar mi compra?"
  ];

  const getThemeStyles = () => {
    if (isLight) {
      return {
        background: 'linear-gradient(135deg, #E5EBFF 0%, #EEF4EB 50%, #EBEEF8 100%)',
        headerBackground: 'rgba(255, 255, 255, 0.9)',
        containerBackground: '#fff',
        textColor: '#333',
        titleColor: '#2C509E',
        dividerColor: '#C4C6D3',
        inputBackground: '#fff',
        inputTextColor: '#333',
        suggestedTextColor: '#434651'
      };
    } else {
      return {
        background: '#16123C',
        headerBackground: '#292272',
        containerBackground: '#292272',
        textColor: '#E5E2E1',
        titleColor: '#C6C4E3',
        dividerColor: '#1F1A57',
        inputBackground: '#120F31',
        inputTextColor: '#C3C7CB',
        suggestedTextColor: '#E5E2E1'
      };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 100,
        right: 32,
        width: 360,
        height: 500,
        backgroundColor: '#fff',
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        zIndex: 100,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: themeStyles.background
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center',
            background: themeStyles.headerBackground,
            backdropFilter: 'blur(10px)',
            borderRadius: '32px',
            padding: '8px 16px'
          }}
        >
          <OkeaBotIcon color={themeStyles.titleColor} style={{ marginRight: 8 }} />
          <h3 style={{ margin: 0, color: themeStyles.titleColor, fontSize: '16px', fontWeight: '600' }}>
            Soporte OKEA
          </h3>
        </div>
        <button
          onClick={onClose}
          style={{
            background: themeStyles.headerBackground,
            backdropFilter: 'blur(10px)',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px'
          }}
        >
          <AspaChatIcon color={themeStyles.titleColor} size={18} />
        </button>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div 
          style={{ 
            height: '1px', 
            backgroundColor: themeStyles.dividerColor,
            width: '100%'
          }}
        />
      </div>

      <div style={{ flex: 1, padding: '16px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 'auto' }}>
          <div 
            style={{ 
              marginRight: 12, 
              marginTop: 4,
              background: themeStyles.containerBackground,
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}
          >
            <OkeaBotIcon color={themeStyles.titleColor} />
          </div>
          <div 
            style={{ 
              background: themeStyles.containerBackground, 
              padding: '12px 16px', 
              borderRadius: '16px 16px 16px 4px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              fontSize: '14px',
              color: themeStyles.textColor,
              maxWidth: '240px'
            }}
          >
            Hola 👋, ¿en qué puedo ayudarte hoy?
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              style={{
                background: themeStyles.containerBackground,
                border: 'none',
                borderRadius: '20px',
                padding: '12px 16px',
                marginBottom: '8px',
                fontSize: '14px',
                color: themeStyles.suggestedTextColor,
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.2s ease',
                display: 'inline-block',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = isLight ? '#f8f9fa' : '#3A3582';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = themeStyles.containerBackground;
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 20px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            style={{
              width: '100%',
              padding: '12px 50px 12px 16px',
              borderRadius: '24px',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              background: themeStyles.inputBackground,
              color: themeStyles.inputTextColor,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              boxSizing: 'border-box'
            }}
          />
          <button
          style={{
            position: 'absolute',
            right: 6,
            top: '50%',
            transform: 'translateY(-50%)',
            background: themeStyles.containerBackground,
            border: 'none',
            cursor: 'pointer',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          <FlechaEnvioIcon color={themeStyles.titleColor} size={20} />
        </button>
        </div>
      </div>
    </div>
  );
}