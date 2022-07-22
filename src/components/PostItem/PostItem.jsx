import MyButton from '../UI/button/MyButton'
import './../../styles/App.css'
import React from 'react'
import { createBrowserHistory } from 'history';


const PostItem = (props) => {

    const router = createBrowserHistory()

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>{props.post.body}</div>
            </div>
            <div className="post__btns">
                <MyButton style={{margin: '0 5px'}} onClick={() => router.push(`/posts/${props.post.id}`)}>
                    Open
                </MyButton>
                <MyButton style={{margin: '0 5px'}} onClick={() => props.remove(props.post)}>
                    Delete
                </MyButton>
            </div>
        </div>
    )
}

export default PostItem