import { useState, useEffect } from "react";
import {
	TiendaIcon,
	SeguridadIcon,
	SeguimientoIcon,
	DevolucionesIcon,
} from "../assets/iconos/Icons";

const servicios = [
	{
		Icon: DevolucionesIcon,
		titulo: "Devoluciones",
		descripcion: "En todas nuestras tiendas",
	},
	{
		Icon: SeguridadIcon, 
		titulo: "Seguridad",
		descripcion: "Compra de manera segura",
	},
	{
		Icon: TiendaIcon, 
		titulo: "Tienda",
		descripcion: "Compra online y retira en tienda",
	},
	{
		Icon: SeguimientoIcon,
		titulo: "Seguimiento",
		descripcion: "Fácil y rápido sólo con tu DNI",
	},
];


const CARD_WIDTH = 382;
const CARD_HEIGHT = 220;
const GAP = 16;
const CONTAINER_MAX_WIDTH = 1576; 


const DESKTOP_BREAKPOINT = 1160; 
const TABLET_BREAKPOINT = 780; 
const MOBILE_BREAKPOINT = 400; 

export default function BloqueDeServicios() {
	const [theme, setTheme] = useState(() => {
		return document.documentElement.getAttribute("data-theme") || "light";
	});
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);


	useEffect(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName === "data-theme") {
					setTheme(document.documentElement.getAttribute("data-theme") || "light");
				}
			});
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});

		return () => observer.disconnect();
	}, []);


	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);


	const getColumns = () => {
		if (windowWidth < MOBILE_BREAKPOINT) {
			return 1;
		}
		if (windowWidth < TABLET_BREAKPOINT) {
			return 2; 
		}
		if (windowWidth < DESKTOP_BREAKPOINT) {
			return 2;
		}
		return 4;
	};

	const columns = getColumns();
	

	const actualColumns = columns === 4 ? 4 : (columns === 2 ? 2 : 1);

	const getSectionStyles = () => {
		const isMobile2Col = actualColumns === 2 && windowWidth < DESKTOP_BREAKPOINT;

		return {
			width: "100%",
			background: theme === "dark" ? "#120F31" : "#fff",
			padding: actualColumns === 1
				? "24px 16px"
				: (isMobile2Col ? "48px 16px" : "32px 0"), 
			display: "flex",
			justifyContent: "center",
			transition: "background 0.3s ease",
		};
	};

	return (
		<section style={getSectionStyles()}>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",

					gap: GAP, 
					width: "100%",

					maxWidth: CONTAINER_MAX_WIDTH,
					justifyContent: "center",
					alignItems: "stretch",
				}}
			>
				{servicios.map((servicio, idx) => (
					<ServicioCard 
						key={idx} 
						{...servicio} 
						theme={theme} 
						columns={actualColumns} 
						isMobile2Col={actualColumns === 2 && windowWidth < DESKTOP_BREAKPOINT} 
					/>
				))}
			</div>
		</section>
	);
}

// -------------------------------------------------------------
// ServicioCard 
// -------------------------------------------------------------

function ServicioCard(props) {
	const { Icon, titulo, descripcion, theme, columns, isMobile2Col } = props;
	const [hovered, setHovered] = useState(false);
	
	const shouldHover = hovered;


	const getCardWidth = () => {

		if (columns === 1) {
			return "100%";
		}
		
		const totalGapSpace = (columns - 1) * GAP;

		if (isMobile2Col) {
			return `calc((100% - ${totalGapSpace}px) / ${columns})`;
		}


		return `min(
			${CARD_WIDTH}px, 
			calc((100% - ${totalGapSpace}px) / ${columns})
		)`;
	};


	const getStyles = () => {
		const baseStyles = {
			container: {
				background: isMobile2Col 
					? "transparent" 
					: (shouldHover ? (theme === 'dark' ? "#2D257D" : "#1C4390") : (theme === 'dark' ? "#1F1A57" : "#FAF8FF")),
				
				borderRadius: isMobile2Col ? 0 : 16, 
				boxShadow: "none", 

				padding: isMobile2Col ? "16px 8px" : "32px", 

				width: getCardWidth(), 
				height: isMobile2Col ? "auto" : CARD_HEIGHT, 
				maxWidth: isMobile2Col ? "auto" : CARD_WIDTH, 
				minWidth: isMobile2Col ? "auto" : 260, 
				minHeight: isMobile2Col ? "auto" : CARD_HEIGHT,
				
				display: "flex",
				flexDirection: "column",
				
				alignItems: isMobile2Col ? "center" : "flex-start",
				justifyContent: "flex-start",

				transition: "all 0.3s ease",
				cursor: "pointer",

				opacity: 1, 
			},

			icon: {
				transform: shouldHover ? "scale(1.2)" : "scale(1)",
				transition: "transform 0.3s ease, color 0.3s ease",
				marginBottom: isMobile2Col ? 8 : 12,
			},
			title: {
				margin: isMobile2Col ? "4px 0" : "0 0 8px 0",
				fontFamily: "Poppins, sans-serif",
				fontWeight: 500,
				fontSize: isMobile2Col ? 18 : 20, 
				textAlign: "center", 
				transform: shouldHover ? "scale(1.05)" : "scale(1)",
				transition: "transform 0.3s ease, color 0.3s ease",
			},
			description: {
				fontFamily: "Poppins, sans-serif",
				fontWeight: 400,
				fontSize: isMobile2Col ? 14 : 13, 
				textAlign: "center", 
				transform: shouldHover ? "scale(1.05)" : "scale(1)",
				transition: "transform 0.3s ease, color 0.3s ease",
			},
		};

		if (theme === "dark") {
			const titleColor = isMobile2Col 
				? (shouldHover ? "#FFFFFF" : "#E5E2E1")
				: (shouldHover ? "#C3C7CB" : "#E5E2E1");

			const descriptionColor = isMobile2Col 
				? (shouldHover ? "#FFFFFF" : "#C3C7CB")
				: (shouldHover ? "#C3C7CB" : "#E5E2E1");
			
			const iconColor = isMobile2Col 
				? (shouldHover ? "#FFFFFF" : "#C6C4E3")
				: "#C6C4E3";

			return {
				...baseStyles,
				container: {
					...baseStyles.container,
					boxShadow: isMobile2Col ? "none" : (shouldHover ? "0 4px 8px 0 rgba(0,0,0,0.4)" : "0 1px 4px 0 rgba(0,0,0,0.3)"),
				},
				icon: { ...baseStyles.icon, color: iconColor },
				title: { ...baseStyles.title, color: titleColor },
				description: { ...baseStyles.description, color: descriptionColor },
			};
		} else {
			const lightIconColor = isMobile2Col 
				? (shouldHover ? "#2C509E" : "#747782") 
				: (shouldHover ? "#DAE2FF" : "#2C509E");
				
			const lightTitleColor = isMobile2Col 
				? (shouldHover ? "#2C509E" : "#747782")
				: (shouldHover ? "#DAE2FF" : "#434651");
				
			const lightDescriptionColor = isMobile2Col 
				? (shouldHover ? "#2C509E" : "#C4C6D3")
				: (shouldHover ? "#DAE2FF" : "#5A5D6A");
				
			return {
				...baseStyles,
				icon: { ...baseStyles.icon, color: lightIconColor },
				title: { ...baseStyles.title, color: lightTitleColor },
				description: { ...baseStyles.description, color: lightDescriptionColor },
			};
		}
	};

	const styles = getStyles();

	return (
		<div
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={styles.container}
		>
			<Icon width={48} height={48} style={styles.icon} />
			<h3 style={styles.title}>{titulo}</h3>
			<p style={styles.description}>{descripcion}</p>
		</div>
	);
}