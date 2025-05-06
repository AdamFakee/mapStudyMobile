import { View, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import Video, { VideoRef } from 'react-native-video'

interface props {
  link?: string
}
const VideoPlay = (props: props) => {
  const ref = useRef<VideoRef>(null);
  return (
    <View style={styles.container}>
      <Video
        ref={ref}

        source={{
          uri: 'https://videos.pexels.com/video-files/31661126/13489699_2560_1440_30fps.mp4'
        }}
        controls={true}
        style={styles.video}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoPlay