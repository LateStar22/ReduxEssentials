import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { postUpdated } from './postsSlice'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { ReactionButtons } from './ReactionButtons'

export const EditPostForm = () => {
    const { postId } = useParams();

    const post = useSelector(state => state.posts.find(post => post.id === postId));

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const dispatch = useDispatch()
    const history = useHistory()

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postUpdated( // postUpdated is acting as action creator. It will send to store the action object which will contain payload object in it and type. It depends upon reducer function logic that how it handles it.
                    {
                        id: post.id,
                        content,
                        title,
                    }
                ))
                history.push(`/posts/${postId}`)
        }

    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
            </form>
            <ReactionButtons post={post}/>
            <button type="button" onClick={onSavePostClicked}>
                Save Post
            </button>
        </section>
    )
}
