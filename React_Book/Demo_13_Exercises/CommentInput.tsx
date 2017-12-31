import * as React from 'react';
import { Component } from 'react';

class ComponentInput extends Component <any, any> {
    constructor(props: string) {
        super(props);
        this.state = {
            username : '',
            content : ''
        };
    }
    onChangeHandleName(event: any) {
        this.setState({
            username : event.target.value
        });
    }
    onChangeHandleContent(event: any) {
        this.setState({
            content : event.target.value
        });
    }
    onClickHandle() {
        if (this.props.onSubmit) {
            const {username, content} = this.state;
            this.props.onSubmit({username, content});
        }
        this.setState ({content: ''});
    }
    render() {
        return(
            <div className="papa">
                <div className="lr nice">
                    <span>用户名：</span>
                    <input type="text" placeholder="输入昵称..." onChange={this.onChangeHandleName.bind(this)} value={this.state.username}/>
                </div>
                <div className="lr content">
                    <span>评论内容：</span>
                    <textarea placeholder="输入内容..." onChange={this.onChangeHandleContent.bind(this)} value={this.state.content}/>
                </div>
                <div className="lr btn">
                    <input type="button" value="发布" onClick={this.onClickHandle.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default ComponentInput;