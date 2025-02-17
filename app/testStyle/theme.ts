'use client';

import { extendTheme } from '@mui/joy/styles';

const lightPalette = {
    background: {
        body: '#fff',
    },
    primary: {
        solidBg: '#000',
        solidBorder: '#000',
        solidColor: '#fff',
        solidActiveBg: '#fffa',
        solidHoverBg: '#a5d6d8',
        solidDisabledBg: 'lightgrey',
    },
    // secondary
    // neutral: {

    // }
}

const darkPalette = {
    primary: {
        solidBg: '#000',
        solidColor: '#fff',
        solidActiveBg: '#fff',
        solidHoverBg: '#a5d6d8',
        solidDisabledBg: 'lightgrey',
    },
    neutral: {

    }
}

const CustomTheme = extendTheme({
    colorSchemes: {
        light: {
            palette: { ...lightPalette},
        },
        dark: {
            palette: { ...darkPalette},
        }
    }
});

export default CustomTheme;