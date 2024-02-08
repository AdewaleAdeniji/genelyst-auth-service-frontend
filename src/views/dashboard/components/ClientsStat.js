/* eslint-disable react/prop-types */
import { Grid, Typography, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

const ClientsStats = ({ title, count }) => {
  // chart color

  return (
    <DashboardCard title={title}>
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {count}
          </Typography>
    
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default ClientsStats;
