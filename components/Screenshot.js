import React, { useRef, useState } from 'react';
import { Button, StyleSheet, View, Image, Text } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';

export default function ScreenShot() {
  const viewShotRef = useRef();
  const [image, setImage] = useState(null);

  const hasPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  };

  const takeScreenshot = async () => {
    if (await hasPermissions()) {
      const result = await viewShotRef.current.capture();
      const asset = await MediaLibrary.createAssetAsync(result);
      setImage(asset.uri);
    } else {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  return (
    <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1, captureMode: 'update' }}>
      <View style={styles.container}>
        
        <Text style={styles.text}>This is an example app</Text>
        <Button title="Take Screenshot" onPress={takeScreenshot} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    </ViewShot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
    marginTop: 20,
},
});
