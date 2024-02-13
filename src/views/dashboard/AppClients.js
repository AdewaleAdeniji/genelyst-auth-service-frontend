import { Grid, Box, Button } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";

// components
import React from "react";
import { getUserClients } from "../../api";
import Loader from "../../components/loader";
import ClientsList from "./components/ClientsList";
import DashboardCard from "../../components/shared/DashboardCard";
import { Link } from "react-router-dom";

const AppClients = () => {
  const [loading, setLoading] = React.useState(false);
  const [clients, setClients] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const res = await getUserClients();
    if (res.success) {
      setClients(res.data);
      // handleAggregation(res.stats);
    }
    setLoading(false);
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          {loading ? (
            <Grid justifyContent={"center"} container>
              <Loader />
            </Grid>
          ) : clients.length === 0 ? (
            <Grid item xs={12} sm={12}>
              <DashboardCard
                title={"You have not created any client yet, click the button below to create a new client"}
                subtitle={
                  ""
                }
              >
                <Box display="flex" justifyContent="center">
                <Link to={"/client/create"}>
                  <Button
                    variant="contained"
                    color="primary"
                  >
                    Create Client
                  </Button>
                  </Link>
                </Box>
              </DashboardCard>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <ClientsList clients={clients || 0} />
            </Grid>
          )}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default AppClients;
