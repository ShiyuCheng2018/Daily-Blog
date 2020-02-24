import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {read, update, updateUser} from "./apiUser";
import {Redirect} from 'react-router-dom';

class EditProfile extends Component{
    constructor(){
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            error: "",
            redirectToProfile: false
        }
    }
    handleChange = (name) => (event) =>{
        this.setState({[name]: event.target.value})
    };

    clickSubmit = (event) => {
        event.preventDefault();
        const {name, email, password} = this.state;
        const user = {
            name,
            email,
            password: password || undefined
        };

        const userId = this.props.match.params.userId;
        const token = isAuthenticated().token;
        update(userId, token, user)
            .then(data=>{
                if(data.error){
                    this.setState({error: data.error})
                }else {
                    this.setState(updateUser(token, data, ()=>{
                        this.setState({
                            redirectToProfile: true
                        });
                    }))
                }
            })
    };

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if(data.err){
                this.setState({redirectToProfile: true})
            }else {
                this.setState({id:data._id, name: data.name, email: data.email, error: ""});
            }
        });
    };

    componentDidMount(){
        const userId = this.props.match.params.userId;
        this.init(userId)
    }

    signUpForm = (name, email, password)=>(
        <form>
            <div className={'form-group'}>
                <label className={'text-muted'} >Name</label>
                <input type={'text'} className={'form-control'} onChange={this.handleChange('name')} value={name}/>
            </div>
            <div className={'form-group'}>
                <label className={'text-muted'} >E-mail</label>
                <input type={'email'} className={'form-control'} onChange={this.handleChange('email')} value={email}/>
            </div>
            <div className={'form-group'}>
                <label className={'text-muted'} >Password</label>
                <input type={'password'} className={'form-control'} onChange={this.handleChange('password')} value={password}/>
            </div>
            <button className={'btn btn-raised btn-primary'} onClick={this.clickSubmit}>Update</button>
        </form>
    );

    render() {
        const {id, name, email, password, redirectToProfile} = this.state;
        if(redirectToProfile){
            return <Redirect to={`/user/${id}`} />;
        }
        return (
            <div className={"container"}>
                <h2 className={"mt-5 mb-5"}>Edit Profile</h2>
                {this.signUpForm(name, email, password)}
            </div>
        )
    }

}

export default EditProfile;