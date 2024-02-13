import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import img1 from 'src/assets/images/backgrounds/rocket.png';

export const Upgrade = () => {
    return (
        <Box
            display={'flex'}
            alignItems="center"
            gap={2}
            sx={{ m: 3, p: 3, bgcolor: `${'primary.light'}`, borderRadius: '8px' }}
        >
            <>
                <Box>
                    <Typography variant="h6" mb={1}>API Docs</Typography>
                    <Button color="primary" target="_blank" href="https://documenter.getpostman.com/view/22927069/2sA2r3b6pC" variant="contained" aria-label="logout" size="small">
                        View
                    </Button>
                </Box>
                <Box mt="-35px">
                    <img alt="Remy Sharp" src={img1} width={100} />
                </Box>
            </>
        </Box>
    );
};
