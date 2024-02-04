import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = (props) => {
    const author = useSelector(state => state.users.find(user => user.id === props.userId));

    return (
        <span> by {author ? author.name : "unknown author"}</span>
    )

}