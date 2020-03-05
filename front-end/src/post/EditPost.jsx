import React, {Component} from 'react';
import {updatePost, singlePost} from "./apiPost";
import {isAuthenticated} from "../auth";
import {Redirect} from "react-router-dom";

class EditPost extends Component{
    constructor(){
        super();
        this.state = {
            error: '',
            id: '',
            title: '',
            body: '',
            redirectToProfile: false,
            fileSize: 0,
            loading: false
        }
    }

    init = (postId) => {
        singlePost(postId).then(data => {
            if(data.err){
                this.setState({redirectToProfile: true})
            }else {
                this.setState({id:data._id, title: data.title, body: data.body, error: ""});
            }
        });
    };

    componentDidMount(){
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
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
            const postId = this.state.id;
            const token = isAuthenticated().token;
            console.log(this.postData);
            updatePost(postId, token, this.postData).then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    console.log("update post: ", this.state);
                    this.setState({loading: false, title: "", body:"", photo:"", redirectToProfile: true})
                }
            });
        }
    };


    editPostForm = (title, body)=>(
        <form>
            <div className={'form-group'}>
                <label className={'text-muted'} >Post Photo</label>
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
            <button className={'btn btn-raised btn-primary'} onClick={this.clickSubmit}>Edit Post</button>
        </form>
    );

    render() {
        const {title, body, redirectToProfile} = this.state;

        if(redirectToProfile){
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }

        return(
            <>
                <h2 className={"m-5"}>{title}</h2>
                {this.editPostForm(title, body)}

            </>
        );
    }
}

export default EditPost;