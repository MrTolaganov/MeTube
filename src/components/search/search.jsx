import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../../service/api.service";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { colors } from "../../constants/colors";
import Videos from "../videos/videos";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const data = await ApiService.fetching(`search?part=snippet&q=${id}`);
        setVideos(data.items);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <CircularProgress sx={{ color: colors.secondary }} />
        </Box>
      ) : (
        <Box p={2} sx={{ height: "90vh" }}>
          <Container maxWidth="90%">
            <Typography variant="h4" fontWeight={"bold"} mb={2}>
              Search results for{" "}
              <span style={{ color: colors.secondary }}>{id}</span> videos
            </Typography>
            <Videos videos={videos} />
          </Container>
        </Box>
      )}
    </>
  );
};

export default Search;
