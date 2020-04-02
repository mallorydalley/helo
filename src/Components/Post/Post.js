import React from 'react';
import axios from 'axios'
import {connect} from 'react-redux'

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

    getPost = () => {
        axios.get(`/api/post/${this.props.match.params.post_id}`)
        .then(res => {
            const {title, img, content, username, profile_pic} = res.data
            this.setState({ title, img, content, username, profile_pic})
        })
    }
    render() {
        console.log(this.props)
        const { title, img, content, username, profile_pic } = this.state
        return (
            <div>
                <div className='post-container'>
                    <div className='left-side'>
                        <span>{title}</span>
                        <img src={img} alt=''/>
                    </div>
                    <div className='right-side'>
                        <div className='user-info'>
                            <span>{username}</span>
                            <img src={profile_pic} alt='' />
                        </div>
                        <p>{content}</p>
                    </div>
                    {/* Gotta make conditional rendering for Delete button*/}
                    {/* {user_id = this.props.user_id} */}

                    <button onClick={this.props.deletePost}>Delete Post</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    let { user_id } = reduxState
    return { user_id }
}

export default connect(mapStateToProps)(Post)