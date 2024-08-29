import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import CopyrightIcon from "@mui/icons-material/Copyright";
import ApartmentIcon from '@mui/icons-material/Apartment';
import React, { useState } from "react";

function GitSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = async () => {
    setError("");
    try {
      const response = await fetch(
        `https://api.github.com/users/${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("User not found");
      }
      const myData = await response.json();
      setUserData(myData);
      console.log(userData)
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } 
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          backgroundColor: "#041B32",
          color: "#ffffff",
          padding: 2,
          borderRadius: 2,
          mx:['0','0','5%','28%'],
          mt: 2,
        }}
      >
        <Typography
          m={1}
          textAlign={"center"}
          variant="h4"
          sx={{ fontWeight: "bold" }}
        >
          GitScan
        </Typography>

        <Stack
          direction={["column", "row"]}
          spacing={2}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <TextField          
      id="input-with-icon-textfield"
      value={searchTerm}
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="large" style={{ color: "#ffffff" }} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="contained"
              onClick={handleClick}
              sx={{
                backgroundColor: '#0073e6',
                '&:hover': {
                  backgroundColor: '#005bb5',
                },
                color: '#ffffff',
                padding: '6px 16px',
                minWidth: '64px',
              }}
            >
              Search
            </Button>
          </InputAdornment>
        ),
        style: { color: "#ffffff" },
      }}
      sx={{
        backgroundColor: "#1e2a47",
        input: { color: "#ffffff" },
        flexGrow: 1,
        borderRadius:3
      }}
      variant="outlined"
      fullWidth
    />
        </Stack>

        {error && (
          <Typography color="error" m={2}>
            {error}
          </Typography>
        )}

        {userData && (
          <Box
            sx={{
              backgroundColor: "#1e2a47",
              borderRadius: 3,
              padding: 3,
              mt: 2,
            }}
          >
            <Stack direction={["column","row"]} spacing={2} alignItems="center" ml={2}>
              <img
                src={userData.avatar_url}
                alt="Profile Pic"
                style={{ borderRadius: "50%", width: 120, height: 120 }}
              />
              <Box textAlign={['center','start']} pl={[0,3,3]}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {userData.name || "No name provided"}
                </Typography>
                <Typography color="#0073e6">{userData.login}</Typography>
                <Typography>
                  Joined {formatDate(userData.created_at)}
                </Typography>
              </Box>
            </Stack>

            <Stack flexWrap={"wrap"} direction="row" justifyContent="space-evenly" my={5}>
              <Stack alignItems="center">
                <Typography>Repos</Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {userData.public_repos}
                </Typography>
              </Stack>
              <Stack mx={1} alignItems="center">
                <Typography>Followers</Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {userData.followers}
                </Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography>Followings</Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {userData.following}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              alignItems={["left", "center"]}
              m={1}
              direction={["column", "row"]}
            >
              <Stack>
                <Stack alignItems={"center"} m={1} direction={"row"}>
                  <IconButton sx={{ backgroundColor: "white" }}>
                    <AddLocationIcon fontSize="small" />
                  </IconButton>
                  <Typography mx={2}>
                    {userData.location || "Location not provided"}
                  </Typography>
                </Stack>
                <Stack alignItems={"center"} m={1} direction={"row"}>
                  <IconButton sx={{ backgroundColor: "white" }}>
                    <ApartmentIcon fontSize="small" />
                  </IconButton>
                  <Typography marginLeft={2}>
                  {userData.company || "None"}
                  </Typography>
                </Stack>
              </Stack>
              <Stack ml={[0, 3]}>
                <Stack alignItems={"center"} m={1} direction={"row"}>
                  <IconButton sx={{ backgroundColor: "white" }}>
                    <TwitterIcon fontSize="small" />
                  </IconButton>
                  <Typography marginLeft={2}>
                    {userData.twitter_username || "Twitter not linked"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} m={1}>
                  <IconButton sx={{ backgroundColor: "white" }}>
                    <GitHubIcon fontSize="small" />
                  </IconButton>
                  <Typography marginLeft={2}>
                    <a href={userData.html_url} style={{ color: "#ffffff" }}>
                      GitHub Profile
                    </a>
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        )}
        <Stack
          direction={"row"}
          mt={2}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Typography mr={1} variant="h7">
            Copyright
          </Typography>
          <CopyrightIcon />
          <Typography ml={1} variant="h7" textAlign={"end"}>
            2024.Designed By Sufian Kamran
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}

export default GitSearch;
