import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice.js';
import usersReducer from '../features/users/userSlice.js';

//configure redux store.
export const store = configureStore({
  reducer: {
    posts: postsReducer, // postsReducer containes postAdded.
    users: usersReducer, 
  },                      // Once the state has been updated, the react components, those have subscribed to store get re - rendered.

})

export default store;
