import React, {Component} from 'react';
import {list} from './apiPost';
import {Link} from "react-router-dom";
// import DefaultProfile from '../images/user.png';

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
        })
    }

    renderPosts = posts => {
        return (
            <div className="row">
                {posts.map((post, i) => {
                    const postId = post.postedBy ? `/user/${post.postedBy._id}` : "";
                    const author = post.postedBy ? post.postedBy.name : "anonymous";

                    return ( <div className="card col-md-3 mx-md-4 my-2" key={i}>
                            {/*<img src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}*/}
                            {/*     className="card-img-top" alt={user.name}*/}
                            {/*     style={{ height: "250px", width: "250px" }}*/}
                            {/*     onError={i => (i.target.src = `${DefaultProfile}`)}*/}
                            {/*/>*/}
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body.substring(0, 100)}</p>
                            </div>
                            <p className={"font-italic mark"}>
                                <Link to={postId} > {author} </Link>
                                <span className={"text-right"}>
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