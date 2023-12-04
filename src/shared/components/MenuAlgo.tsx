import { Box } from "@mui/material";
import { TypographyMain } from "../ui/Typography";
import MenuButton from "../ui/MenuButton";
import Button from '../ui/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import home_icon from '../../assets/home_icon.svg';
import create_algorithm from '../../assets/create_algorithm.svg';
import my_algorithms from '../../assets/my_algorithms.svg';
import profile_icon from '../../assets/profile_icon.svg';
import icon_documentation from '../../assets/icon-documentation.png';




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
                        <Box sx={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box >
                                <MenuButton active={currentPath === 'home'} onClick={() => { navigate('/home') }} sx={{ width: '100%', mt: 3 }} iconSrc={home_icon}>Дашборд</MenuButton>
                                <MenuButton active={currentPath === 'createAlgorithm'} onClick={() => { navigate('/createAlgorithm') }} sx={{ width: '100%' }} iconSrc={create_algorithm}>Создать алгоритм</MenuButton>
                                <TypographyMain sx={{ mt: 4, ml: 2 }}>Аккаунт</TypographyMain>
                                <MenuButton active={currentPath === 'profile'} onClick={() => { navigate('/profile') }} sx={{ width: '100%' }} iconSrc={profile_icon}>Профиль</MenuButton>
                                <MenuButton active={currentPath === 'myAlgorithms'} onClick={() => { navigate('/myAlgorithms') }} sx={{ width: '100%' }} iconSrc={my_algorithms}>Мои алгоритмы</MenuButton>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <img src={icon_documentation} width="90%" />
                                <TypographyMain sx={{ mr: 0, mt: -4, textAlign: 'center' }}>На основе данных <br></br>ALGOPACK</TypographyMain>
                                <Button onClick={() => { }} sx={{
                                    width: '100%',
                                    backgroundColor: 'primary.main',
                                    color: 'secondary.main',
                                    fontFamily: 'FavoritC',
                                    textTransform: 'uppercase',
                                    '&:hover': {
                                        backgroundColor: 'secondary.main',
                                        color: 'white',
                                    },
                                }}>ALGOPACK</Button>
                            </Box>
                        </Box>

                    </div>
                </Box>
            </div>
        </>
    );
}
