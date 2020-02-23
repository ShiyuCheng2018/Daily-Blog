import React, {Component} from 'react';
import {list} from './apiUser';

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

    render() {
        return(
            <div className={"container"}>
                <h2 className={"mt-5 mb-5"}>Users</h2>
            </div>
        )
    }
}


export default Users;