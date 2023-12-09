import type { ReactNode } from 'react';
import { Typography } from '@mui/material';

interface StyledTypographyProps {
    children: ReactNode;
    sx?: any
}

export function TypographyHeader({ children, sx }: StyledTypographyProps) {
    return (
        <Typography 
            sx={{
                textAlign: 'left',
                mr: 2,
                ml: 0,
                fontFamily: 'Favorit Bold, Arial',
                fontWeight: 700,
                fontSize: '24px',
                color: 'secondary.main',
                textDecoration: 'none',
                ...sx
            }}
        >
            {children}
        </Typography>
    );
}

export function TypographyMain({ children , sx}: StyledTypographyProps) {
    return (
        <Typography 
            sx={{
                textAlign: 'left',
                mr: 2,
                mt: 0.5,
                ml: 0,
                fontFamily: 'FavoritPro-Regular, Arial',
                fontWeight: 400,
                fontSize: '16px',
                textDecoration: 'none',
                color: 'secondary.main',
                ...sx
            }}
        >
            {children}
        </Typography>
    );
}