import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";

// components
import React from "react";
import { getUserClients } from "../../api";
import Loader from "../../components/loader";
import ClientsList from "./components/ClientsList";

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

  console.log(clients);
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          {loading ? (
            <Grid justifyContent={"center"} container>
              <Loader />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <ClientsList clients={clients|| 0}/>
            </Grid>
          )}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default AppClients;
