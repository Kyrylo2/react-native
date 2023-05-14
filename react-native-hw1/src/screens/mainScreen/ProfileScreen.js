import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { AntDesign } from '@expo/vector-icons';

import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';

const backgroundImage = require('../../../assets/images/bg_new.png');

export default ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([
    {
      photo: require('../../../assets/images/postImg.png'),
      photoName: 'Лес',
      photoLocationName: `Ivano-Frankivs'k Region, Ukraine`,
    },
    {
      photo: require('../../../assets/images/postImg.png'),
      photoName: 'Лес',
      photoLocationName: `Ivano-Frankivs'k Region, Ukraine`,
    },
    {
      photo: require('../../../assets/images/postImg.png'),
      photoName: 'Лес',
      photoLocationName: `Ivano-Frankivs'k Region, Ukraine`,
    },
  ]);
  const avatar = require('../../../assets/images/avatar.png');
  const nickName = 'Natali Romanova';

  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={backgroundImage} style={styles.image}>
        <View style={styles.form}>
          <View
            style={[
              styles.photoConteiner,
              {
                transform: [{ translateX: -60 }],
              },
            ]}
          >
            {!avatar ? (
              <>
                <Image source={avatar} style={styles.avatarBtn} />

                <TouchableOpacity
                  style={styles.addbutton}
                  activeOpacity={1}
                  onPress={null}
                >
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Image source={avatar} style={styles.avatarBtn} />

                <TouchableOpacity
                  style={styles.addbutton}
                  activeOpacity={1}
                  onPress={null}
                >
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color="#E8E8E8"
                    style={{
                      borderRadius: 50,
                    }}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
          <MaterialIcons
            name="logout"
            size={24}
            color="#BDBDBD"
            style={{ position: 'absolute', top: 24, right: 16 }}
            onPress={() => console.log('Logged out')}
          />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>{nickName}</Text>
          </View>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={item.photo}
                  style={{
                    marginHorizontal: 16,
                    minHeight: 200,
                    width: 'auto',
                    borderRadius: 8,
                  }}
                />
                <Text style={styles.textPostName}>{item.photoName}</Text>
                <View style={styles.conteinerCommentMap}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5
                      name="comment"
                      size={18}
                      color="#BDBDBD"
                      onPress={() => {
                        navigation.navigate('CommentsScreen', {
                          postId: item.id,
                        });
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SimpleLineIcons
                      name="location-pin"
                      size={18}
                      color="#BDBDBD"
                    />
                    <Text
                      onPress={() => {
                        navigation.navigate('MapScreen', {
                          location: item.location,
                        });
                      }}
                      style={styles.textMap}
                    >
                      {item.photoLocationName}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  addbutton: {
    position: 'absolute',
    top: 70,
    left: '90%',
    borderRadius: 50,
    height: 25,
    width: 25,
    pointerEvents: 'auto',
  },
  textPostName: {
    marginHorizontal: 16,
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    fontFamily: 'Roboto-Regular',
    fontWeight: 500,
  },
  textMap: {
    marginLeft: 9,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    textDecorationLine: 'underline',
  },
  conteinerCommentMap: {
    marginTop: 11,
    marginHorizontal: 16,
    marginBottom: 34,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarBtn: {
    borderRadius: 15,
    width: '100%',
    height: '100%',
  },
  avatar: {},
  photoConteiner: {
    marginTop: -60,
    left: '50%',

    height: 120,
    width: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  container: { justifyContent: 'flex-end' },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },

  input: {
    marginHorizontal: 16,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    height: 50,
    borderRadius: 6,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  form: {
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: '#FFFFFF',
    height: 650,
  },
  title: {
    marginHorizontal: 40,
    color: '#212121',
    marginBottom: 33,
    marginTop: 32,
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    // fontWeight: 500,
    justifyContent: 'center',
  },
  button: {
    borderRadius: 100,
    backgroundColor: '#FF6C00',
    marginHorizontal: 16,
    marginTop: 43,
    marginBottom: 20,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  showPass: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    top: 8,
    right: 20,
    position: 'absolute',
  },
  btnTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  toggleButton: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#1B4371',
  },
});
