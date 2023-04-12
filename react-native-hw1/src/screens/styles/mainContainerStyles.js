import { StyleSheet } from 'react-native';

export const mainContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mainWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  title: {
    color: 'red',
    fontFamily: 'Roboto-Regular',
  },
});
