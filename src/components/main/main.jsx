import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { colors } from "../../constants/colors";
import Category from "../category/category";
import { ApiService } from "../../service/api.service";
import Videos from "../videos/videos";

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const selectedCategoryHandler = category => setSelectedCategory(category);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const data = await ApiService.fetching(
          `search?part=snippet&q=${selectedCategory}`
        );
        setVideos(data.items);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [selectedCategory]);

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
          <CircularProgress sx={{color: colors.secondary}} />
        </Box>
      ) : (
        <Stack>
          <Category
            selectedCategory={selectedCategory}
            selectedCategoryHandler={selectedCategoryHandler}
          />
          <Box p={2} sx={{ height: "90vh" }}>
            <Container maxWidth="90%">
              <Typography variant="h4" fontWeight={"bold"} mb={2}>
                {selectedCategory}{" "}
                <span style={{ color: colors.secondary }}>videos</span>
              </Typography>
              <Videos videos={videos} />
            </Container>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default Main;
