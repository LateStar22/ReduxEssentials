import React, { useState } from "react";
import { postAdded } from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);


    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);

    const onSavePostClicked = () => {
        if(title && content){
            dispatch( //dispatched to redux store.
            // id,title, content will be put inside action.payload.
                postAdded(title,content,userId)//postAdded action creator. It normally expects one arguement that is action.payload.We used to create payload on our own, but since we have used "prepare callback" in reducer funtion, we dont need to create payload on our own.
            )
            setTitle('');
            setContent('');
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))
      


    return (
        <section>
            <h2>
                Add a new Post
            </h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text"
                id="postTitle"
                name="postTitle"
                placeholder="What is on yout mind!"
                value={title}
                onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    {usersOptions}
                </select> 
                <label htmlFor="postContent">Content:</label>
                <textarea name="postContent" id="postContent" cols="30" rows="10" value={content} onChange={onContentChanged}/>
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save post</button>
            </form>
        </section>
    );
}

