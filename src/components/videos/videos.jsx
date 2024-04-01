import { Box, Stack } from "@mui/material";
import VideoCard from "../video-card/video-card";
import ChannelCard from "../channel-card/channel-card";

const Videos = ({ videos }) => {
  return (
    <Stack
      width={"100%"}
      direction={"row"}
      flexWrap={"wrap"}
      justifyContent={"start"}
      alignItems={"center"}
      gap={2}
    >
      {videos?.map(video => (
        <Box key={video?.snippet.title}>
          {video?.snippet.title && <VideoCard video={video} />}
          {video?.snippet.channelId && <ChannelCard video={video} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
