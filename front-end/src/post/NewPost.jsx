import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {create} from "./apiPost";
import {Redirect} from 'react-router-dom';
import DefaultProfile from '../images/user.png';

class NewPost extends Component{
    constructor(){
        super();
        this.state = {
            title: "",
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false
        }
    }
    handleChange = (name) => (event) =>{
        this.setState({ error: "" });

        const value = name === "photo" ? event.target.files[0] : event.target.value;
        const fileSize = name === "photo" ? event.target.files[0].size : 0;

        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            console.log(this.postData);
            create(userId, token, this.postData).then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    console.log("create post: ", this.state);
                    this.setState({loading: false, title: "", body:"", photo:""})
                }
            });
        }
    };

    componentDidMount(){
        this.postData = new FormData();
        this.setState({user: isAuthenticated().user})
    }

    isValid = () => {
        const {title, body, fileSize} = this.state;
        if(fileSize === 1000000){
            this.setState({error: "Photo size should be less than 1MB !", loading: false});
            return false
        }
        if(title.length === 0){
            this.setState({error: "Title is required !", loading: false});
            return false
        }

        if(body.length < 20){
            this.setState({error: "The length of article must be at least 20 characters long !", loading: false});
            return false
        }
        return true;
    };

    newPostForm = (title, body)=>(
        <form>
            <div className={'form-group'}>
                <label className={'text-muted'} >Profile Photo</label>
                <input type={'file'} className={'form-control'} onChange={this.handleChange('photo')} accept={"image/*"}/>
            </div>
            <div className={'form-group'}>
                <label className={'text-muted'} >Title</label>
                <input type={'text'} className={'form-control'} onChange={this.handleChange('title')} value={title}/>
            </div>
            <div className={'form-group'}>
                <label className={'text-muted'} >Your Content</label>
                <textarea type={'text'} className={'form-control'} onChange={this.handleChange('body')} value={body}/>
            </div>
            <button className={'btn btn-raised btn-primary'} onClick={this.clickSubmit}>Create Post</button>
        </form>
    );

    render() {
        const { title, body, error, loading} = this.state;
        return (
            <div className={"container"}>
                <h2 className={"mt-5 mb-5"}>Create a new post</h2>
                {/*validation*/}
                <div className={"alert alert-danger"} style={{display:error ? "":"none"}}>{error}</div>
                {loading ? <div className={"jumbotron text-center"}><h2>loading....</h2></div> : ""}

                {this.newPostForm(title, body)}
            </div>
        )
    }

}

export default NewPost;