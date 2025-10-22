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

const DEBUG_VISUALS = false;

const getDebugStyles = (type) => {
    if (!DEBUG_VISUALS) return '';
    switch (type) {
        case 'header':
            return 'border-2 border-dashed border-red-500';
        case 'row':
            return 'border-2 border-dashed border-purple-500';
        case 'element':
            return 'border border-blue-500';
        case 'mobile-menu':
            return 'border-2 border-dashed border-green-500';
        default:
            return '';
    }
};

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
    const options = {
        Departamento: ['Amazonas', 'Áncash', 'Arequipa', 'Cajamarca', 'Callao', 'Cusco'],
        Provincia: ['Bagua', 'Chachapoyas', 'Huaraz', 'Santa'],
        Distrito: ['Callao', 'Bellavista', 'La Perla', 'La Punta'],
    };
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
        setIsMenuOpen(false);
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
                let dropdownLeft = buttonCenterX - dropdownWidth / 2;
                if (window.innerWidth < 1024) {
                    dropdownLeft = 10;
                }
                position = { top: rect.bottom + 38, left: Math.max(10, dropdownLeft) };
            } else if (dropdownName === 'user' && userButtonRef.current) {
                const rect = userButtonRef.current.getBoundingClientRect();
                position = { top: rect.bottom + 38, left: Math.max(10, rect.left - 40) };
            } else if (dropdownName === 'cart' && cartButtonRef.current) {
                const rect = cartButtonRef.current.getBoundingClientRect();
                const dropdownWidth = 352;
                const left = window.innerWidth - dropdownWidth - 10;
                position = {
                    top: rect.bottom + 10,
                    left: Math.max(10, left),
                };
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
                const inputOffsetY = 44 + index * (48 + 16) + 48 + 8;
                const optionsDropdownTop = buttonRect.bottom + 60 + inputOffsetY;
                const inputCenterX = dropdownLeft + 16 + 310 / 2;
                const optionsLeft = inputCenterX - optionsWidth / 2;
                setDropdownPosition({
                    top: optionsDropdownTop,
                    left: Math.max(10, Math.min(optionsLeft, window.innerWidth - optionsWidth - 10)),
                });
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
                className={`absolute top-[4px] left-0 right-0 mx-auto 
          max-w-[98vw] z-50 backdrop-blur-md border rounded-full 
          px-[clamp(0.4rem,1.5vw,1.75rem)] py-2 sm:py-3 
          transition-colors duration-300 ${getDebugStyles('header')}`}
                style={getThemeStyles()}
                onClick={() => {
                    if (!isMenuOpen) closeAllDropdowns();
                }}
            >
                <div className={`flex items-center justify-between w-full h-full gap-x-[clamp(0.25rem,1vw,1rem)] flex-wrap lg:flex-nowrap ${getDebugStyles('row')}`}>

                    <div
                        className={`flex items-center flex-shrink-0 
                          lg:ml-12 
                          xl:ml-24 
                          2xl:ml-44 
                          ${getDebugStyles('element')}`}
                    >
                        <div className={`mr-[clamp(0.5rem,2vw,3rem)] ${getDebugStyles('element')}`}>
                            <Logo />
                        </div>
                        <div
                            ref={locationButtonref}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleToggleDropdown('location');
                            }}
                            className={`hidden lg:flex ${getDebugStyles('element')}`}
                        >
                            <LocationButton />
                        </div>
                    </div>

                    <div className={`hidden lg:flex flex-shrink min-w-[300px] max-w-[679px] w-full lg:w-auto mt-2 lg:mt-0 ${getDebugStyles('element')}`}>
                        <SearchBar onToggleCategorias={() => handleToggleDropdown('categorias')} />
                    </div>

                    <div className={`hidden lg:flex items-center flex-shrink-0 min-w-[170px] ${getDebugStyles('element')}`}>
                        <div className={`mr-1 sm:mr-2 md:mr-4 lg:mr-2 xl:mr-12 2xl:mr-20 ${getDebugStyles('element')}`}>
                            <UserLogin ref={userButtonRef} onClick={(e) => { e.stopPropagation(); handleToggleDropdown('user'); }} />
                        </div>
                        <div className={`mr-[clamp(0.5rem,1vw,1.5rem)] ${getDebugStyles('element')}`}>
                            <ThemeToggle />
                        </div>
                        <div className={`mr-[clamp(0.75rem,3vw,4rem)] ${getDebugStyles('element')}`}>
                            <CartBadge count={3} ref={cartButtonRef} onClick={(e) => { e.stopPropagation(); handleToggleDropdown('cart'); }} />
                        </div>
                    </div>

                    <div className={`lg:hidden flex items-center ${getDebugStyles('element')}`}>
                        <CartBadge count={3} ref={cartButtonRef} onClick={(e) => { e.stopPropagation(); handleToggleDropdown('cart'); }} />
                        <div className={`ml-4 ${getDebugStyles('element')}`}>
                            <MenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                        </div>
                    </div>
                </div>


                {isMenuOpen && (
                    <div
                        className={`lg:hidden absolute top-full left-0 right-0 mt-2 mx-2 p-4 rounded-xl border ${getDebugStyles('mobile-menu')}`}
                        style={getThemeStyles()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col gap-y-4">
                            <div ref={locationButtonref} onClick={(e) => { e.stopPropagation(); handleToggleDropdown('location'); }} className={getDebugStyles('element')}>
                                <LocationButton />
                            </div>
                            <div className={`flex items-center justify-between pt-2 border-t ${getDebugStyles('element')}`} style={{ borderColor: getThemeStyles().borderColor }}>
                                <div className={getDebugStyles('element')}>
                                    <UserLogin ref={userButtonRef} onClick={(e) => { e.stopPropagation(); handleToggleDropdown('user'); }} />
                                </div>
                                <div className={getDebugStyles('element')}>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {isAnyDropdownOpen && <ScreenDimmer onClick={closeAllDropdowns} />}

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
                    onClose={() => {
                        setIsLocationOptionsVisible(false);
                        setTimeout(() => setActiveLocationOptionIndex(null), ANIMATION_DURATION);
                    }}
                    isVisible={isLocationOptionsVisible}
                />
            )}
            {activeDropdown === 'categorias' && (
                <CategoriasDropdown isOpen={isAnyDropdownOpen} isVisible={isDropdownVisible} onClose={() => handleToggleDropdown('categorias')} />
            )}
        </>
    );
}