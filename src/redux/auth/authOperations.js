import db from '../../../firebase/config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { authSlice } from './authReducer';

const auth = getAuth();

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    console.log(login, email, password);
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      await updateProfile(user, { displayName: login });

      const { uid, displayName } = await auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickName: displayName,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

export const authSignInUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const { uid, displayName } = auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickName: displayName,
          userEmail: email,
        })
      );
      console.log('User logged in', user);
    } catch (err) {
      console.log(err);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  console.log('Sign out user');
  await signOut(auth);
  dispatch(authSlice.actions.authSignOut());
};

export const authStateChangeUser = () => async (dispatch) => {
  await onAuthStateChanged(auth, async (user) => {
    console.log('user:', user);
    console.log('auth:', auth);
    if (user) {
      console.log('user:', user);
      const { uid, displayName, email } = user;

      const userObj = {
        userId: uid,
        nickName: displayName,
        email: email,
      };
      console.log('userObj', userObj);

      await dispatch(authSlice.actions.updateUserProfile(userObj));
      await dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    } else {
      console.log('user: not found');
    }
  });
};

// export const onAuthStateChangedUser = () => async (dispatch) => {
//   onAuthStateChanged(auth, (user) => {
//     console.log('user:', user);
//     console.log('auth:', auth);
//     if (user) {
//       console.log('user:', user);
//       dispatch(
//         updateProfile({
//           userId: user.uid,
//           nickName: user.displayName,
//         })
//       );
//       dispatch(authStateChange({ stateChange: true }));
//     } else {
//       console.log('user: not found');
//     }
//   });
// };
