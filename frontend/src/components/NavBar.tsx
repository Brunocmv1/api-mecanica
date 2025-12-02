import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Box, Link as MuiLink, IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import logo from "../assets/volkswagenlogo.png";

const navItems = [
    { label: "Início", path: "/home" },
    { label: "Clientes", path: "/clientes" },
    { label: "Veículos", path: "/veiculos" },
    { label: "Agendamentos", path: "/agendamentos" },
];

interface NavBarProps {
    toggleColorMode: () => void;
    mode: "light" | "dark";
}

export const NavBar = ({ toggleColorMode, mode }: NavBarProps) => {

    const isDark = mode === "dark";
    const navBg = isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.45)";
    const textColor = isDark ? "white" : "black";
    const logoFilter = isDark ? "invert(1) brightness(2)" : "brightness(0)";
    
    return (
        <AppBar 
            position="fixed"
            sx={{
                backgroundColor: navBg,
                backdropFilter: "blur(2px)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.55)",
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                transition: "background-color 0.3s ease"
            }}
        >
            <Toolbar>
                <MuiLink
                    component={RouterLink}
                    to="/home"
                    sx={{
                        display: 'inline-block',
                        textDecoration: 'none',
                        lineHeight: 0,
                        zIndex: 10,
                    }}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            width: "120px",
                            height: "auto",
                            display: "block",
                            filter: logoFilter,
                            transition: "filter 0.3s ease"
                        }}
                    />
                </MuiLink>
                <Box 
                    sx={{ 
                        flexGrow: 1,
                        display: 'flex', 
                        justifyContent: 'center',
                        gap: 6,
                        ml: -6,
                    }}
                >
                    {navItems.map((item) => (
                        <MuiLink
                            component={RouterLink}
                            to={item.path}
                            key={item.label}                   
                            sx={{
                                textDecoration: 'none',
                                color: textColor,
                                fontWeight: 600,
                                fontSize: '1rem',
                                paddingY: 0.2,
                                position: 'relative',                   
                                zIndex: 2,
                                transition: "color 0.3s ease",
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px', 
                                    backgroundColor: textColor, 
                                    transform: 'scaleX(0)',
                                    transformOrigin: 'center', 
                                    transition: 'transform 0.3s ease-in-out',
                                },
                                '&:hover': {
                                    opacity: 0.8,
                                    '&::after': {
                                        transform: 'scaleX(1)',
                                    },
                                }
                            }}
                        >
                            {item.label}
                        </MuiLink>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '60px', justifyContent: 'flex-end' }}>
                    <Tooltip title={isDark ? "Mudar para Claro" : "Mudar para Escuro"}>
                        <IconButton 
                            onClick={toggleColorMode} 
                            sx={{ 
                                color: textColor,
                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
                                "&:hover": {
                                    backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                                }
                            }}
                        >
                            {isDark ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                    </Tooltip>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default NavBar;