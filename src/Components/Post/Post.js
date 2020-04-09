import React from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import './Post.css';

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
    componentDidMount(){
        this.getPost()
    }

    getPost(){
        axios.get(`/api/post/${this.props.match.params.postid}`)
        .then(result => {
            console.log(result.data)
            const {title, img, content, username, profile_pic} = result.data[0]
            this.setState({ title, img, content, username, profile_pic})
        })
        .catch(err => console.log(err))
    }

    render() {
        console.log(this.session) 
        console.log(this.state.username)
        console.log(this.props.deletePost)
        const { title, img, content, username, profile_pic } = this.state
        const {postid} = this.props.match.params
        return (
            <div className='post-page'>
                <div className='post-container'>
                    <div className='left-side'>
                        <p className='post-title'>{title}</p>
                        <img 
                        className='post-img' src={img} alt=''/>
                    </div>
                    <div className='right-side'>
                        <div className='user-info'>
                            <span>{username}</span>
                            <img 
                                className='profile-pic' 
                                src={profile_pic} alt='' />
                        </div>

                        <p className='content'>{content}</p>
                    
                    {/* Gotta make conditional rendering for Delete button*/}
                    {/* {user_id = this.props.user_id} */}
                    {/* {username === this.props.username} */}
                        <button onClick={() => this.props.deletePost(postid)}>Delete Post</button>
                    </div>
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