import React, {Component} from "react";
import {isAuthenticated} from "../auth";
import {Redirect, Link} from 'react-router-dom';
import {read} from './apiUser';
import DefaultProfile from '../images/user.png';
import UserDelete from "./UserDelete";

class Profile extends Component{
    constructor(){
        super();
        this.state = {
            user: "",
            redirectToSignIn: false
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if(data.err){
                this.setState({redirectToSignIn: true})
            }else {
                this.setState({user:data});
            }
        });
    };

    componentDidMount(){
        const userId = this.props.match.params.userId;
        this.init(userId)
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }

    render() {
        const {redirectToSignIn, user} = this.state;
        // If authentication failed
        if(redirectToSignIn) return <Redirect to={"/"} />;

        return (
            <div className={"container"}>
                <h2 className={"mt-5 mb-5"}>Profile</h2>
                <div className={"row"}>
                    <div className={"col-md-6"}>
                        <img src={DefaultProfile} className="card-img-top" alt="user img" style={{ height: "250px", width: "250px" }}/>

                    </div>

                    <div className={"col-md-6"}>
                        <div className={"lead "}>
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
                        </div>
                        {isAuthenticated().user &&
                        isAuthenticated().user._id === user._id
                        && (
                            <div className={"row"}>
                                <Link to={`/user/edit/${user._id}`} className={"btn btn-raised btn-success mr-5"}>
                                      Edit Profile
                                </Link>
                                <UserDelete userId={user._id}/>
                            </div>
                        )}
                    </div>
                </div>


            </div>
        )
    }
}

export default Profile;