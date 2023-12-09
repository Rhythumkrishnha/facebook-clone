import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SearchBar() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getAllUsers = async () => {
        const response = await axios.get("/users");
        const allUsers = response.data.users;
        setUsers(
          allUsers.map((user) => ({
            name: user.name,
            value: user.id,
          }))
        );
      };
      getAllUsers();
    } catch (error) {
      throw error;
    }
  });

  const handleInputChange = (event, value) => {
    if (value === "") {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleEvent = (event, newValue) => {
    setOpen(false);
    navigate(`/profile/${newValue.value}`);
  };

  return (
    <Autocomplete
      className="searchbar"
      options={users}
      getOptionLabel={(option) => option.name}
      noOptionsText={"No user found"}
      open={open}
      onInputChange={handleInputChange}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "0",
          padding: "0",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        //   border: "none",
        },
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
            sx={{ border: 0 }}
            size="small"
            placeholder="Search for friends"
            className="searchInput"
          ></TextField>
        );
      }}
      size="small"
      onChange={handleEvent}
    ></Autocomplete>
  );
}

export default SearchBar;
