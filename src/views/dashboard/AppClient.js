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
import { getUserClient, updateUserClient } from "../../api";
import Loader from "../../components/loader";
import { useParams } from "react-router-dom";
import DashboardCard from "../../components/shared/DashboardCard";
import { toast } from "react-toastify";

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

  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
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
    }
    setLoading(false);
  };
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
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <ClientsStat title="Total App Clients" count={0} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <ClientsStat
                      title="Total Users"
                      count={details?.totalUsers || 0}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {/* <ApiHITStat hits={details?.hits} /> */}
              </Grid>
              <Grid item xs={12} lg={12}>
                <Grid container spacing={3} mb={1}>
                  <Grid item xs={12} sm={12}>
                    <DashboardCard title={"Settings"}>
                      <Grid container spacing={3}>
                        {/* column */}
                        <Grid item xs={7} sm={7}>
                          <Typography variant="h6" fontWeight="100">
                            App ID: {details?.client?.appID}
                          </Typography>
                          <Typography variant="h6" fontWeight="100">
                            App Public Key: {details?.appKeys?.publicKey}
                          </Typography>
                          <Typography variant="h6" fontWeight="100">
                            App Private Key: {details?.appKeys?.privateKey}
                          </Typography>
                        </Grid>
                      </Grid>
                    </DashboardCard>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default AppClient;
