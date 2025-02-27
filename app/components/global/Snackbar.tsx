import { use, useEffect, useState } from "react";
import Snackbar, { SnackbarProps } from '@mui/joy/Snackbar';

export default function CustomSnackbar({isOpen=false, message, isDanger= false, onClose}: {isOpen: boolean, message: string, isDanger?: boolean, onClose: () => void}) {
    const [open, setOpen] = useState(isOpen);
    const [color, setColor] = useState<SnackbarProps["color"]>('neutral');

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        if (isDanger) {
            setColor('danger');
        } 
    }, [isDanger]);

    return (
        <Snackbar
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            color={color}
            variant="outlined"
            onClose={(_, reason) => {
                if (reason === 'clickaway') {
                    return;
                }
                setOpen(false);
                onClose();
            }}
        >
            {message}
        </Snackbar>
    )
}