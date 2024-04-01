import { Box, Stack } from "@mui/material";
import { colors } from "../../constants/colors";
import { Link } from "react-router-dom";
import Searchbar from "../search-bar/search-bar";
import { logo } from "../../constants/logo";

const Navbar = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={2}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: colors.primary,
      }}
    >
      <Link to={"/"}>
        <img src={logo} alt="logo" width={160} height={40} />
      </Link>
      <Searchbar />
      <Box />
    </Stack>
  );
};

export default Navbar;
