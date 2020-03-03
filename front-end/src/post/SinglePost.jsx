import React, {Component} from 'react';
import {singlePost, removePost} from "./apiPost";
import DefaultPost_0 from "../images/postDefaults/postDefult_0.png";
import DefaultPost_1 from "../images/postDefaults/postDefult_1.jpg";
import DefaultPost_2 from "../images/postDefaults/postDefult_2.png";
import DefaultPost_3 from "../images/postDefaults/postDefult_3.jpg";
import DefaultPost_4 from "../images/postDefaults/postDefult_4.jpeg";
import DefaultPost_5 from "../images/postDefaults/postDefult_5.png";
import DefaultPost_6 from "../images/postDefaults/postDefult_6.png";
import DefaultPost_7 from "../images/postDefaults/postDefult_7.png";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticated} from "../auth";
import {remove} from "../user/apiUser";


class SinglePost extends Component {
    state={
        post: "",
        redirectHome: false
    };

    componentDidMount = () =>{
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
           if(data.error){
               console.log(data.error)
           } else {
               this.setState({post: data})
           }
        });
    };

    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;

        removePost(postId, token)
            .then(data=>{
                if(data.error){
                    console.log(data.error);
                }else {
                    this.setState({redirectHome: true})
                }

            });
    };

    renderPost = (post) => {
        let DefaultPost = [DefaultPost_0, DefaultPost_1, DefaultPost_2, DefaultPost_3, DefaultPost_4, DefaultPost_5,
            DefaultPost_6, DefaultPost_7];
        const postId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const author = post.postedBy ? post.postedBy.name : "anonymous";
        console.log(post);

        return (
            <div className="card col-md-8 mx-auto my-5" style={{height: "100%"}}>
                <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                     className="card-img-top mx-auto" alt={post.title}
                     style={{height: "70%", width:"70%"}}
                     onError={i => (i.target.src = `${DefaultPost[Math.floor(Math.random() * 7)]}`)}
                />
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>

                </div>
                <p className={"font-italic mark text-right"}>
                    <Link to={postId} > {author}  </Link>
                    <span>
                        {new Date(post.created).toLocaleDateString("en-US")}
                    </span>
                </p>

                <Link to={'/'} className="btn btn-raised btn-primary btn-sm w-100">
                    Back to home
                </Link>

                {isAuthenticated().user && isAuthenticated().user._id === post.postedBy && post.postedBy._id}


                {post.postedBy? (isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
                    <>
                        <Link to={'/'} className="btn btn-raised btn-success btn-sm w-100">
                            Edit Post
                        </Link>
                        <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger btn-sm w-100">
                            Delete Post
                        </button>
                    </>

                )): ""}

        </div>)
    };

    deleteConfirmed = () =>{
        let answer = window.confirm("Are you sure you want to delete your post?");
        if(answer){
            this.deletePost()
        }
    };

    render() {
        const {post, redirectHome} = this.state;
        if(redirectHome){
            return <Redirect to={'/'}/>
        }

        return(
            <div className={"container"}>
                <div className={"row"}>
                    {this.renderPost(post)}
                </div>
            </div>
        )
    }
}

export default SinglePost;