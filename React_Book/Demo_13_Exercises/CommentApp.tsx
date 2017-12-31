import * as React from 'react';
import { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import './comment.css';

class CommentApp extends Component<any,any> {
    constructor(props : any) {
        super(props)
        this.state = {
            comments : []
        }
    }
    handleSubmitComment ( comment: any ) {
        if(!comment) return
        if(!comment.username) return alert("请输入昵称")
        if(!comment.content) return alert('请输入内容')
        this.state.comments.push(comment)
        this.setState({
            comments : this.state.comments
        })
    }
    render() {
        return(
            <div className='wrapper'>
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
                <CommentList comments={this.state.comments}/>
            </div>
        );
    }
}
export default CommentApp;