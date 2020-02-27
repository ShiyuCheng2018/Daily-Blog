import React, {Component} from 'react';
import DefaultProfile from '../images/user.png';
import {Link} from 'react-router-dom';


class ProfileTabs extends Component{
    render() {
        const {following, followers} = this.props;
        return(
            <>
                <div className={"row"}>
                    <div className={"col-md-4"}>
                        <h3 className={"text-primary"}>Followers</h3>
                        <hr/>
                        <div className={"row"}>
                        {following.map((person, i) =>{
                            return (<div key={i}>
                                        <div className={" bg-danger m-3"}>
                                            <Link to={`/user/${person._id}`} className={"float-left"}>
                                                <img
                                                    className={"mx-auto"}
                                                    height={"50px"}
                                                    src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                                     onError={i=>(i.target.src = `${DefaultProfile}`)}
                                                     alt={person.name}/>
                                                <div>
                                                    <h5>{person.name}</h5>
                                                </div>
                                            </Link>
                                        </div>
                                </div>)
                        })}
                        </div>
                    </div>
                    <div className={"col-md-4 ml-auto"}>
                        <h3 className={"text-primary"}>Following</h3>
                        <hr/>
                        <div className={"row"}>
                            {followers.map((person, i) =>{
                                return (<div key={i}>
                                    <div className={" bg-danger m-3"}>
                                        <Link to={`/user/${person._id}`} className={"float-left"}>
                                            <img
                                                className={"mx-auto"}
                                                height={"50px"}
                                                src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                                onError={i=>(i.target.src = `${DefaultProfile}`)}
                                                alt={person.name}/>
                                            <div>
                                                <h5>{person.name}</h5>
                                            </div>
                                        </Link>
                                    </div>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export  default  ProfileTabs;