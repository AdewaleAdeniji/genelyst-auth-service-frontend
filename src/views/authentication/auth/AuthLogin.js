import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { LogUserIn, Login, validateEmail } from "../../../api";

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const disabled =
    payload.email === "" ||
    payload.password === "" ||
    payload.password.length < 8 ||
    loading;
  const handleSubmit = async () => {
    if (payload.password.length < 8) {
      return toast.warn(`Password must be 8 characters or more`);
    }
    if (payload.email.length < 4 || !validateEmail(payload.email)) {
      return toast.error(`Invalid email address`);
    }
    // all good
    setLoading(true);
    const api = await Login(payload);
    console.log(api);
    setLoading(false);
    if (!api.success) {
      toast.warn(api.message);
      return;
    }
    toast.success("Logged in successfully");
    await LogUserIn({ ...api, email: payload.email});
    window.location.href = "/app/dashboard";
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email Address
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              setPayload({
                ...payload,
                email: e.target.value,
              })
            }
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            onChange={(e) =>
              setPayload({
                ...payload,
                password: e.target.value,
              })
            }
            fullWidth
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          ></Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="button"
          disabled={disabled}
          onClick={handleSubmit}
        >
          {loading ? "Signing in...." : "Sign In"}
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

AuthLogin.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.node,
  subtext: PropTypes.node,
};

export default AuthLogin;
