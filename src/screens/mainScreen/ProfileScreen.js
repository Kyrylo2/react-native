import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import {
  MaterialIcons,
  AntDesign,
  FontAwesome5,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';

import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { authSignOutUser } from '../../redux/auth/authOperations';

const backgroundImage = require('../../../assets/images/bg_new.png');
const avatarImage = require('../../../assets/images/avatar.png');

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { nickName, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getUserPosts = async () => {
    const q = await query(
      collection(db, 'posts'),
      where('userId', '==', userId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      console.log('Current posts: ', posts);
      setPosts(posts);
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  // const getAllPosts = async () => {
  //   const querySnapshot = await getDocs(collection(db, 'posts'));
  //   const postsFromDB = querySnapshot.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));
  //   console.log('postsFromDB', postsFromDB);
  //   setPosts(postsFromDB);
  // };

  // useEffect(() => {
  //   console.log('Use Effect Default Screen Post');
  //   getAllPosts();
  //   console.log(posts);
  // }, []);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={backgroundImage} style={styles.image}>
        <View style={styles.form}>
          <View
            style={[
              styles.photoContainer,
              {
                transform: [{ translateX: -60 }],
              },
            ]}
          >
            {!avatarImage ? (
              <>
                <Image source={avatarImage} style={styles.avatarBtn} />

                <TouchableOpacity
                  style={styles.addButton}
                  activeOpacity={1}
                  onPress={null}
                >
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Image source={avatarImage} style={styles.avatarBtn} />

                <TouchableOpacity
                  style={styles.addButton}
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
            onPress={() => dispatch(authSignOutUser())}
          />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>{nickName}</Text>
          </View>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={{ uri: item.photo }}
                  style={{
                    marginHorizontal: 16,
                    minHeight: 200,
                    width: 'auto',
                    borderRadius: 8,
                  }}
                />
                <Text style={styles.textPostName}>{item.photoName}</Text>
                <View style={styles.containerCommentMap}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5
                      name="comment"
                      size={18}
                      color="#BDBDBD"
                      onPress={() => {
                        navigation.navigate('CommentsScreen', {
                          postId: item.id,
                          imageUrl: item.photo,
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
                          photoName: item.photoName,
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
  addButton: {
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
    fontWeight: '500',
  },
  textMap: {
    marginLeft: 9,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    textDecorationLine: 'underline',
  },
  containerCommentMap: {
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
  photoContainer: {
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

export default ProfileScreen;
