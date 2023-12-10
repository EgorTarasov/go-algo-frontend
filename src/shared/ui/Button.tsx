import type { ReactNode } from 'react';
import { Button } from '@mui/material';

interface StyledButtonProps {
    onClick: (event: any) => void;
    sx?: any;
    children: ReactNode;
    className? : string;
}

function StyledButton({ onClick, sx, children, className }: StyledButtonProps) {
    return (
        <Button
            onClick={onClick}
            className={className ? className : ''}
            sx={{ 
                mt: 3, 
                width: '300px', 
                color: 'white', 
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
