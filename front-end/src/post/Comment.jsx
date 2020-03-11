import React, {Component} from 'react';
import {comment, uncomment} from "./apiPost";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticated} from "../auth";

class Comment extends Component{
    state = {
        text: '',
        error:''
    };

    isValid = () =>{
        const {text} = this.state;
        if(!text.length > 0 || text.length > 250){
            this.setState({error: "Comment should not be empty and less than 250 characters long ..."});
            return false;
        }
        return true
    };

    handleChange = event =>{
        this.setState({text: event.target.value, error: ""});
    };

    addComment = (e) =>{
        e.preventDefault();
        if(this.isValid()){
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
                        this.props.updateComments(data.comments);
                    }
                })
        }

    };

    render() {
        const {error} = this.state;
        return (
            <div >
                <div className={"alert alert-danger"} style={{display: error ? "" : "none"}}>{error}</div>
                <form onSubmit={this.addComment}>
                    <div className={"form-group"}>
                        <input type={"text"} onChange={this.handleChange}
                               className={"form-control"} value={this.state.text}
                               placeholder={"You can leave your thought here ..."}
                        />
                    </div>
                    <button className={"btn btn-raised btn-primary"}>Submit</button>
                </form>
            </div>
        );
    }

}

export default Comment;