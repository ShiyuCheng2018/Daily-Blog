import React, {Component} from 'react';
import {singlePost} from "./apiPost";
import DefaultPost_0 from "../images/postDefaults/postDefult_0.png";
import DefaultPost_1 from "../images/postDefaults/postDefult_1.jpg";
import DefaultPost_2 from "../images/postDefaults/postDefult_2.png";
import DefaultPost_3 from "../images/postDefaults/postDefult_3.jpg";
import DefaultPost_4 from "../images/postDefaults/postDefult_4.jpeg";
import DefaultPost_5 from "../images/postDefaults/postDefult_5.png";
import DefaultPost_6 from "../images/postDefaults/postDefult_6.png";
import DefaultPost_7 from "../images/postDefaults/postDefult_7.png";
import {Link} from "react-router-dom";


class SinglePost extends Component {
    state={
        post: ""
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

    renderPost = (post) => {
        let DefaultPost = [DefaultPost_0, DefaultPost_1, DefaultPost_2, DefaultPost_3, DefaultPost_4, DefaultPost_5,
            DefaultPost_6, DefaultPost_7];
        const postId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const author = post.postedBy ? post.postedBy.name : "anonymous";

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
                <Link to={`/post/${post._id}`} className="btn btn-raised btn-primary btn-sm w-100">
                    Read more
                </Link>
        </div>)
    };

    render() {
        const {post} = this.state;
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