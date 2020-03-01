import React, {Component} from 'react';
import {list} from './apiPost';
import DefaultPost_0 from "../images/postDefaults/postDefult_0.png";
import DefaultPost_1 from "../images/postDefaults/postDefult_1.jpg";
import DefaultPost_2 from "../images/postDefaults/postDefult_2.png";
import DefaultPost_3 from "../images/postDefaults/postDefult_3.jpg";
import DefaultPost_4 from "../images/postDefaults/postDefult_4.jpeg";
import DefaultPost_5 from "../images/postDefaults/postDefult_5.png";
import DefaultPost_6 from "../images/postDefaults/postDefult_6.png";
import DefaultPost_7 from "../images/postDefaults/postDefult_7.png";
import {Link} from "react-router-dom";

class Posts extends Component{
    constructor(){
        super();
        this.state = {
            posts: []
        }

    }

    componentDidMount() {

        list().then(data => {
            if(data.err){
                console.log(data.err)
            }else {
                this.setState({posts: data})
            }
        }).catch(err => {
            console.log(err);
        });

    }

    renderPosts = posts => {
        let DefaultPost = [DefaultPost_0, DefaultPost_1, DefaultPost_2, DefaultPost_3, DefaultPost_4, DefaultPost_5,
            DefaultPost_6, DefaultPost_7];
        return (
            <div className="row">
                {posts.map((post, i) => {
                    const postId = post.postedBy ? `/user/${post.postedBy._id}` : "";
                    const author = post.postedBy ? post.postedBy.name : "anonymous";

                    return ( <div className="card col-md-4 my-2" key={i} style={{height: "600px"}}>
                            <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                 className="card-img-top img-thumbnail" alt={post.title}
                                 style={{height: "300px", width:"auto"}}
                                 onError={i => (i.target.src = `${DefaultPost[Math.floor(Math.random() * 7)]}`)}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                {post.body.length > 250 ? <p className="card-text">{post.body.substring(0, 250)} ...</p> :
                                    <p className="card-text">{post.body}</p>}
                            </div>
                            <p className={"font-italic mark text-right"}>
                                <Link to={postId} > {author}  </Link>
                                <span>
                                    {new Date(post.created).toLocaleDateString("en-US")}
                                </span>
                            </p>
                            <Link to={`/posts/${post._id}`} className="btn btn-raised btn-primary btn-sm w-100">
                                Read more
                            </Link>
                        </div>)
                })}
            </div>
        )
    };

    render() {
        const {posts} = this.state;
        return(
            <div className={"container"}>
                <h2 className={"mt-5 mb-5"}>Recent Posts</h2>
                {this.renderPosts(posts)}
            </div>
        )
    }
}


export default Posts;