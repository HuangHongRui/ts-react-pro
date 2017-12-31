import * as React from 'react';
import {Component} from 'react';
import "./comment.css"

class Comment extends Component <any,any> {
    render() {
        return (
            <div className="commentDiv">
                <div className="commentName">
                    <span>{this.props.comment.username} </span> : 
                </div>
                <p>{this.props.comment.content}</p>
            </div>
        )
    }
}
export default Comment