import React, {Component} from 'react';
import {singlePost, removePost, like, unlike, cancelLike, cancelUnLike} from "./apiPost";
import Comment from "./Comment";
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
import DefaultProfile from "../images/user.png";


class SinglePost extends Component {
    state={
        post: "",
        redirectHome: false,
        redirectToSignIn: false,
        like: false,
        likes: 0,
        unlike: false,
        unlikes: 0,
        comments: []
    };

    checkLike = (like) =>{
        const userId = isAuthenticated() && isAuthenticated().user._id;
        return like.indexOf(userId) !== -1;
    };

    componentDidMount = () =>{
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
           if(data.error){
               console.log(data.error)
           } else {
               console.log(data);
               this.setState({post: data,
                   likes: data.likes.length,
                   like:this.checkLike(data.likes),
                   unlikes: data.unlikes.length,
                   unlike: this.checkLike(data.unlikes),
                   comments: data.comments
               })
           }
        });
    };

    updateComments = comments =>{
        this.setState({comments})
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

    likeToggle = () => {
        if(!isAuthenticated()){
            this.setState({redirectToSignIn: true});
            return false
        }
        let callApi = this.state.like ? cancelLike : like;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;
        callApi(userId, token, postId)
            .then(data=>{
               if(data.err){
                   console.log(data.err);
               } else {
                   this.setState({
                       like: !this.state.like,
                       likes: data.likes.length,
                       unlike: false,
                       unlikes: data.unlikes.length,
                   })
               }
            });
    };

    disLikeToggle = () => {
        if(!isAuthenticated()){
            this.setState({redirectToSignIn: true});
            return false
        }
        let callApi = this.state.unlike ? cancelUnLike : unlike;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;
        callApi(userId, token, postId)
            .then(data=>{
                if(data.err){
                    console.log(data.err);
                } else {
                    this.setState({
                        unlike: !this.state.unlike,
                        unlikes: data.unlikes.length,
                        likes: data.likes.length,
                        like: false,
                    })
                }
            });
    };

    renderComments = (comments) =>{
        return comments.map((comment, i) =>{
            return (<div key={i}>
                <div className={"container my-2"}>
                    <div className={"row"}>
                        <div className={"col-1 bg-dark"}>
                            <img
                                className={"mx-auto w-100"}
                                height={"50px"}
                                src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                                onError={i=>(i.target.src = `${DefaultProfile}`)}
                                alt={comment.postedBy._id}/>
                        </div>
                        <div className={"col"}>
                            <h5>{comment.text}</h5>
                        </div>
                    </div>
                    <div className={"row mark"}>
                        <div className={"col-5 p-0"}>
                            <p className={"font-italic m-0"}>
                                {new Date(comment.create).toLocaleDateString("en-US")} by
                                {<Link to={`/user/${comment.postedBy._id}`}> {comment.postedBy.name}</Link>}
                            </p>
                        </div>
                        <div className={"col-4 ml-auto"}>
                            <div className={"row h-100 "}>
                                <button className={"badge badge-pill badge-danger px-4 ml-4"}>DELETE</button>
                                <button className={"badge badge-pill badge-info px-4 ml-4"}>REPLY</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>)
        })
    };

    renderPost = (post) => {
        let DefaultPost = [DefaultPost_0, DefaultPost_1, DefaultPost_2, DefaultPost_3, DefaultPost_4, DefaultPost_5,
            DefaultPost_6, DefaultPost_7];
        const postId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const author = post.postedBy ? post.postedBy.name : "anonymous";
        const {unlikes, likes, comments} = this.state;
        console.log(post);

        return (
            <div className="card col-md-8 mx-auto my-5" style={{height: "85%"}}>
                <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                     className="card-img-top mx-auto" alt={post.title}
                     style={{height: "70%", width:"70%"}}
                     onError={i => (i.target.src = `${DefaultPost[Math.floor(Math.random() * 7)]}`)}
                />


                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>

                </div>

                <p className={"font-italic mark"}>
                    {this.state.like?<span className={"text-left mr-2"} onClick={this.likeToggle} style={{cursor: "pointer",color:"blue"}} >
                        {likes} <i className="far fa-thumbs-up"> </i>
                    </span>:
                    <span className={"text-left mr-2"} onClick={this.likeToggle} style={{cursor: "pointer"}} >
                        {likes} <i className="far fa-thumbs-up"> </i>
                    </span> }

                    {this.state.unlike?<span className={"text-left mr-2"} onClick={this.disLikeToggle} style={{cursor: "pointer",color:"blue"}} >
                        {unlikes} <i className="far fa-thumbs-down"> </i>
                    </span>:
                        <span className={"text-left mr-2"} onClick={this.disLikeToggle} style={{cursor: "pointer"}} >
                        {unlikes} <i className="far fa-thumbs-down"> </i>
                    </span> }

                    <span className={"ml-5"}>
                        <Link to={postId} > {author}  </Link>
                        {new Date(post.created).toLocaleDateString("en-US")}
                    </span>
                </p>

                <hr/>
                <p>Comments</p>
                {this.renderComments(comments.reverse())}
                <hr/>

                <Link to={'/'} className="btn btn-raised btn-primary btn-sm w-100">
                    Back to home
                </Link>

                {isAuthenticated().user && isAuthenticated().user._id === post.postedBy && post.postedBy._id}

                {post.postedBy? (isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
                    <>
                        <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-success btn-sm w-100">
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
        const {post, redirectHome, redirectToSignIn, comments} = this.state;

        if(redirectHome){
            return <Redirect to={'/'}/>
        }else  if(redirectToSignIn){
            return <Redirect to={'/signin'}/>
        }

        return(
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        {this.renderPost(post)}
                        <hr/>
                        <Comment postId={post._id} comments={comments} updateComments={this.updateComments}/>
                    </div>
                </div>

            </div>
        )
    }
}

export default SinglePost;