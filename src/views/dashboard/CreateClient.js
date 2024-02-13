import {
  Grid,
  Box,
  Typography,
  Button,
} from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import { useState } from "react";
import { createUserClient } from "../../api";
import { toast } from "react-toastify";

const CreateAppClient = () => {
  const [fields, setFields] = useState({
    appName: "",
    appDescription: "",
  });
  const createClient = async () => {
    const { appName, appDescription } = fields;
    setFields({
        appName: "",
        appDescription: "",
    })
    toast.loading("Creating client")
    const create = await createUserClient({ appName, appDescription })
    toast.dismiss();
    if(create.success){
        toast.success(create.data?.message);
        toast.info("Redirecting to client created");
        window.location.href = `/app/client/${create.data?.appID}`;
        return;
    }
    toast.error(create.message||"Failed to create client");
  }
  return (
    <PageContainer
      title={"Create Client"}
      description={
        "Create a new app client to authenticate and authorize users"
      }
    >
      <Grid item xs={12} lg={12}>
        <Grid container spacing={3} mb={1}>
          <Grid item xs={12} sm={12}>
            <DashboardCard
              title={"Create client"}
              subtitle={
                "Create a new app client to authenticate and authorize users"
              }
            ></DashboardCard>
            <br />
            <DashboardCard title={""}>
              <Grid item xs={7} sm={7}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="appName"
                    mb="5px"
                  >
                    App Name
                  </Typography>
                  <CustomTextField
                    id="appName"
                    variant="outlined"
                    fullWidth
                    value={fields.appName}
                    onChange={(e) =>
                      setFields({ ...fields, appName: e.target.value })
                    }
                  />
                </Box>
                <br />
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="description"
                    mb="5px"
                  >
                    App Description
                  </Typography>
                  <CustomTextField
                    id="description"
                    variant="outlined"
                    fullWidth
                    value={fields.appDescription}
                    onChange={(e) =>
                      setFields({ ...fields, appDescription: e.target.value })
                    }
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!fields.appName || !fields.appDescription}
                  sx={{
                    marginTop: "15px",
                  }}
                  onClick={createClient}
                >
                  Create Client
                </Button>
              </Grid>
            </DashboardCard>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CreateAppClient;
