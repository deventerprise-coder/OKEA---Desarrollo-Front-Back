import { useState, useRef, useEffect } from 'react';
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
  const [isCategoriasVisible, setIsCategoriasVisible] = useState(true);
  const [isLocationVisible, setIsLocationVisible] = useState(true);
  const [isUserVisible, setIsUserVisible] = useState(true);
  const [isCartVisible, setIsCartVisible] = useState(true);
  const [theme, setTheme] = useState('light');

  const userButtonRef = useRef(null);
  const cartButtonRef = useRef(null);

  const labels = ['Departamento', 'Provincia', 'Distrito'];
  const options = {
    Departamento: ['Amazonas', 'Áncash', 'Arequipa', 'Cajamarca', 'Callao', 'Cusco'],
    Provincia: ['Bagua', 'Chachapoyas', 'Huaraz', 'Santa'],
    Distrito: ['Callao', 'Bellavista', 'La Perla', 'La Punta'],
  };

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
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  const toggleDropdown = () => {
    if (showLocationDropdown) {
      setIsLocationVisible(false);
      setTimeout(() => {
        setShowLocationDropdown(false);
      }, 300);
    } else {
      setIsLocationVisible(true);
      setShowLocationDropdown(true);
    }
  };

  const closeDropdown = () => {
    setShowLocationDropdown(false);
    setActiveDropdownIndex(null);
    setShowCategoriasDropdown(false);
    setShowUserDropdown(false);
    setShowCartDropdown(false);
  };
  const toggleCartDropdown = () => {
    if (showCartDropdown) {
      setIsCartVisible(false);
      setTimeout(() => {
        setShowCartDropdown(false);
      }, 300);
    } else {
      setIsCartVisible(true);
      setShowCartDropdown(true);
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
    if (showUserDropdown) {
      setIsUserVisible(false);
      setTimeout(() => {
        setShowUserDropdown(false);
      }, 300);
    } else {
      setIsUserVisible(true);
      setShowUserDropdown(true);
      setShowLocationDropdown(false);
      setShowCategoriasDropdown(false);
      setActiveDropdownIndex(null);
      setShowCartDropdown(false);
      
      if (userButtonRef.current) {
        const rect = userButtonRef.current.getBoundingClientRect();
        setUserDropdownPosition({
          top: rect.bottom + 22,
          left: rect.left - 40,
        });
      }
    }
  };

  const handleToggleCategorias = () => {
    if (showCategoriasDropdown) {
      setIsCategoriasVisible(false);
      setTimeout(() => {
        setShowCategoriasDropdown(false);
      }, 300);
    } else {
      setIsCategoriasVisible(true);
      setShowCategoriasDropdown(true);
      // Cerrar otros dropdowns
      setShowLocationDropdown(false);
      setActiveDropdownIndex(null);
      setShowUserDropdown(false);
    }
  };

  const getThemeStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : '#DAE2FF66',
      borderColor: theme === 'dark' ? '#B1C5FFA8' : '#DAE2FF66',
      color: theme === 'dark' ? '#ffffff' : '#000000'
    };
  };

  return (
    <>
      <header
        className="absolute top-[4px] left-0 right-0 mx-auto max-w-[98vw] z-50 backdrop-blur-md border rounded-full px-6 py-3 flex items-center justify-between transition-colors duration-300"
        style={getThemeStyles()}
        onClick={closeDropdown}
      >
        <Logo />
        <div onClick={(e) => e.stopPropagation()}>
          <LocationButton onClick={toggleDropdown} />
        </div>
        <SearchBar onToggleCategorias={handleToggleCategorias} />
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
            className="absolute z-[1100]"
            style={{
              top: cartDropdownPosition.top,
              left: cartDropdownPosition.left,
            }}
          >
            <CartBadgeDropdown isVisible={isCartVisible} />
          </div>
        </>
      )}

      {showUserDropdown && (
        <>
          <div
            className="absolute z-[1100]"
            style={{
              top: userDropdownPosition.top,
              left: userDropdownPosition.left,
            }}
          >
            <UserDropdown
              onSelect={() => toggleUserDropdown()}
              onLogout={() => toggleUserDropdown()}
              isVisible={isUserVisible}
            />
          </div>
          <ScreenDimmer onClick={closeDropdown} />
        </>
      )}

      {showLocationDropdown && (
        <>
          <div className="absolute left-1/2 top-[65px] transform -translate-x-1/2 z-50">
            <LocationDropdown
              onOpenDropdown={handleOpenDropdown}
              activeDropdownIndex={activeDropdownIndex}
              isVisible={isLocationVisible}
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
          <CategoriasDropdown 
            isOpen={showCategoriasDropdown}
            isVisible={isCategoriasVisible}
            onClose={() => handleToggleCategorias()} 
          />
          <ScreenDimmer onClick={closeDropdown} />
        </>
      )}
    </>
  );
}