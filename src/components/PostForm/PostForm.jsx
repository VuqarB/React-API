import { useState } from "react"
import MyInput from "../UI/input/MyInput"
import MyButton from "../UI/button/MyButton"
import React from 'react'


const PostForm = ({create}) => {

  const [post, setPost] = useState({title: '', body: ''})

  const addNewPost = (ev) => {
    ev.preventDefault()

    const newPost = {
        ...post, id: Date.now()
    }

    create(newPost)
    setPost({title: '', body: ''})
  }

    return (
        <form>
            <MyInput
                value={post.title}
                onChange={(ev) => setPost({ ...post, title: ev.target.value })}
                type='text'
                placeholder='name of post'
            />
            <MyInput
                value={post.body}
                onChange={(ev) => setPost({ ...post, body: ev.target.value })}
                type='text'
                placeholder='description of post'
            />
            <MyButton onClick={addNewPost}>Create</MyButton>
        </form>
    )
}

export default PostForm