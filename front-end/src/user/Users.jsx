import React, {Component} from 'react';
import {list} from './apiUser';
import {Link} from "react-router-dom";
import DefaultProfile from '../images/user.png';

class Users extends Component{
    constructor(){
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if(data.err){
                console.log(data.err)
            }else {
                this.setState({users: data})
            }
        }).catch(err => {
            console.log(err);
        })
    }

    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card col-md-3 mx-md-4 my-2" key={i}>
                    <img src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                         className="card-img-top" alt={user.name}
                         style={{ height: "250px", width: "250px" }}
                         onError={i => (i.target.src = `${DefaultProfile}`)}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary btn-sm">
                            View Profile
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const {users} = this.state;
        return(
            <div className={"container"}>
                <h2 className={"mt-5 mb-5"}>Users</h2>
                {this.renderUsers(users)}
            </div>
        )
    }
}


export default Users;