import React, {Component} from 'react';

class EditPost extends Component{
    render() {
        return(
            <>
                <h2>Edit post</h2>
                {this.props.match.params.postId} 
            </>
        );
    }
}

export default EditPost;