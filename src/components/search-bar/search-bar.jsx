import { IconButton, Paper } from "@mui/material";
import { colors } from "../../constants/colors";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const changeHandler = e => {
    e.preventDefault();

    if (value) {
      navigate(`/search/${value}`);
      setValue("")
    }
  };

  return (
    <Paper
      component={"form"}
      sx={{ border: `1px solid ${colors.secondary}`, pl: 2, boxShadow: "none" }}
      onSubmit={changeHandler}
    >
      <input
        type="text"
        placeholder="Seach..."
        className="search-bar"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <IconButton type="submit">
        <Search />
      </IconButton>
    </Paper>
  );
};

export default Searchbar;
