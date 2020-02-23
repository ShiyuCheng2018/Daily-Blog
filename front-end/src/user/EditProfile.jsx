import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {read} from "./apiUser";

class EditProfile extends Component{
    constructor(){
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            password: ""
        }
    }

    render() {
        return (
            <div className={"container"}>
                <h2 className={"mt-5 mb-5"}>Edit Profile</h2>
            </div>
        )
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if(data.err){
                this.setState({redirectToSignIn: true})
            }else {
                this.setState({id:data._id, name: data.name, email: data.email});
            }
        });
    };

    componentDidMount(){
        const userId = this.props.match.params.userId;
        this.init(userId)
    }

}

export default EditProfile;