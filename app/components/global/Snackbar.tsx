import { useEffect, useState } from "react";
import Snackbar from '@mui/joy/Snackbar';

export default function CustomSnackbar({isOpen=false, message, isDanger= false, onClose}: {isOpen: boolean, message: string, isDanger?: boolean, onClose: () => void}) {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    return (
        <Snackbar
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            color={isDanger ? "danger" : "primary"}
            variant={isDanger ? "solid" : "outlined"}
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