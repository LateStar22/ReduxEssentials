import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { PostAuthor } from "./postAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

export const SinglePostPage = () => {

    const { postId } = useParams();

    const post = useSelector(state => state.posts.find(post => post.id === postId));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <section>
            <article>
                <h2>
                    {post.title}
                </h2>
                <p className="post-content">
                    {post.content}
                </p>
                <PostAuthor userId={post.user}/>
                <Link to={`/editPost/${post.id}`}>Edit Post</Link>
                <ReactionButtons post={post}/>
                <TimeAgo timestamp={post.date}/>

            </article>
        </section>
    );
};

