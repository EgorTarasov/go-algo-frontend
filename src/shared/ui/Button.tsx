import type { ReactNode } from 'react';
import { Button } from '@mui/material';

interface StyledButtonProps {
    onClick: (event: any) => void;
    sx?: any;
    children: ReactNode;
}

function StyledButton({ onClick, sx, children }: StyledButtonProps) {
    return (
        <Button
            onClick={onClick}
            sx={{ 
                mt: 3, 
                width: '300px', 
                color: 'white', 
                fontFamily: 'FavoritPro-Regular', 
                borderRadius: '8px', 
                backgroundColor: 'secondary.main', 
                textTransform: 'uppercase', 
                '&:hover': {
                    backgroundColor: 'primary.main', 
                },
                ...sx 
            }}
        >
            {children}
        </Button>
    );
}

export default StyledButton;
