import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './postAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

export const PostsList = () => {
  const posts = useSelector(state => state.posts) // It is going to redux store as we are using useSelector(). State is the object containing posts object in it. useSelector() will run the function inside it everytime the state is changed, and it will also re-render the component which has subscribed to redux store.
//components dispatching actions, reducers processing actions and returning new state, and components reading the new state and rerendering the UI.
const orderedPosts = posts
  .slice()
  .sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return b.date.localeCompare(a.date);
  });

console.log("ordered",orderedPosts);

return (
    <section className="posts-list">
      <h2>Posts</h2>
      {orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
          <h3>{post.title}</h3>
          <p className="post-content">{post.content.substring(0, 100)}</p>
          <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
          <Link to={`/editPost/${post.id}`} className="button muted-button">Edit Post</Link>
          <PostAuthor userId={post.user}/>
          <ReactionButtons post={post}/>
          <TimeAgo timestamp={post.date}/>
          </article>
      ))}
    </section>
  )
}
