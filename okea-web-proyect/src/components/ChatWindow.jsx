import React from 'react';

export default function ChatWindow({ onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 100,
        right: 32,
        width: 360,
        height: 500,
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        zIndex: 100,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          background: '#f8f9fa',
          borderBottom: '1px solid #e9ecef',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h3 style={{ margin: 0, color: '#2C509E' }}>Soporte OKEA</h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4
          }}
        >
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <path d="M9 9L19 19M19 9L9 19" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Chat content */}
      <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ marginRight: 8 }}>🤖</div>
          <div style={{ background: '#f8f9fa', padding: '8px 12px', borderRadius: 12 }}>
            Hola 👋, ¿en qué puedo ayudarte hoy?
          </div>
        </div>
      </div>

      {/* Input area */}
      <div style={{ padding: 16, borderTop: '1px solid #e9ecef' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            style={{
              width: '100%',
              padding: '12px 40px 12px 16px',
              borderRadius: 24,
              border: '1px solid #e9ecef',
              outline: 'none'
            }}
          />
          <button
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#2C509E">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}