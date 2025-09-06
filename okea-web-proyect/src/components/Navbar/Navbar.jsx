import { useState, useRef } from 'react';
import Logo from './Logo';
import LocationButton from './LocationButton';
import LocationDropdown from './LocationDropdown';
import LocationOptionsDropdown from './LocationOptionsDropdown';
import ScreenDimmer from './ScreenDimmer';
import SearchBar from './SearchBar';
import UserLogin from './UserLogin';
import UserDropdown from './UserDropdown';
import ThemeToggle from './ThemeToggle';
import CartBadge from './CartBadge';
import CartBadgeDropdown from './CartBadgeDropdown';
import CategoriasDropdown from './CategoriasDropdown';

export default function Navbar() {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [showCategoriasDropdown, setShowCategoriasDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [userDropdownPosition, setUserDropdownPosition] = useState({ top: 0, left: 0 });
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cartDropdownPosition, setCartDropdownPosition] = useState({ top: 0, left: 0 });

  const userButtonRef = useRef(null);
  const cartButtonRef = useRef(null);

  const labels = ['Departamento', 'Provincia', 'Distrito'];
  const options = {
    Departamento: ['Amazonas', 'Áncash', 'Arequipa', 'Cajamarca', 'Callao', 'Cusco'],
    Provincia: ['Bagua', 'Chachapoyas', 'Huaraz', 'Santa'],
    Distrito: ['Callao', 'Bellavista', 'La Perla', 'La Punta'],
  };

  const toggleDropdown = () => {
    setShowLocationDropdown(prev => {
      const next = !prev;
      if (next) {
        setShowCategoriasDropdown(false);
        setShowUserDropdown(false);
      } else {
        setActiveDropdownIndex(null);
      }
      return next;
    });
  };

  const closeDropdown = () => {
    setShowLocationDropdown(false);
    setActiveDropdownIndex(null);
    setShowCategoriasDropdown(false);
    setShowUserDropdown(false);
    setShowCartDropdown(false);
  };
  const toggleCartDropdown = () => {
    setShowCartDropdown(prev => {
      const next = !prev;
      if (next) {
        setShowLocationDropdown(false);
        setShowCategoriasDropdown(false);
        setShowUserDropdown(false);
        setActiveDropdownIndex(null);
        if (cartButtonRef.current) {
          const rect = cartButtonRef.current.getBoundingClientRect();
          setCartDropdownPosition({
            top: rect.bottom + 22,
            left: rect.left - 320,
          });
        }
      }
      return next;
    });
  };

  const handleOpenDropdown = (index, rect) => {
    if (activeDropdownIndex === index) {
      setActiveDropdownIndex(null);
    } else {
      setActiveDropdownIndex(index);
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(prev => {
      const next = !prev;
      if (next && userButtonRef.current) {
        const rect = userButtonRef.current.getBoundingClientRect();
        setUserDropdownPosition({
          top: rect.bottom + 22, 
          left: rect.left - 40,  
        });
      }
      return next;
    });
  };

  return (
    <>
      <header
        className="absolute top-[4px] left-0 right-0 mx-auto max-w-[98vw] z-50 backdrop-blur-md border border-[#DAE2FF66] rounded-full px-6 py-3 flex items-center justify-between"
        style={{ backgroundColor: '#DAE2FF66' }}
        onClick={closeDropdown}
      >
        <Logo />
        <div onClick={(e) => e.stopPropagation()}>
          <LocationButton onClick={toggleDropdown} />
        </div>
        <SearchBar onToggleCategorias={() => {
          setShowCategoriasDropdown(prev => {
            const next = !prev;
            if (next) {
              setShowLocationDropdown(false);
              setActiveDropdownIndex(null);
              setShowUserDropdown(false);
            }
            return next;
          });
        }} />
        <div className="flex items-center gap-[10px] relative">
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleUserDropdown();
              setShowLocationDropdown(false);
              setShowCategoriasDropdown(false);
              setActiveDropdownIndex(null);
              setShowCartDropdown(false);
            }}
          >
            <UserLogin ref={userButtonRef} />
          </div>
          <ThemeToggle />
          <div
            ref={cartButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              toggleCartDropdown();
            }}
          >
            <CartBadge count={3} />
          </div>
        </div>
      </header>

      {showCartDropdown && (
        <>
          <ScreenDimmer onClick={closeDropdown} />
          <div
            className={`absolute z-[1100] transition-all duration-500 ease-out ${showCartDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            style={{
              top: cartDropdownPosition.top,
              left: cartDropdownPosition.left,
            }}
          >
            <CartBadgeDropdown />
          </div>
        </>
      )}

      {showUserDropdown && (
        <>
          <div
            className={`absolute z-[1100] transition-all duration-500 ease-out ${
              showUserDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{
              top: userDropdownPosition.top,
              left: userDropdownPosition.left,
            }}
          >
            <UserDropdown
              onSelect={() => setShowUserDropdown(false)}
              onLogout={() => setShowUserDropdown(false)}
            />
          </div>
          <ScreenDimmer onClick={closeDropdown} />
        </>
      )}

      {showLocationDropdown && (
        <>
          <div className="absolute left-1/2 top-[90px] transform -translate-x-1/2 z-50">
            <LocationDropdown
              onOpenDropdown={handleOpenDropdown}
              activeDropdownIndex={activeDropdownIndex}
            />
          </div>
          <ScreenDimmer onClick={closeDropdown} />
        </>
      )}

      {activeDropdownIndex !== null && (
        <LocationOptionsDropdown
          label={labels[activeDropdownIndex]}
          options={options[labels[activeDropdownIndex]]}
          position={dropdownPosition}
          onClose={() => setActiveDropdownIndex(null)}
        />
      )}

      {showCategoriasDropdown && (
        <>
          <CategoriasDropdown onClose={() => setShowCategoriasDropdown(false)} />
          <ScreenDimmer onClick={closeDropdown} />
        </>
      )}
    </>
  );
}