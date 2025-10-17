import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
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
import MenuButton from './MenuButton';


const initialDropdownPosition = { top: 0, left: 0 };
const ANIMATION_DURATION = 300;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState(initialDropdownPosition);
  const [dynamicDropdownPosition, setDynamicDropdownPosition] = useState(initialDropdownPosition);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLocationOptionsVisible, setIsLocationOptionsVisible] = useState(false);
  const [activeLocationOptionIndex, setActiveLocationOptionIndex] = useState(null);
  const [theme, setTheme] = useState('light');
  const userButtonRef = useRef(null);
  const cartButtonRef = useRef(null);
  const locationButtonref = useRef(null);
  const location = useLocation();
  const previousLocationRef = useRef(location.pathname);
  const labels = ['Departamento', 'Provincia', 'Distrito'];
  const options = { Departamento: ['Amazonas', 'Áncash', 'Arequipa', 'Cajamarca', 'Callao', 'Cusco'], Provincia: ['Bagua', 'Chachapoyas', 'Huaraz', 'Santa'], Distrito: ['Callao', 'Bellavista', 'La Perla', 'La Punta'], };
  const isAnyDropdownOpen = activeDropdown !== null || isMenuOpen;

  const closeAllDropdowns = useCallback(() => {
    setIsDropdownVisible(false);
    setIsLocationOptionsVisible(false);
    setIsMenuOpen(false);
    setTimeout(() => {
      setActiveDropdown(null);
      setActiveLocationOptionIndex(null);
    }, ANIMATION_DURATION);
  }, []);

  useEffect(() => {
    if (previousLocationRef.current !== location.pathname) {
      closeAllDropdowns();
      previousLocationRef.current = location.pathname;
    }
  }, [location.pathname, closeAllDropdowns]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'light');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const handleToggleDropdown = (dropdownName) => {
    setIsMenuOpen(false); // Cierra el menú móvil al abrir otro dropdown
    const isAlreadyOpen = activeDropdown === dropdownName;
    if (isAlreadyOpen) {
      closeAllDropdowns();
      return;
    }
    const openNewDropdown = () => {
      let position = initialDropdownPosition;
      if (dropdownName === 'location' && locationButtonref.current) {
        const rect = locationButtonref.current.getBoundingClientRect();
        const dropdownWidth = 400;
        const buttonCenterX = rect.left + rect.width / 2;
        const dropdownLeft = buttonCenterX - dropdownWidth / 2;
        position = { top: rect.bottom + 38, left: Math.max(10, dropdownLeft) };
      } else if (dropdownName === 'user' && userButtonRef.current) {
        const rect = userButtonRef.current.getBoundingClientRect();
        position = { top: rect.bottom + 38, left: Math.max(10, rect.left - 40) };
      } else if (dropdownName === 'cart' && cartButtonRef.current) {
        const rect = cartButtonRef.current.getBoundingClientRect();
        const dropdownWidth = 352;
        const left = window.innerWidth - dropdownWidth - 10;
        position = { top: rect.bottom + 98, left: Math.max(10, Math.min(left, window.innerWidth - dropdownWidth - 10)), };
      }
      setDynamicDropdownPosition(position);
      setActiveDropdown(dropdownName);
      setIsDropdownVisible(true);
      setActiveLocationOptionIndex(null);
    };
    if (activeDropdown) {
      setIsDropdownVisible(false);
      setTimeout(openNewDropdown, ANIMATION_DURATION);
    } else {
      openNewDropdown();
    }
  };

  const handleOpenLocationOption = (index) => {
    if (activeLocationOptionIndex === index) {
      setIsLocationOptionsVisible(false);
      setTimeout(() => setActiveLocationOptionIndex(null), ANIMATION_DURATION);
    } else {
      if (locationButtonref.current) {
        const buttonRect = locationButtonref.current.getBoundingClientRect();
        const optionsWidth = 310;
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const dropdownLeft = buttonCenterX - 400 / 2;
        const inputOffsetY = 44 + (index * (48 + 16)) + 48 + 8;
        const optionsDropdownTop = (buttonRect.bottom + 60) + inputOffsetY;
        const inputCenterX = (dropdownLeft + 16) + 310 / 2;
        const optionsLeft = inputCenterX - optionsWidth / 2;
        setDropdownPosition({ top: optionsDropdownTop, left: Math.max(10, Math.min(optionsLeft, window.innerWidth - optionsWidth - 10)), });
        setActiveLocationOptionIndex(index);
        setIsLocationOptionsVisible(true);
      }
    }
  };

  const getThemeStyles = () => ({
    backgroundColor: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : '#DAE2FF66',
    borderColor: theme === 'dark' ? '#B1C5FFA8' : '#DAE2FF66',
    color: theme === 'dark' ? '#ffffff' : '#000000',
  });

  return (
    <>
      <header
        className="absolute top-[4px] left-0 right-0 mx-auto max-w-[98vw] z-50 backdrop-blur-md border rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 transition-colors duration-300"
        style={getThemeStyles()}
        onClick={() => {
            if (!isMenuOpen) {
                closeAllDropdowns();
            }
        }}
      >
        <div className="flex items-center justify-between w-full h-full gap-x-4 flex-wrap xl:flex-nowrap">
          
          {/* Columna Izquierda (Logo y LocationButton) */}
          <div className="flex items-center flex-shrink-0">
            <div className="mr-[clamp(1rem,4vw,70px)]">
              <Logo />
            </div>
            <div ref={locationButtonref} onClick={(e) => { e.stopPropagation(); handleToggleDropdown('location'); }} className="hidden lg:flex">
                <LocationButton />
            </div>
          </div>
          
          {/* Columna Central (SearchBar)*/}
          <div className="hidden lg:flex flex-1 min-w-0 w-full xl:w-auto order-3 xl:order-none mt-2 xl:mt-0">
            <SearchBar onToggleCategorias={() => handleToggleDropdown('categorias')} />
          </div>

          {/* Columna Derecha (Iconos) */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <div className="mr-[clamp(0.5rem,1.5vw,48px)]">
              <UserLogin
                ref={userButtonRef}
                onClick={(e) => { e.stopPropagation(); handleToggleDropdown('user'); }}
              />
            </div>
            <div className="mr-[clamp(0.5rem,1.5vw,8px)]">
              <ThemeToggle />
            </div>
            <div className="mr-[clamp(1rem,7vw,118px)]">
              <CartBadge
                count={3}
                ref={cartButtonRef}
                onClick={(e) => { e.stopPropagation(); handleToggleDropdown('cart'); }}
              />
            </div>
          </div>

          {/* Botón de menú para la vista móvil (debajo de 'lg') */}
          <div className="lg:hidden flex items-center">
            <CartBadge
                count={3}
                ref={cartButtonRef}
                onClick={(e) => { e.stopPropagation(); handleToggleDropdown('cart'); }}
              />
            <div className="ml-4">
              <MenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
          </div>
        </div>
        
        {/* Menú desplegable para móvil */}
        {isMenuOpen && (
          <div 
            className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-2 p-4 rounded-xl border"
            style={getThemeStyles()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-y-4">
              <SearchBar onToggleCategorias={() => handleToggleDropdown('categorias')} />
              <div ref={locationButtonref} onClick={(e) => { e.stopPropagation(); handleToggleDropdown('location'); }}>
                <LocationButton />
              </div>
              <div className="flex items-center justify-between pt-2 border-t" style={{borderColor: getThemeStyles().borderColor}}>
                <UserLogin
                  ref={userButtonRef}
                  onClick={(e) => { e.stopPropagation(); handleToggleDropdown('user'); }}
                />
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </header>
      
      {isAnyDropdownOpen && <ScreenDimmer onClick={closeAllDropdowns} />}

      {/* RENDERIZADO DE DROPDOWNS*/}
      <div className="fixed z-[1100]" style={{ top: dynamicDropdownPosition.top, left: dynamicDropdownPosition.left }}>
        {activeDropdown === 'cart' && <CartBadgeDropdown isVisible={isDropdownVisible} />}
        {activeDropdown === 'user' && <UserDropdown isVisible={isDropdownVisible} onSelect={closeAllDropdowns} onLogout={closeAllDropdowns} />}
        {activeDropdown === 'location' && (
          <LocationDropdown
            isVisible={isDropdownVisible}
            onOpenDropdown={handleOpenLocationOption}
            activeDropdownIndex={activeLocationOptionIndex}
          />
        )}
      </div>
      {activeDropdown === 'location' && activeLocationOptionIndex !== null && (
        <LocationOptionsDropdown 
          label={labels[activeLocationOptionIndex]} 
          options={options[labels[activeLocationOptionIndex]]} 
          position={dropdownPosition} 
          onClose={() => { setIsLocationOptionsVisible(false); setTimeout(() => setActiveLocationOptionIndex(null), ANIMATION_DURATION); }} 
          isVisible={isLocationOptionsVisible} 
        />
      )}
      {activeDropdown === 'categorias' && (
        <CategoriasDropdown 
          isOpen={isAnyDropdownOpen} 
          isVisible={isDropdownVisible} 
          onClose={() => handleToggleDropdown('categorias')} 
        />
      )}
    </>
  );
}