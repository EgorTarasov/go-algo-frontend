import { Box } from "@mui/material";
import { TypographyMain } from "../ui/Typography";
import MenuButton from "../ui/MenuButton";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import home_icon from '../../assets/home_icon.svg';
import create_algorithm from '../../assets/create_algorithm.svg';

export default function MenuAlgo({ isStatic = false }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(!isStatic);
    const location = useLocation();
    const currentPath = location.pathname.split('/')[1]; 

    const defaultStyle = {
        transition: `all 300ms ease-in-out`,
        opacity: 0,
        transform: 'translateY(-20px)',
        maxHeight: '0px',
        overflow: 'hidden',
    };

    const transitionStyles: { [id: string]: React.CSSProperties } = {
        entering: { opacity: 1, transform: 'translateY(0)', maxHeight: '70vh' },
        entered: { opacity: 1, transform: 'translateY(0)', maxHeight: '70vh' },
        exiting: { opacity: 0, transform: 'translateY(-20px)', maxHeight: '0px' },
        exited: { opacity: 0, transform: 'translateY(-20px)', maxHeight: '0px' },
    };

    return (
        <>
            <div style={{
                marginTop: '-70px',
                marginLeft: '8px',
                width: '300px',
                position: 'absolute'
            }}>
                <Box sx={{
                    backgroundColor: 'secondary.light',
                    borderRadius: '0 0 24.5px 24.5px',
                    alignItems: 'center',
                    marginTop: '40px',
                    padding: '20px',
                    paddingTop: '35px',
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} onClick={() => !isStatic && setIsOpen(!isOpen)}>
                        <TypographyMain sx={{ ml: 2 }}>МЕНЮ</TypographyMain>
                        {!isStatic && <ArrowDownwardIcon sx={{ mr: 2, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease', cursor: 'pointer' }} />}
                    </Box>
                    <div style={isStatic ? {} : {
                        ...defaultStyle,
                        ...transitionStyles[isOpen ? 'entered' : 'exited']
                    }}>
                        <Box sx={{height: '70vh'}}>
                            <MenuButton active={currentPath === 'home'} onClick={() => {navigate('/home') }} sx={{ width: '100%', mt: 3 }} iconSrc={home_icon}>Дашборд</MenuButton>
                            <MenuButton active={currentPath === 'createAlgorithm'} onClick={() => { navigate('/createAlgorithm')}} sx={{ width: '100%' }} iconSrc={create_algorithm}>Создать алгоритм</MenuButton>
                        </Box>
                    </div>
                </Box>
            </div>
        </>
    );
}
