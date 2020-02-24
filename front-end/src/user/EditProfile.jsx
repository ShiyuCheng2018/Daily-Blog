import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {read, update, updateUser} from "./apiUser";
import {Redirect} from 'react-router-dom';
import DefaultProfile from '../images/user.png';

class EditProfile extends Component{
    constructor(){
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            error: "",
            about: "",
            fileSize: 0,
            redirectToProfile: false,
            loading: false
        }
    }
    handleChange = (name) => (event) =>{
        this.setState({ error: "" });

        const value = name === "photo" ? event.target.files[0] : event.target.value;
        const fileSize = name === "photo" ? event.target.files[0].size : 0;

        this.userData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
            console.log(this.userData)
            update(userId, token, this.userData).then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    updateUser(data, () => {
                        this.setState({
                            redirectToProfile: true
                        });
                    });
                }
            });
        }
    };

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if(data.err){
                this.setState({redirectToProfile: true})
            }else {
                this.setState({id:data._id, name: data.name, email: data.email, error: "", about:data.about});
            }
        });
    };

    componentDidMount(){
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    isValid = () => {
        const {name, email,password, fileSize} = this.state;
        if(fileSize === 1000000){
            this.setState({error: "Photo size should be less than 1MB !"});
            return false
        }
        if(name.length === 0){
            this.setState({error: "Name is required !"});
            return false
        }
        //email@domain.com
        if(! /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)){
            this.setState({error: "A valid Email is required !"});
            return false
        }
        if(password.length >= 1 && password.length <= 3){
            this.setState({error: "Password must be at least 3 characters long !"});
            return false
        }
        return true;
    };

    signUpForm = (name, email, password, about)=>(
        <form>
            <div className={'form-group'}>
                <label className={'text-muted'} >Profile Photo</label>
                <input type={'file'} className={'form-control'} onChange={this.handleChange('photo')} accept={"image/*"}/>
            </div>
            <div className={'form-group'}>
                <label className={'text-muted'} >Name</label>
                <input type={'text'} className={'form-control'} onChange={this.handleChange('name')} value={name}/>
            </div>
            <div className={'form-group'}>
                <label className={'text-muted'} >E-mail</label>
                <input type={'email'} className={'form-control'} onChange={this.handleChange('email')} value={email}/>
            </div>
            <div className={'form-group'}>
                <label className={'text-muted'} >About</label>
                <textarea type={'text'} className={'form-control'} onChange={this.handleChange('about')} value={about}/>
            </div>
            <div className={'form-group'}>
                <label className={'text-muted'} >Password</label>
                <input type={'password'} className={'form-control'} onChange={this.handleChange('password')} value={password}/>
            </div>
            <button className={'btn btn-raised btn-primary'} onClick={this.clickSubmit}>Update</button>
        </form>
    );

    render() {
        const {id, name, email, about, password, redirectToProfile, error, loading} = this.state;
        if(redirectToProfile){
            return <Redirect to={`/user/${id}`} />;
        }

        // Get the latest image or set it to default avatar
        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : DefaultProfile;

        return (
            <div className={"container"}>
                <h2 className={"mt-5 mb-5"}>Edit Profile</h2>
                {/*validation*/}
                <div className={"alert alert-danger"} style={{display:error ? "":"none"}}>{error}</div>
                {loading ? <div className={"jumbotron text-center"}><h2>loading....</h2></div> : ""}
                <img src={photoUrl} alt={name}
                     style={{ height: "250px", width: "250px" }}
                     onError={i => (i.target.src = `${DefaultProfile}`)}
                />

                {this.signUpForm(name, email, password, about)}
            </div>
        )
    }

}

export default EditProfile;