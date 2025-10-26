import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudifonosJBL from '../../assets/imagenes/AudifonosJBL.png';
import AguaCieloGas from '../../assets/imagenes/AguaCieloGas.png';
import MuebleCenizasBlanco from '../../assets/imagenes/MuebleCenizasBlanco.png';

function StarIcon({ color = '#DFE162' }) {
	return (
		<svg width="16" height="16" viewBox="0 0 20 20" fill={color} xmlns="http://www.w3.org/2000/svg">
			<path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
		</svg>
	);
}

const exampleProducts = [
	{
		id: 1,
		name: 'Audífonos JBL',
		price: 80.0,
		rating: 4.9,
		image: AudifonosJBL,
		quantity: 1,
	},
	{
		id: 2,
		name: 'Agua Cielo',
		price: 4.0,
		rating: 4.9,
		image: AguaCieloGas,
		quantity: 1,
	},
	{
		id: 3,
		name: 'Mueble Cenizas',
		price: 140.0,
		rating: 4.9,
		image: MuebleCenizasBlanco,
		quantity: 1,
	},
];

const animations = `
	@keyframes slideInUp {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}

	@keyframes slideOutDown {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(100%);
		}
	}
	
	@keyframes cartFadeIn {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes cartFadeOut {
		from {
			opacity: 1;
			transform: translateY(0);
		}
		to {
			opacity: 0;
			transform: translateY(-20px);
		}
	}

	.cart-enter-desktop {
		animation: cartFadeIn 0.3s ease-out forwards;
	}

	.cart-exit-desktop {
		animation: cartFadeOut 0.3s ease-out forwards;
	}

	.cart-enter-mobile {
		animation: slideInUp 0.3s ease-out forwards;
	}

	.cart-exit-mobile {
		animation: slideOutDown 0.3s ease-out forwards;
	}
`;

export default function CartBadgeDropdown({ products = exampleProducts, subtotal = 240, isVisible, isMobile }) {
	const [cartItems, setCartItems] = useState(products);
	const [theme] = useState(() => {
		return document.documentElement.getAttribute('data-theme') || 'light';
	});
	const dropdownRef = useRef(null);
	const navigate = useNavigate();

	const handleQuantityChange = (id, delta) => {
		setCartItems(items =>
			items.map(item =>
				item.id === id
					? { ...item, quantity: Math.max(1, item.quantity + delta) }
					: item
			)
		);
	};

	const getThemeStyles = () => {
		return {
			backgroundColor: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : 'rgba(44, 80, 158, 0.5)',
		};
	};

	const getContainerStyles = () => {
		return {
			backgroundColor: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : 'rgba(44, 80, 158, 0.1)',
		};
	};

	const positioningStyles = isMobile 
		? { 
			width: '100vw',
			maxHeight: '80vh',
			bottom: 0,
			left: 0,
			right: 0,
			position: 'fixed', 
			borderRadius: '32px 32px 0 0', 
			zIndex: 1150 
		}
		: { 
			width: '352px',
			height: 'auto',
			maxHeight: '80vh',
			position: 'absolute', 
			borderRadius: '32px',
		};

	const animationClass = isMobile 
		? (isVisible ? 'cart-enter-mobile' : 'cart-exit-mobile') 
		: (isVisible ? 'cart-enter-desktop' : 'cart-exit-desktop');

	return (
		<div
			ref={dropdownRef}
			className={`shadow-lg border flex flex-col ${animationClass}`}
			style={{
				...getThemeStyles(),
				backdropFilter: 'blur(12px)',
				WebkitBackdropFilter: 'blur(12px)',
				border: '1.5px solid rgba(255,255,255,0.15)',
				padding: '16px',
				gap: '20px',
				overflowY: 'auto',
				boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
				...positioningStyles,
			}}
		>
			<style>{animations}</style>
			
			<div
				className="flex items-center justify-between rounded-2xl px-4 py-3 mb-2 backdrop-blur-md"
				style={{
					...getContainerStyles(),
					borderRadius: '20px',
					minHeight: 60,
				}}
			>
				<div className="flex flex-col">
					<span className="text-white font-poppins text-[15px] font-light">Subtotal</span>
					<span 
						className="font-poppins text-[22px] font-light leading-6"
						style={{ color: theme === 'dark' ? 'rgba(245, 246, 146, 1)' : '#DFE162' }}
					>
						s/ {subtotal.toFixed(2)}
					</span>
				</div>
				<button
					className="ml-2 px-4 sm:px-6 py-2 rounded-full font-poppins text-[14px] sm:text-[15px] font-medium transition hover:brightness-95"
					style={{ 
						minWidth: 100,
						backgroundColor: theme === 'dark' ? 'rgba(245, 246, 146, 1)' : '#DFE162',
						color: theme === 'dark' ? 'rgba(50, 50, 0, 1)' : '#484900'
					}}
					onClick={() => navigate('/carrito')}
				>
					Ir al carrito
				</button>
			</div>

			<div className="flex flex-col gap-3 overflow-y-auto flex-1" style={{ maxHeight: 420 }}>
				{cartItems.map((item) => (
					<div
						key={item.id}
						className="flex flex-row items-center justify-between rounded-2xl px-3 sm:px-4 py-3 backdrop-blur-md"
						style={{
							...getContainerStyles(),
							backdropFilter: 'blur(12px)',
							WebkitBackdropFilter: 'blur(12px)',
							minHeight: 110,
							borderRadius: 20,
						}}
					>
						<div className="flex flex-col flex-1 min-w-0 pr-2" style={{ maxWidth: 160 }}>
							<span className="text-white font-poppins text-[14px] sm:text-[15px] font-light truncate" title={item.name}>{item.name}</span>
							<span className="text-[#FFFFFF] font-poppins text-[16px] sm:text-[17px] font-light leading-6">s/ {(item.price * item.quantity).toFixed(2)}</span>
							<div className="flex items-center gap-1 mt-1">
								<StarIcon />
								<span className="text-[#FFFFFF] text-[13px] sm:text-[14px] font-light ml-1">{item.rating}</span>
							</div>
							<div className="flex items-center gap-1.5 sm:gap-2 mt-2">
								<button
									className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-white text-sm sm:text-lg font-light hover:bg-[#1C4390] outline-none border border-white bg-transparent transition-colors"
									style={{
										backgroundColor: 'transparent',
										backdropFilter: 'blur(6px)',
									}}
									onClick={() => handleQuantityChange(item.id, -1)}
								>
									–
								</button>
								<input
									type="text"
									value={item.quantity}
									readOnly
									className="w-7 h-6 sm:w-8 sm:h-7 text-center rounded text-[#FFFFFF] font-light font-poppins text-[14px] sm:text-[15px] mx-1 outline-none border border-white bg-transparent"
									style={{ minWidth: 28 }}
								/>
								<button
									className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-white text-sm sm:text-lg font-light hover:bg-[#1C4390] outline-none border border-white bg-transparent transition-colors"
									style={{
										backgroundColor: 'transparent',
										backdropFilter: 'blur(6px)',
									}}
									onClick={() => handleQuantityChange(item.id, 1)}
								>
									+
								</button>
							</div>
						</div>

						<div className="flex-shrink-0 flex items-center justify-center ml-2 sm:ml-4" style={{ height: 80, width: 80, background: '#fff', borderRadius: 16 }}>
							<img
								src={item.image}
								alt={item.name}
								className="object-contain"
								style={{ maxHeight: 70, maxWidth: 70, borderRadius: 12 }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}