import * as React from 'react';
import { Component } from 'react';
import Comment from './Comment'

class CommentList extends Component <any,any> {
    static defaultProps = {
        comments : []
    }
    render() {
        return (
            <div>
                {this.props.comments.map((comment:any, i:any)=> 
                <Comment comment={comment} key={i} />)}
            </div>
        );
    }
}

export default CommentList;