import { Link } from "react-router-dom";
import { styled } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled
      to="/"
      height={70}
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: "1.2rem",
        justifyContent: "center",
        fontWeight: "bold",
        textDecoration: "none",
        color:"#000"
      }}
    >
      <img src="https://img.icons8.com/fluency-systems-regular/24/add-user-male--v1.png" alt="app logo"/> &nbsp; &nbsp; Genelyst 
    </LinkStyled>
  );
};

export default Logo;
