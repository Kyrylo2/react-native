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
// import { useSelector } from 'react-redux';

// import { customAlphabet } from 'nanoid/non-secure';

import { Camera, CameraType } from 'expo-camera';

// import * as Location from 'expo-location';

import { SimpleLineIcons } from '@expo/vector-icons';

// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { doc, setDoc } from 'firebase/firestore';

const CreatePostsScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  const [photoName, setPhotoName] = useState();
  const [photoLocationName, setPhotoLocationName] = useState();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: '100%', width: '100%' }}
              />
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log('take photo')}
            >
              {/* <TouchableOpacity style={styles.button} onPress={takePhoto}> */}
              <Fontisto name="camera" size={20} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      {!photo ? (
        <Text
          style={{
            marginTop: 8,
            marginLeft: 16,
            fontSize: 16,
            lineHeight: 19,
            color: '#BDBDBD',
          }}
        >
          Загрузите фото
        </Text>
      ) : (
        <Text
          style={{
            marginTop: 8,
            marginLeft: 16,
            fontSize: 16,
            lineHeight: 19,
            color: '#BDBDBD',
          }}
        >
          Редактировать фото
        </Text>
      )}

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
        onPress={() => console.log('send photo')}
        // onPress={sendPhoto}
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
    backgroundColor: 'pink',
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