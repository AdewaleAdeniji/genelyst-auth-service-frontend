import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";

// components
import ClientsStat from "./components/ClientsStat";
import ApiHITStat from "./components/ApiHitStat";
import React from "react";
import { getDashboardStats } from "../../api";
import Loader from "../../components/loader";

const AppDashboard = () => {
  const [loading, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState({
    stats: [],
    totalUsers: 0,
    hits: []
  });

  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const res = await getDashboardStats();
    if (res.success) {
      handleAggregation(res.stats);
    }
    setLoading(false);
  };
  const handleAggregation = (data) => {
    let totalUsers = 0;
    data.forEach((stat) => {
        totalUsers += stat.hookEventsCount;
    });
    const hits = data.map((stat) => {
        return {
            name: stat.appName,
            data: [stat.hookEventsCount||0],
        }
    })
    console.log(hits)
    setStats({
        stats: data,
        totalUsers,
        hits,
    });
  }
  
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          {loading ? (
            <Grid justifyContent={"center"} container>
              <Loader />
            </Grid>
          ) : (
            <>
              <Grid item xs={12} lg={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <ClientsStat title="Total App Clients" count={stats?.stats?.length || 0} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <ClientsStat title="Total Users" count={stats?.totalUsers || 0} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <ApiHITStat hits={stats?.hits}/>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default AppDashboard;
