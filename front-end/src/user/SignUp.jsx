import React, {Component} from "react";

class SignUp extends Component{
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: ""
        }
    }

    handleChange = (name) => (event) =>{
        this.setState({[name]: event.target.value})
    };

    render(){
        const {name, email, password} = this.state;
        return (
            <div className={'container'}>
                <h2 className={'mt-5 mb-5'}>Sign up</h2>
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
                        <input type={'password'} className={'form-control'} onChange={this.handleChange('passWord')} value={password}/>
                    </div>
                    <button className={'btn btn-raised btn-primary'}>Submit</button>
                </form>
            </div>

        )
    }
}

export default SignUp;