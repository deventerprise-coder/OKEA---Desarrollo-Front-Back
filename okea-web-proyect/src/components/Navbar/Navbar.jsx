import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../CartContext";

import Logo from "./Logo";
import LocationButton from "./LocationButton";
import LocationDropdown from "./LocationDropdown";
import LocationOptionsDropdown from "./LocationOptionsDropdown";
import ScreenDimmer from "./ScreenDimmer";
import SearchBar from "./SearchBar";
import UserLogin from "./UserLogin";
import UserDropdown from "./UserDropdown";
import ThemeToggle from "./ThemeToggle";
import CartBadge from "./CartBadge";
import CartBadgeDropdown from "./CartBadgeDropdown"; 
import CategoriasDropdown from "./CategoriasDropdown";
import MenuButton from "./MenuButton";
import SearchBarMobile from "./SearchBarMobile";
import MenuDropdownMobile from "./MenuDropdownMobile";



// ====================================================================
// Panel DE CONTROL DE NAVBAR
// ====================================================================

const NAVBAR_CONFIG = {
	visibility: {
		Logo: { mobile: false, standard: true, large: true, xLarge: true },
		LocationButton: {
			mobile: false,
			standard: false,
			large: true,
			xLarge: true,
		},
		SearchBar: { mobile: false, standard: true, large: true, xLarge: true },
		UserLogin: { mobile: false, standard: false, large: true, xLarge: true },
		ThemeToggle: { mobile: false, standard: false, large: true, xLarge: true },
		CartBadge: { mobile: true, standard: true, large: true, xLarge: true },
		MenuButton: { mobile: false, standard: false, large: false, xLarge: false },
		LogoMobile: { mobile: true, standard: false, large: false, xLarge: false },
		MenuButtonMobile: {
			mobile: true,
			standard: false,
			large: false,
			xLarge: false,
		},
		SearchBarMobile: {
			mobile: true,
			standard: false,
			large: false,
			xLarge: false,
		},
	},
	layout: {
		NavbarHeight: { mobile: 64, standard: 64, large: 64, xLarge: 64 },
		HeaderPadding: { 
			mobile: [0, 10, 0, 10], 
			standard: [0, 10, 0, 10],
			large: [0, 10, 0, 10],
			xLarge: [0, 160, 0, 160] 
		},
		GapX: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
		LogoGroupPosition: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
		SearchBarMaxWidth: { mobile: 300, standard: 450, large: 600, xLarge: 700 },
	},
	components: {
		Logo: {
			marginRight: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
			marginLeft: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
		},
		LocationButton: {
			marginRight: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
			marginLeft: { mobile: 0, standard: 0, large: 0, xLarge: 70 },
		},
		SearchBar: {
			marginRight: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
			marginLeft: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
		},
		UserLogin: {
			marginRight: { mobile: 0, standard: 0, large: 0, xLarge: 62 },
			marginLeft: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
		},
		ThemeToggle: {
			marginRight: { mobile: 0, standard: 0, large: 0, xLarge: 8 },
			marginLeft: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
		},
		CartBadge: {
			marginRight: { mobile: 0, standard: 0, large: 0, xLarge: 0},
			marginLeft: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
		},
		MenuButton: {
			marginLeft: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
			marginRight: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
		},
		LogoMobile: {
			marginRight: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
			marginLeft: { mobile: 8, standard: 0, large: 0, xLarge: 0 },
		},
		MenuButtonMobile: {
			marginLeft: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
			marginRight: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
		},
		SearchBarMobile: {
			marginLeft: { mobile: 0, standard: 0, large: 0, xLarge: 0 },
			marginRight: { mobile: 8, standard: 0, large: 0, xLarge: 0 },
		},
	},
	breakpoints: {
		standard: 640,
		large: 1024,
		xLarge: 1480,
	},
};
// ====================================================================
// FIN DEL Panel DE CONTROL DE NAVBAR
// ====================================================================

const initialDropdownPosition = { top: 0, left: 0 };
const ANIMATION_DURATION = 300;
const DEBUG_VISUALS = false;

const useBreakpoint = () => {
	const [breakpoint, setBreakpoint] = useState("mobile");

	const checkBreakpoint = useCallback(() => {
		const width = window.innerWidth;
		if (width >= NAVBAR_CONFIG.breakpoints.xLarge) {
			setBreakpoint("xLarge");
		} else if (width >= NAVBAR_CONFIG.breakpoints.large) {
			setBreakpoint("large");
		} else if (width >= NAVBAR_CONFIG.breakpoints.standard) {
			setBreakpoint("standard");
		} else {
			setBreakpoint("mobile");
		}
	}, []);

	useEffect(() => {
		checkBreakpoint();
		window.addEventListener("resize", checkBreakpoint);
		return () => window.removeEventListener("resize", checkBreakpoint);
	}, [checkBreakpoint]);

	return breakpoint;
};

const getVisibilityClass = (elementName, config = NAVBAR_CONFIG.visibility) => {
	const visibility = config[elementName];
	if (!visibility) return "hidden";

	const classes = [];

	const mobileDisplay =
		elementName === "MenuButtonMobile" ||
		elementName === "LogoMobile" ||
		elementName === "SearchBarMobile"
			? "block"
			: "flex";

	if (visibility.mobile) classes.push(mobileDisplay);
	else classes.push("hidden");
	if (visibility.standard) classes.push("sm:flex");
	else classes.push("sm:hidden");
	if (visibility.large) classes.push("lg:flex");
	else classes.push("lg:hidden");
	if (visibility.xLarge) classes.push("xl:flex");
	else classes.push("xl:hidden");

	return classes
		.join(" ")
		.replace(/hidden (sm|md|lg|xl):hidden/g, "hidden")
		.trim();
};

const getDebugStyles = (type) => {
	if (!DEBUG_VISUALS) return "";
	switch (type) {
		case "header":
			return "border-2 border-dashed border-red-500";
		case "row":
			return "border-2 border-dashed border-purple-500";
		case "element":
			return "border border-blue-500";
		default:
			return "";
	}
};

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState(null);
	const [dropdownPosition, setDropdownPosition] = useState(
		initialDropdownPosition
	);
	const [dynamicDropdownPosition, setDynamicDropdownPosition] = useState(
		initialDropdownPosition
	);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [isLocationOptionsVisible, setIsLocationOptionsVisible] =
		useState(false);
	const [activeLocationOptionIndex, setActiveLocationOptionIndex] =
		useState(null);
	const [theme, setTheme] = useState("light");
	const userButtonRef = useRef(null);
	const locationButtonref = useRef(null);
	const location = useLocation();
	const { totalItems } = useCart(); 

	const previousLocationRef = useRef(location.pathname);
	const labels = ["Departamento", "Provincia", "Distrito"];
	const options = {
		Departamento: [
			"Amazonas",
			"Áncash",
			"Arequipa",
			"Cajamarca",
			"Callao",
			"Cusco",
		],
		Provincia: ["Bagua", "Chachapoyas", "Huaraz", "Santa"],
		Distrito: ["Callao", "Bellavista", "La Perla", "La Punta"],
	};
	const isAnyDropdownOpen = activeDropdown !== null || isMenuOpen;

	const [isSearchMobileOpen, setIsSearchMobileOpen] = useState(false);
	const [isSearchMobileReady, setIsSearchMobileReady] = useState(false);
	const [isSearchBarMobileOpen, setIsSearchBarMobileOpen] = useState(false);

	const navbarRef = useRef(null);
	const cartBadgeRef = useRef(null);

	const [searchInputWidth, setSearchInputWidth] = useState(null);

	useEffect(() => {
		if (isSearchMobileReady && navbarRef.current && cartBadgeRef.current) {
			const navbarWidth = navbarRef.current.offsetWidth;
			const cartBadgeWidth = cartBadgeRef.current.offsetWidth;
			const gap = 32;
			setSearchInputWidth(navbarWidth - cartBadgeWidth - gap);
		}
	}, [isSearchMobileReady]);

	const currentBreakpoint = useBreakpoint();

	const getPxLayoutStyles = (key, defaultPx = 0) => {
		const value = NAVBAR_CONFIG.layout[key][currentBreakpoint] ?? defaultPx;

		if (key === "NavbarHeight") {
			return { height: `${value}px` };
		}

		if (key === "HeaderPadding") {
			const paddingArray = value;
			return {
				paddingTop: `${paddingArray[0]}px`,
				paddingRight: `${paddingArray[1]}px`,
				paddingBottom: `${paddingArray[2]}px`,
				paddingLeft: `${paddingArray[3]}px`,
			};
		}
		if (key.includes("Position")) {
			return { marginLeft: `${value}px` };
		}
		if (key === "GapX") {
			return { gap: `${value}px` };
		}
		if (key === "SearchBarMaxWidth") {
			return { maxWidth: `${value}px` };
		}
		return {};
	};

	const getComponentStyles = (componentName) => {
		const config = NAVBAR_CONFIG.components[componentName];
		if (!config) return {};

		const styles = {};

		if (config.marginRight) {
			styles.marginRight = `${config.marginRight[currentBreakpoint] ?? 0}px`;
		}
		if (config.marginLeft) {
			styles.marginLeft = `${config.marginLeft[currentBreakpoint] ?? 0}px`;
		}

		return styles;
	};

	const closeDynamicDropdowns = useCallback(() => {
		setIsDropdownVisible(false);
		setIsLocationOptionsVisible(false);
		setTimeout(() => {
			setActiveDropdown(null);
			setActiveLocationOptionIndex(null);
		}, ANIMATION_DURATION);
	}, []);

	useEffect(() => {
		if (previousLocationRef.current !== location.pathname) {
			setIsMenuOpen(false);
			closeDynamicDropdowns();
			previousLocationRef.current = location.pathname;
		}
	}, [location.pathname, closeDynamicDropdowns]);

	useEffect(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName === "data-theme") {
					setTheme(
						document.documentElement.getAttribute("data-theme") || "light"
					);
				}
			});
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});
		return () => observer.disconnect();
	}, []);

	const handleToggleDropdown = (dropdownName) => {
		setIsMenuOpen(false);
		const isAlreadyOpen = activeDropdown === dropdownName;
		if (isAlreadyOpen) {
			closeDynamicDropdowns();
			return;
		}
		const openNewDropdown = () => {
			let position = initialDropdownPosition;
			const isMobile = currentBreakpoint === "mobile"; 
			
			if (dropdownName === "location" && locationButtonref.current) {
				const rect = locationButtonref.current.getBoundingClientRect();
				const dropdownWidth = 400;
				const buttonCenterX = rect.left + rect.width / 2;
				let dropdownLeft = buttonCenterX - dropdownWidth / 2;
				if (window.innerWidth < 1024) {
					dropdownLeft = 10;
				}
				position = { top: rect.bottom + 38, left: Math.max(10, dropdownLeft) };
			} else if (dropdownName === "user" && userButtonRef.current) {
				const rect = userButtonRef.current.getBoundingClientRect();
				position = {
					top: rect.bottom + 38,
					left: Math.max(10, rect.left - 40),
				};
			} else if (dropdownName === "cart" && navbarRef.current) {
				const dropdownWidth = 352;
				
				if (isMobile) {
					position = { top: 0, left: 0 };
				} else {
					const navbarRect = navbarRef.current.getBoundingClientRect();
					const rightOffset = 10;
					
					const topPosition = navbarRect.bottom + 10; 
					const left = window.innerWidth - dropdownWidth - rightOffset;

					position = {
						top: topPosition,
						left: left,
					};
				}
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
					left: Math.max(
						10,
						Math.min(optionsLeft, window.innerWidth - optionsWidth - 10)
					),
				});
				setActiveLocationOptionIndex(index);
				setIsLocationOptionsVisible(true);
			}
		}
	};

	const getThemeStyles = () => ({
		backgroundColor: theme === "dark" ? "rgba(7, 0, 71, 0.4)" : "#DAE2FF66",
		borderColor: theme === "dark" ? "#B1C5FFA8" : "#DAE2FF66",
		color: theme === "dark" ? "#ffffff" : "#000000",
	});

	const handleToggleSearchMobile = (open) => {
		if (open) {
			closeDynamicDropdowns();
			setIsMenuOpen(false);
			setIsSearchBarMobileOpen(true);
			setTimeout(() => {
				setIsSearchMobileOpen(true);
				setIsSearchMobileReady(true);
			}, 100);
		} else {
			setIsSearchMobileReady(false);
			setTimeout(() => {
				setIsSearchMobileOpen(false);
				setIsSearchBarMobileOpen(false);
			}, 200);
		}
	};

	const handleToggleMenuMobile = (e) => {
		e.stopPropagation();

		if (activeDropdown) {
			closeDynamicDropdowns();
		}

		setIsMenuOpen((prev) => !prev);

		handleToggleSearchMobile(false);
	};

	const isMobileBreakpoint = currentBreakpoint === "mobile";
	const isMobileSearchActive = isMobileBreakpoint && isSearchMobileOpen;
	const isMobileSearchReady = isMobileBreakpoint && isSearchMobileReady;

	const getMobileHiddenStyles = (elementName) => {
		const isTarget =
			elementName === "LogoMobile" || elementName === "MenuButtonMobile";

		if (isMobileSearchActive && isTarget) {
			return {
				className:
					"hidden sm:hidden lg:hidden xl:hidden transition-opacity duration-300",
				style: { opacity: 0, pointerEvents: "none" },
			};
		}

		return {
			className:
				getVisibilityClass(elementName) + " transition-opacity duration-300",
			style: {
				...getComponentStyles(elementName),
				opacity: 1,
				pointerEvents: "auto",
			},
		};
	};

	return (
		<>
			<header
				ref={navbarRef}
				className={`absolute top-[4px] left-0 right-0 mx-auto 
					max-w-[98vw] z-50 backdrop-blur-md border rounded-full 
					transition-colors duration-300 ${getDebugStyles("header")}`}
				style={{
					...getThemeStyles(),
					...getPxLayoutStyles("HeaderPadding"),
					...getPxLayoutStyles("NavbarHeight"),
				}}
				onClick={closeDynamicDropdowns}
			>
				<div
					className={`flex items-center w-full h-full justify-between flex-nowrap min-w-0 ${getDebugStyles(
						"row"
					)}`}
					style={getPxLayoutStyles("GapX")}
				>
					<div
						className={`relative flex items-center sm:hidden flex-shrink-0 ${getDebugStyles(
							"element"
						)}`}
					>
						{!isMobileSearchActive && (
							<div
								className={
									getMobileHiddenStyles("MenuButtonMobile").className +
									` ${getDebugStyles("element")}`
								}
								style={{
									...getComponentStyles("MenuButtonMobile"),
									...getMobileHiddenStyles("MenuButtonMobile").style,
								}}
							>
								<MenuButton
									isOpen={isMenuOpen}
									onClick={handleToggleMenuMobile}
								/>
							</div>
						)}

						{!isMobileSearchActive && (
							<div
								className={
									getMobileHiddenStyles("LogoMobile").className +
									` ${getDebugStyles("element")}`
								}
								style={{
									...getComponentStyles("LogoMobile"),
									...getMobileHiddenStyles("LogoMobile").style,
								}}
							>
								<Logo />
							</div>
						)}
					</div>

					<div
						className={`hidden sm:flex items-center flex-shrink-0 ${getDebugStyles(
							"element"
						)}`}
						style={getPxLayoutStyles("LogoGroupPosition")}
					>
						<div
							className={`${getVisibilityClass("Logo")} ${getDebugStyles(
								"element"
							)}`}
							style={getComponentStyles("Logo")}
						>
							<Logo />
						</div>

						<div
							ref={locationButtonref}
							onClick={(e) => {
								e.stopPropagation();
								handleToggleDropdown("location");
							}}
							className={`${getVisibilityClass(
								"LocationButton"
							)} ${getDebugStyles("element")}`}
							style={getComponentStyles("LocationButton")}
						>
							<LocationButton />
						</div>
					</div>

					<div
						className={`
							${getVisibilityClass("SearchBar")} 
							flex-shrink-1 w-full 
							${getDebugStyles("element")}`}
						style={{
							...getPxLayoutStyles("SearchBarMaxWidth"),
							...getComponentStyles("SearchBar"),
						}}
					>
						<SearchBar
							onToggleCategorias={() => {
								if (currentBreakpoint === "standard") {
									closeDynamicDropdowns();
									setIsMenuOpen(true);
								} else {
									handleToggleDropdown("Categorias");
								}
							}}
						/>
					</div>

					<div
						className={`flex items-center flex-shrink-0 ${getDebugStyles(
							"element"
						)}`}
					>
						<div
							className={`${getVisibilityClass("UserLogin")} ${getDebugStyles(
								"element"
							)}`}
							style={getComponentStyles("UserLogin")}
						>
							<UserLogin
								ref={userButtonRef}
								onClick={(e) => {
									e.stopPropagation();
									handleToggleDropdown("user");
								}}
							/>
						</div>

						<div
							className={`${getVisibilityClass("ThemeToggle")} ${getDebugStyles(
								"element"
							)}`}
							style={getComponentStyles("ThemeToggle")}
						>
							<ThemeToggle />
						</div>

						<div
							className={`
								${getVisibilityClass("SearchBarMobile")} 
								${getDebugStyles("element")} 
								${
									isMobileSearchActive
										? "w-full order-1"
										: "w-auto order-1"
								} 
							`}
							style={getComponentStyles("SearchBarMobile")}
						>
							<SearchBarMobile
								isOpen={isSearchBarMobileOpen}
								onToggleOpen={handleToggleSearchMobile}
								showInput={isMobileSearchReady}
								inputWidth={searchInputWidth}
							/>
						</div>

						<div
  ref={cartBadgeRef}
  className={`
    ${getMobileHiddenStyles("CartBadge").className} 
    ${getDebugStyles("element")}
    ${isMobileBreakpoint ? "order-2" : ""} 
  `}
  style={{
    ...getComponentStyles("CartBadge"),
  }}
>
  <CartBadge
    count={totalItems} // ✅ contador real del carrito
    onClick={(e) => {
      e.stopPropagation();
      handleToggleDropdown("cart");
    }}
  />
</div>

						<div
							className={`${getVisibilityClass("MenuButton")} ${getDebugStyles(
								"element"
							)}`}
							style={getComponentStyles("MenuButton")}
						>
							<MenuButton
								isOpen={isMenuOpen}
								onClick={handleToggleMenuMobile}
							/>
						</div>
					</div>
				</div>
			</header>

			{isMenuOpen && (isMobileBreakpoint || currentBreakpoint === "standard" || currentBreakpoint === "large") && (
				<MenuDropdownMobile
					isOpen={isMenuOpen}
					onClose={() => setIsMenuOpen(false)}
					navbarHeight={
						NAVBAR_CONFIG.layout.NavbarHeight[currentBreakpoint] ??
						NAVBAR_CONFIG.layout.NavbarHeight.mobile
					}
				/>
			)}

			{isAnyDropdownOpen && (
				<ScreenDimmer
					onClick={activeDropdown ? closeDynamicDropdowns : () => {}}
				/>
			)}

			{activeDropdown === "cart" && isMobileBreakpoint && (
				<CartBadgeDropdown 
					isVisible={isDropdownVisible} 
					isMobile={isMobileBreakpoint}
				/>
			)}

			<div
				className="fixed z-[1100]"
				style={{
					top: dynamicDropdownPosition.top,
					left: dynamicDropdownPosition.left,
					display: activeDropdown === "cart" && isMobileBreakpoint ? 'none' : 'block'
				}}
			>
				{activeDropdown === "cart" && !isMobileBreakpoint && (
					<CartBadgeDropdown 
						isVisible={isDropdownVisible} 
						isMobile={isMobileBreakpoint} 
					/>
				)}
				
				{activeDropdown === "user" && (
					<UserDropdown
						isVisible={isDropdownVisible}
						onSelect={closeDynamicDropdowns}
						onLogout={closeDynamicDropdowns}
					/>
				)}
				{activeDropdown === "location" && (
					<LocationDropdown
						isVisible={isDropdownVisible}
						onOpenDropdown={handleOpenLocationOption}
						activeDropdownIndex={activeLocationOptionIndex}
					/>
				)}
			</div>
			
			{activeDropdown === "location" && activeLocationOptionIndex !== null && (
				<LocationOptionsDropdown
					label={labels[activeLocationOptionIndex]}
					options={options[labels[activeLocationOptionIndex]]}
					position={dropdownPosition}
					onClose={() => {
						setIsLocationOptionsVisible(false);
						setTimeout(
							() => setActiveLocationOptionIndex(null),
							ANIMATION_DURATION
						);
					}}
					isVisible={isLocationOptionsVisible}
				/>
			)}
			{activeDropdown === "Categorias" && (
				<CategoriasDropdown
					isOpen={isAnyDropdownOpen}
					isVisible={isDropdownVisible}
					onClose={() => handleToggleDropdown("Categorias")}
				/>
			)}
		</>
	);
}