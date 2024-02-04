import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!', date: sub(new Date(), { minutes: 5 }).toISOString(),reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0} },
  { id: '2', title: 'Second Post', content: 'More text', date: sub(new Date(), { minutes: 10 }).toISOString(), reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}}   
]

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {     
    postAdded: {
      reducer(state, action) {
        state.push(action.payload) // Since the posts slice only knows about the data it's responsible for, the state argument will be the array of posts by itself, and not the entire Redux state object.
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},
          }
        }
      }
    },
    postUpdated : (state,action) => {
      const {id,title,content} = action.payload;
      const existingPost = state.find(post => post.id === id) // Since the posts slice only knows about the data it's responsible for, the state argument will be the array of posts by itself, and not the entire Redux state object.
      if(existingPost){
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded : (state,action) => {
      const {postId,reaction} = action.payload;
      const existingPost = state.find(post => post.id === postId)
      if(existingPost){
        existingPost.reactions[reaction]++;
      }
    }
  }
})

export const { reactionAdded } = postsSlice.actions
export const {postAdded,postUpdated} = postsSlice.actions;
export default postsSlice.reducer