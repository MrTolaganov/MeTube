import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiService } from "../../service/api.service";
import { Videos } from "../";
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { colors } from "../../constants/colors";
import ReactPlayer from "react-player";
import {
  CheckCircle,
  FavoriteOutlined,
  MarkChatRead,
  Tag,
  Visibility,
} from "@mui/icons-material";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideo, setRelatedVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const data = await ApiService.fetching(
          `videos?part=contentDetails,snippet,statistics&id=${id}`
        );
        setVideoDetail(data.items[0]);
        const relatedData = await ApiService.fetching(
          `search?part=snippet&relatedToVideoId=${id}&type=video`
        );
        setRelatedVideo(relatedData.items);
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
        <Box minHeight={"90vh"} mb={10}>
          <Box
            display={"flex"}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            <Box width={{ xs: "100%", md: "75%" }}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                className="react-player"
                controls
              />
              {videoDetail?.snippet.tags.map((item, idx) => (
                <Chip
                  label={item}
                  key={idx}
                  sx={{ marginTop: "10px", cursor: "pointer", ml: "10px" }}
                  deleteIcon={<Tag />}
                  onDelete={() => {}}
                  variant="outlined"
                />
              ))}
              <Typography variant="h5" fontWeight={"bold"} p={2}>
                {videoDetail?.snippet.title}
              </Typography>
              <Typography variant="subtitle2" p={2} sx={{ opacity: ".7" }}>
                {videoDetail?.snippet.description}
              </Typography>
              <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
                <Stack
                  direction={"row"}
                  gap={"20px"}
                  alignItems={"center"}
                  py={1}
                  px={2}
                >
                  <Stack
                    sx={{ opacity: 0.7 }}
                    direction={"row"}
                    alignItems={"center"}
                    gap={"3px"}
                  >
                    <Visibility />
                    {parseInt(
                      videoDetail?.statistics.viewCount
                    ).toLocaleString()}{" "}
                    views
                  </Stack>
                  <Stack
                    sx={{ opacity: 0.7 }}
                    direction={"row"}
                    alignItems={"center"}
                    gap={"3px"}
                  >
                    <FavoriteOutlined />
                    {parseInt(
                      videoDetail?.statistics.likeCount
                    ).toLocaleString()}{" "}
                    likes
                  </Stack>
                  <Stack
                    sx={{ opacity: 0.7 }}
                    direction={"row"}
                    alignItems={"center"}
                    gap={"3px"}
                  >
                    <MarkChatRead />
                    {parseInt(
                      videoDetail?.statistics.commentCount
                    ).toLocaleString()}{" "}
                    comments
                  </Stack>
                </Stack>
              </Link>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={"5px"}
                marginTop={"5px"}
              >
                <Avatar
                  src={videoDetail?.snippet.thumbnails.default.url}
                  alt={videoDetail?.snippet.channelTitle}
                />
                <Typography variant="subtitle2" color={"gray"}>
                  {videoDetail?.snippet.channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Stack>
            </Box>
            <Box
              width={{ xs: "100%", md: "75%" }}
              px={2}
              py={{ md: 1, xs: 5 }}
              justifyContent={"center"}
              alignItems={"center"}
              overflow={"scroll"}
              maxHeight={"120vh"}
            >
              <Videos videos={relatedVideo} />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default VideoDetail;
