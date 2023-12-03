import type { ReactNode } from 'react';
import { Button } from '@mui/material';

interface StyledButtonProps {
    onClick: (event: any) => void;
    sx?: any;
    children: ReactNode;
    iconSrc: string;
    active: boolean
}

function MenuButton({ onClick, sx, children, iconSrc, active }: StyledButtonProps) {
    return (
        <Button
            onClick={onClick}
            sx={{ 
                mt: 1, 
                width: '300px', 
                color: 'black', 
                fontFamily: 'Favorit Pro', 
                backgroundColor: active ? 'white' : 'transparent', 
                boxShadow: active ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none', 
                borderRadius: '8px', 
                textTransform: 'none', 
                justifyContent: 'flex-start', 
                '&:hover': {
                    backgroundColor: 'white', 
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                },
                height: '50px',
                paddingLeft: '15px',
                ...sx 
            }}
            startIcon={<img src={iconSrc} alt="icon" height="18px"/>}
        >
            {children}
        </Button>
    );
}

export default MenuButton;
