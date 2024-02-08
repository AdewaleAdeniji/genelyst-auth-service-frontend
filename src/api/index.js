import axios from "axios";
import configs from "../helpers/configs";
export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
export const LogUserIn = (userObj) => {
  localStorage.setItem('user', JSON.stringify(userObj));
  localStorage.setItem('token', userObj.token);
}
export const LogUserOut = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token');
  window.location.href = "/auth/login";
}
export const getUser = () => {
  const user = localStorage.getItem('user');
  if(user){
    return JSON.parse(user) || {}
  }
  else {
    window.location.href = "/auth/login";
  }
}
export const Register = async (payload) => {
  var data = JSON.stringify(payload);
  var config = {
    method: "post",
    url: `${configs.USER_SERVICE_URL}/api/user/register`,
    headers: getConfigs,
    data: data,
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  }  catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};
const getConfigs = { 
    'appid': configs.USER_SERVICE_ID, 
    'authpublickey': configs.USER_SERVICE_PUBLIC_KEY, 
    'Content-Type': 'application/json'
  }
export const Login = async (payload) => {

  var data = JSON.stringify(payload);
  var config = {
    method: "post",
    url: `${configs.USER_SERVICE_URL}/api/user/login`,
    headers: getConfigs,
    data: data,
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  }  catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};
export const getTokenFromLocal = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/auth/login";
    return;
  }
  return token;
};


export const getAPIKeys = async () => {
  const token = await getTokenFromLocal();
  var config = {
    method: "get",
    url: `${configs.API_BASE_URL}/keys`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  }  catch (err) {
    //handleStatusCode(err?.response?.status);
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};
export const getDashboardStats = async () => {
    const token = await getTokenFromLocal();
    var config = {
      method: "get",
      url: `${configs.API_BASE_URL}/app/stats`,
      headers: {
        ...getConfigs,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const req = await axios(config);
      return {
        success: true,
        ...req.data,
      };
    }  catch (err) {
      handleStatusCode(err?.response?.status);
      return {
        success: false,
        message: err?.response?.data?.message || "Request failed ",
      };
    }
  };

  export const getUserClients = async () => {
    const token = await getTokenFromLocal();
    var config = {
      method: "get",
      url: `${configs.API_BASE_URL}/app/apps`,
      headers: {
        ...getConfigs,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const req = await axios(config);
      return {
        success: true,
        data: req.data,
      };
    }  catch (err) {
      handleStatusCode(err?.response?.status);
      return {
        success: false,
        message: err?.response?.data?.message || "Request failed ",
      };
    }
  };
  export const getUserClient = async (appID) => {
    const token = await getTokenFromLocal();
    var config = {
      method: "get",
      url: `${configs.API_BASE_URL}/app/details/${appID}`,
      headers: {
        ...getConfigs,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const req = await axios(config);
      return {
        success: true,
        data: req.data,
      };
    }  catch (err) {
      handleStatusCode(err?.response?.status);
      return {
        success: false,
        message: err?.response?.data?.message || "Request failed ",
      };
    }
  };
  export const updateUserClient = async (appID, body) => {
    const token = await getTokenFromLocal();
    var config = {
      method: "put",
      url: `${configs.API_BASE_URL}/app/details/${appID}`,
      headers: {
        ...getConfigs,
        Authorization: `Bearer ${token}`,
      },
      data: body,
    };
    try {
      const req = await axios(config);
      return {
        success: true,
        data: req.data,
      };
    }  catch (err) {
      handleStatusCode(err?.response?.status);
      return {
        success: false,
        message: err?.response?.data?.message || "Request failed ",
      };
    }
  };
export const getWaitlist = async (waitlistID) => {
  const token = await getTokenFromLocal();
  var config = {
    method: "get",
    url: `${configs.API_BASE_URL}/waitlists/data/${waitlistID}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  }  catch (err) {
    //handleStatusCode(err?.response?.status);
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};

export const handleStatusCode = (statusCode) => {
  if(statusCode === 403){
    window.location.href = "/auth/login";
  }
}

