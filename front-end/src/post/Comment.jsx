import React, {Component} from 'react';
import {comment, uncomment} from "./apiPost";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticated} from "../auth";

class Comment extends Component{
    state = {
        text: ''
    };

    handleChange = event =>{
        this.setState({text: event.target.value});
    };

    addComment = (e) =>{
        e.preventDefault();
        const userId = isAuthenticated().user._id;
        const  token = isAuthenticated().token;
        const postId = this.props.postId;
        const comment_text = {text: this.state.text};
        comment(userId, token, postId, comment_text)
            .then(data=>{
                if(data.error){
                    console.log(data.error);
                }else {
                    this.setState({text: ''});
                    // Dispatch list of comments to parent (SinglePost.jsx"
                    console.log(data.comments)
                    this.props.updateComments(data.comments);
                }
            })
    };

    render() {
        return (
            <div >
                <h2>Leave your thought</h2>
                <form onSubmit={this.addComment}>
                    <div className={"form-group"}>
                        <input type={"text"} onChange={this.handleChange} className={"form-control"}/>
                    </div>
                    <button className={"btn btn-raised btn-primary"}>Submit</button>
                </form>
            </div>
        );
    }

}

export default Comment;