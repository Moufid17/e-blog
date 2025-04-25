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
        solidHoverBg: '#000a',
        solidDisabledBg: 'lightgrey',
        outlinedBg: '#fff',
        outlinedBorder: '#000',
        outlinedColor: '#000',
        outlinedActiveBg: '#fff',
        outlinedHoverBg: '#fff',
        outlinedDisabledBg: 'darkgrey',
    },
    success: {
        solidBg: 'rgb(234,179,8)',
        solidBorder: 'rgb(234,179,8)',
        solidColor: '#000',
        solidActiveBg: '#000',
        solidHoverBg: '#fff',
        solidDisabledBg: 'rgba(234,179,8, 0.5)',
    },
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