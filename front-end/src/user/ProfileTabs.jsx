import React, {Component} from 'react';
import DefaultProfile from '../images/user.png';
import {Link} from 'react-router-dom';
import DefaultPost_0 from "../images/postDefaults/postDefult_0.png";
import DefaultPost_1 from "../images/postDefaults/postDefult_1.jpg";
import DefaultPost_2 from "../images/postDefaults/postDefult_2.png";
import DefaultPost_3 from "../images/postDefaults/postDefult_3.jpg";
import DefaultPost_4 from "../images/postDefaults/postDefult_4.jpeg";
import DefaultPost_5 from "../images/postDefaults/postDefult_5.png";
import DefaultPost_6 from "../images/postDefaults/postDefult_6.png";
import DefaultPost_7 from "../images/postDefaults/postDefult_7.png";


class ProfileTabs extends Component{
    render() {
        let DefaultPost = [DefaultPost_0, DefaultPost_1, DefaultPost_2, DefaultPost_3, DefaultPost_4, DefaultPost_5,
            DefaultPost_6, DefaultPost_7];
        const {following, followers, posts} = this.props;
        console.log(posts);
        return(
            <>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-md-4"}>
                            <h3 className={"text-primary"}>Followers</h3>
                            <hr/>
                            <div className={"row"}>
                            {followers.map((person, i) =>{
                                return (<div key={i}>
                                            <div className={" bg-danger m-3"}>
                                                <Link to={`/user/${person._id}`} className={"float-left"}>
                                                    <img
                                                        className={"mx-auto"}
                                                        height={"50px"}
                                                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                                         onError={i=>(i.target.src = `${DefaultProfile}`)}
                                                         alt={person.name}/>
                                                    <div>
                                                        <h5>{person.name}</h5>
                                                    </div>
                                                </Link>
                                            </div>
                                    </div>)
                            })}
                            </div>
                        </div>
                        <div className={"col-md-4 ml-auto"}>
                            <h3 className={"text-primary"}>Following</h3>
                            <hr/>
                            <div className={"row"}>
                                {following.map((person, i) =>{
                                    return (<div key={i}>
                                        <div className={" bg-danger m-3"}>
                                            <Link to={`/user/${person._id}`} className={"float-left"}>
                                                <img
                                                    className={"mx-auto"}
                                                    height={"50px"}
                                                    src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                                    onError={i=>(i.target.src = `${DefaultProfile}`)}
                                                    alt={person.name}/>
                                                <div>
                                                    <h5>{person.name}</h5>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/*Blogs rendering*/}
                    <h3 className={"text-primary"}>Blogs</h3>
                    <div className={"row"}>
                            {posts.map((post, i) =>{
                                return (
                                    <div className={"col col-md-4"} key={i}>
                                            <div className={" bg-danger m-3"}>
                                                <div className="card">
                                                    <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                                         className="card-img-top img-thumbnail" alt={post.title}
                                                         style={{height: "300px", width:"auto"}}
                                                         onError={i => (i.target.src = `${DefaultPost[Math.floor(Math.random() * 7)]}`)}
                                                    />
                                                    <div className="card-body">
                                                        {post.title.length > 36 ? <Link to={`/post/${post._id}`} className="card-text">
                                                            {post.title.substring(0, 36)} ...
                                                        </Link> :<Link to={`/post/${post._id}`} className="card-text">
                                                            {post.title}
                                                        </Link>}
                                                    </div>
                                                    <p className={"font-italic mark text-right"}>
                                                        <span>
                                                            {new Date(post.created).toLocaleDateString("en-US")}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                    </div>
                            )})}
                    </div>
                </div>
            </>
        );
    }
}

export  default  ProfileTabs;