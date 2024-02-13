/* eslint-disable react/prop-types */
import {
  Grid,
  Box,
  Typography,
  Switch,
  TextField,
  Button,
} from "@mui/material";
import PageContainer from "src/components/container/PageContainer";

// components
import ClientsStat from "./components/ClientsStat";
import React from "react";
import { getAppStats, getAppUsers, getUserClient, updateUserClient } from "../../api";
import Loader from "../../components/loader";
import { useParams } from "react-router-dom";
import DashboardCard from "../../components/shared/DashboardCard";
import { toast } from "react-toastify";
import ApiHITStat from "./components/ApiHitStat";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import EventsList from "./components/EventsList";
import UsersList from "./components/UsersList";

const AppClient = () => {
  const params = useParams();
  const clientID = params?.clientID;

  const [loading, setLoading] = React.useState(false);
  const [details, setDetails] = React.useState({});
  const [settings, setSettings] = React.useState({
    enabledWebhook:
      details?.client?.appSettings?.eventNotifications?.enabled || false,
    updated: false,
    tokenExpiry: 3600,
    webhookURL: details?.client?.appSettings?.eventNotifications?.webhookURL,
  });
  const [users, setUsers] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [value, setValue] = React.useState("1");
  const [stats, setStats] = React.useState({
    "user-registered": 0
  });
  const [stat, setStat] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === "2") {
      getStats();
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setLoading(true);
    getStats();
    
    const res = await getUserClient(clientID);
    if (res.success) {
      setDetails(res.data);
      setSettings({
        ...settings,
        tokenExpiry: res.data?.client?.appSettings?.tokenExpiry || 3600,
        enabledWebhook:
          res.data?.client?.appSettings?.eventNotifications?.enabled || false,
        webhookURL:
          res.data?.client?.appSettings?.eventNotifications?.webhookURL || "",
      });
      getUsers();
    }
    setLoading(false);
  };
  const getStats = async () => {
    const res = await getAppStats(clientID);
    if (res.success) {
      if(res?.stats){
        setEvents(res.events.reverse()||[]);
        setStats(res?.stats?.eventCounts);
        const keys = Object.keys(res?.stats?.eventCounts);
        const stat = keys.map((key) => {
          return {
            name: key,
            data: [res?.stats?.eventCounts[key]],
          }
        })
        setStat(stat);

      }
    }
  }
  const getUsers = async () => {
    const res = await getAppUsers(clientID);
    if (res.success) {
      setUsers(res.data || []);
    }
  }
  const saveSettings = async () => {
    setSettings({
      ...settings,
      updated: false,
    });
    toast.loading("Updating settings...");
    const res = await updateUserClient(clientID, {
      eventNotifications: {
        enabled: settings?.enabledWebhook,
        webhookURL: settings?.webhookURL,
      },
      tokenExpiry: settings?.tokenExpiry,
    });
    toast.dismiss();
    if (res.success) {
      toast.success("Settings updated successfully");
      setSettings({ ...settings, updated: false });
      return;
    }
    toast.error("Failed to update settings");
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <PageContainer
      title={details?.client?.appName}
      description={details?.client?.appDescription}
    >
      <Box>
        <Grid container spacing={3}>
          {loading ? (
            <Grid justifyContent={"center"} container>
              <Loader />
            </Grid>
          ) : (
            <>
              <Grid item xs={12} lg={12}>
                <Grid container spacing={3} mb={1}>
                  <Grid item xs={12} sm={12}>
                    <DashboardCard
                      title={details?.client?.appName}
                      subtitle={details?.client?.appDescription}
                    ></DashboardCard>
                  </Grid>
                </Grid>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="App client details"
                    >
                      <Tab label="Details" value="1" />
                      <Tab label="Events" value="2" />
                      <Tab label="Settings" value="3" />
                      <Tab label="API Keys" value="4" />
                      <Tab label="App Users" value="5" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <ClientsStat title="Total App Events" count={events.length} />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <ClientsStat
                          title="Total Registered Users"
                          count={stats?.userRegistered ?? 0}
                        />
                      </Grid>
                    </Grid>
                    <br />
                    <Grid item xs={12}>
                      <ApiHITStat hits={stat} title="App Events"/>
                    </Grid>
                  </TabPanel>
                  <TabPanel value="2">
                    <div className="events-box">
                      <div className="events-header">
                        Events Console
                      </div>
                      <EventsList appEvents={events || []}/>
                    </div>
                  </TabPanel>
                  <TabPanel value="3">
                    <DashboardCard title={"Settings"}>
                      <Grid container spacing={3}>
                        <Grid item xs={7} sm={7}>
                          <Typography variant="h6" fontWeight="100">
                            Send Webhook Notifications:{" "}
                            <Switch
                              {...label}
                              checked={settings?.enabledWebhook}
                              onChange={(e) => {
                                setSettings({
                                  ...settings,
                                  updated: true,
                                  enabledWebhook: e.target.checked,
                                });
                              }}
                            />
                          </Typography>

                          {settings?.enabledWebhook && (
                            <>
                              Webhook URL:{" "}
                              <TextField
                                id="webhookUrl"
                                type="url"
                                variant="outlined"
                                onChange={(e) =>
                                  setSettings({
                                    ...settings,
                                    updated: true,
                                    webhookURL: e.target.value,
                                  })
                                }
                                value={settings?.webhookURL}
                                sx={{
                                  height: "30px",
                                }}
                                height="30px"
                                size="small"
                              />
                            </>
                          )}

                          <Typography
                            variant="h6"
                            fontWeight="100"
                            sx={{
                              fontSize: "10px",
                              marginTop: "5px",
                            }}
                          >
                            When active, you&lsquo;ll receive a
                            notification(webhook call) for every event that
                            occurs in your app.
                          </Typography>
                          <br />
                          <Typography variant="h6" fontWeight="100" flex={true}>
                            JWT Token Expiry:{" "}
                            <TextField
                              id="tokenExpiry"
                              type="text"
                              variant="outlined"
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  updated: true,
                                  tokenExpiry: e.target.value,
                                })
                              }
                              value={settings?.tokenExpiry}
                              sx={{
                                height: "30px",
                              }}
                              height="30px"
                              size="small"
                            />{" "}
                            seconds
                          </Typography>
                          <br />
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              marginTop: "15px",
                            }}
                            onClick={saveSettings}
                            disabled={!settings?.updated}
                          >
                            Save Changes
                          </Button>
                        </Grid>
                      </Grid>
                    </DashboardCard>
                  </TabPanel>
                  <TabPanel value="4">
                    <Grid container spacing={3} mb={1}>
                      <Grid item xs={12} sm={12}>
                        <DashboardCard title={"API keys"}>
                          <Grid container spacing={3}>
                            <Grid item xs={7} sm={7}>
                              <Typography variant="h6" fontWeight="100">
                                App ID: {details?.client?.appID}
                              </Typography>
                              <br />
                              <Typography variant="h6" fontWeight="100">
                                Public Key: {details?.appKeys?.publicKey}
                              </Typography>
                              <br />
                              <Typography variant="h6" fontWeight="100">
                                Private Key: {details?.appKeys?.privateKey}
                              </Typography>
                            </Grid>
                          </Grid>
                        </DashboardCard>
                        <br />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value="5">
                      <UsersList users={users||[]}/>
                  </TabPanel>
                </TabContext>

                <br />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default AppClient;
