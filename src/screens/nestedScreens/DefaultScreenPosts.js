import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { nanoid } from 'nanoid';

import { useEffect, useState } from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { useSelector } from 'react-redux';

export default DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const { nickName, email } = useSelector((state) => state.auth);

  const avatar = require('../../../assets/images/avatar.png');
  // const email = email;
  // const nickName = 'Natali Romanova';

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    const postsFromDB = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPosts(postsFromDB);
  };

  useEffect(() => {
    console.log('Use Effect Default Screen Post');
    getAllPosts();
    console.log(posts);
  }, []);

  return (
    <View style={styles.mainContainer}>
      {posts.length > 0 ? (
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 32,
            flexDirection: 'row',
            marginBottom: 32,
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: '#E8E8E8',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            <Image source={avatar} style={{ width: '100%', height: '100%' }} />
          </View>
          <View style={{ marginLeft: 8, justifyContent: 'center' }}>
            <Text
              style={{
                fontSize: 13,
                lineHeight: 15,
                fontWeight: 700,
                color: '#212121',
              }}
            >
              {nickName}
            </Text>

            <Text
              style={{
                fontSize: 11,
                lineHeight: 13,
                fontWeight: 400,
                color: 'rgba(33, 33, 33, 0.8)',
              }}
            >
              {email}
            </Text>
          </View>
        </View>
      ) : (
        <Text>No posts</Text>
      )}

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.photo }}
              style={{ marginHorizontal: 16, height: 200, borderRadius: 8 }}
            />
            <Text
              style={{
                marginHorizontal: 16,
                marginTop: 8,
                fontSize: 16,
                lineHeight: 19,
                color: '#212121',
                fontWeight: 500,
              }}
            >
              {item.photoName}
            </Text>
            <View
              style={{
                marginTop: 11,
                marginHorizontal: 16,
                marginBottom: 34,
                height: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
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
                    console.log('location-pin');
                    navigation.navigate('MapScreen', {
                      location: item.location,
                      photoName: item.photoName,
                    });
                  }}
                  style={{
                    marginLeft: 9,
                    fontSize: 16,
                    lineHeight: 19,
                    color: '#212121',
                    textDecorationLine: 'underline',
                  }}
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
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'flex-end' },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
});
