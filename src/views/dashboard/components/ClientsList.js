/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Rating, Tooltip, Fab } from '@mui/material';
import img1 from 'src/assets/images/products/s4.jpg';
import img2 from 'src/assets/images/products/s5.jpg';
import img3 from 'src/assets/images/products/s7.jpg';
import img4 from 'src/assets/images/products/s11.jpg';
import { Stack } from '@mui/system';
import { IconArrowRight } from '@tabler/icons-react';
import BlankCard from '../../../components/shared/BlankCard';


const ClientsList = ({ clients }) => {
    return (
        <Grid container spacing={3}>
            {clients.map((client, index) => (
                <Grid item sm={12} md={4} lg={3} key={index}>
                    <BlankCard>
        
                        <CardContent sx={{ p: 3, pt: 2 }}>
                            <Typography variant="h6">{client.appName}</Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                <Stack direction="row" alignItems="center">            
                                    <Typography color="textSecondary">
                                        {client.appDescription}
                                    </Typography>
                                </Stack>
                                <Tooltip title="View details">
                                    <Link to={`/app/client/${client?.appID}`}>
                                <Fab
                                    size="small"
                                    color="#000"
                                    sx={{ bottom: '', right: '1px', position: '' }}
                                >
                                    <IconArrowRight size="16" />
                                </Fab>
                                </Link>
                            </Tooltip>
                            </Stack>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default ClientsList;
