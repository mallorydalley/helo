import React from 'react';

class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            img:'',
            content:'',
            username:'',
            profile_pic:''
        }
    }
    render() {
        return (
            <div>
                Post
            </div>
        )
    }
}

export default Post