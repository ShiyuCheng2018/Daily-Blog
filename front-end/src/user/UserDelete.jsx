import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {isAuthenticated} from "../auth";
import {remove} from "./apiUser";
import {signOut} from "../auth";

class UserDelete extends Component{

    state = {
      redirect: false
    };

    deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId, token)
            .then(data => {
                if(data.err){
                    console.log(data.err)
                }else {
                    signOut(()=> console.log("User is deleted!"));
                    this.setState({redirect: true})
                }
            })
    };

    deleteConfirmed = () => {
      let answer = window.confirm("Are you sure you want to delete your account? ")
       if(answer){
           this.deleteAccount()
       }


    };

    render() {
        if(this.state.redirect){
            return <Redirect to={"/"}/>
        }
        return(
          <div >
              <button className={"btn btn-raised btn-danger"} onClick={this.deleteConfirmed}>DELETE PROFILE</button>
          </div>
        );
    }
}

export default UserDelete;