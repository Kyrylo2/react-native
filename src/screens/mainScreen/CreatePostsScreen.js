import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';

import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

import { SimpleLineIcons } from '@expo/vector-icons';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { doc, setDoc } from 'firebase/firestore';

import { db } from '../../../firebase/config';
import { useSelector } from 'react-redux';

const storage = getStorage();
const metadata = {
  contentType: 'image/jpeg',
};

const CreatePostsScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState(null);
  const [photoLocationName, setPhotoLocationName] = useState();

  const [location, setLocation] = useState(null);
  const { userId, nickName } = useSelector((state) => state.auth);
  // console.log(store);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    })();
  }, []);

  const setUserLocation = async () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    })();

    console.log('Location', location);
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    setPhoto(photo.uri);
    console.log(photo);
  };

  const sendPhoto = async () => {
    console.log('send photo');
    await uploadPostToServer().then(() =>
      console.log('Photo taken successfully and uploaded')
    );
    setUserLocation();
    navigation.navigate('DefaultScreenPosts');
    // {
    //   photo,
    //   photoName,
    //   photoLocationName,
    //   location,
    // }
  };

  const uploadPostToServer = async () => {
    try {
      const photoUrl = await uploadPhotoToServer();
      console.log('95 -----', photoUrl);
      const postId = Date.now().toString();
      console.log(
        photoUrl,
        photoName,
        photoLocationName,
        location.coords,
        userId,
        nickName
      );
      await setDoc(doc(db, 'posts', postId), {
        photoUrl,
        photoName,
        photoLocationName,
        location: location.coords,
        userId,
        nickName,
      });
      // console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      console.log('File: ', file);
      const uniquePhotoId = Date.now().toString();
      const storageRef = ref(storage, `/postImages/${uniquePhotoId}`);

      let photoUrl;
      const snapshot = await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      photoUrl = downloadURL;
      console.log('Download link to your image: ', downloadURL);

      console.log(snapshot);
      console.log('Uploaded a blob or file!');

      // console.log('128----- ', photoUrl);

      return photoUrl;
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: '100%', width: '100%', borderRadius: 8 }}
              />
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Fontisto name="camera" size={20} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>

      <Text style={styles.text}>
        {photo ? 'Редактировать фото' : 'Загрузите фото'}
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          inputMode="text"
          placeholder={'Название...'}
          placeholderTextColor={'#BDBDBD'}
          value={photoName}
          onChangeText={(value) => setPhotoName(value)}
        />
        <View style={{ marginHorizontal: 16 }}>
          <TextInput
            style={[styles.input, { paddingLeft: 25, marginHorizontal: 0 }]}
            inputMode="text"
            placeholder={'Местность...'}
            placeholderTextColor={'#BDBDBD'}
            value={photoLocationName}
            onChangeText={(value) => setPhotoLocationName(value)}
          />
          <SimpleLineIcons
            name="location-pin"
            size={18}
            color="#BDBDBD"
            style={{ position: 'absolute', top: '30%' }}
          />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.buttonSend}
        onPress={sendPhoto}
      >
        <Text style={styles.btnTitle}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  cameraContainer: {
    borderRadius: 8,
    height: 240,
    marginTop: 32,
    marginHorizontal: 16,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    overflow: 'hidden',
  },

  text: {
    marginTop: 8,
    marginLeft: 16,
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },

  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSend: {
    borderRadius: 100,
    backgroundColor: '#FF6C00',
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 20,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  btnTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },

  camera: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  takePhotoContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    height: 90,
    width: 150,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: 'white',
  },

  form: { marginTop: 32 },
  input: {
    // justifyContent: "center",
    marginHorizontal: 16,
    // paddingLeft: 16,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    height: 50,
    borderRadius: 6,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
});
export default CreatePostsScreen;
