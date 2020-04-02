import React from 'react';
import Post from '../Post/Post'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            search: '',
            userposts: true,
            posts: []
        }
    }
    handleSearch = (val) => {
        this.setState({search: val})
    }
    resetInput = () => {
        this.setState({search: ''})
    }
    
    componentDidMount(){
        this.getAllPosts()
    }

    getAllPosts = (id) => {
        const {userposts, search} = this.state
        axios.get(`/api/all-posts/${this.props.user_id}/?userposts=${userposts}&search=${search}`)
        .then(res => {
            this.setState({posts: res.data})
        })
        .catch(err => console.log(err))
    }

    deletePost = (post_id) => {
        axios.delete(`/api/post/${post_id}`)
        .then(response => {
            this.setState({ posts: response.data })
        })
        .catch(err => console.log(err))
    }

    render() {
        // console.log(this.props)
        const {search, userposts, posts} = this.state
        const mappedPosts = posts.map((post, i) => (
            <Link to='/post/:postid'>
                <Post 
                    key={i} 
                    post={post} 
                    title={post.title}
                    img={post.img}
                    content={post.content}
                    deletePost={this.deletePost}
                />
            </Link>
        ))
        return (
            <div>
                <input 
                    placeholder='Search by Title'
                    value={search}
                    onChange={e => this.handleSearch(e.target.value)}
                />
                <button>Search</button>
                <button onClick={this.resetInput}> Reset </button>

                <div className='my-posts-checkbox'>
                    <span>My Posts</span>
                    <input 
                        type='checkbox'
                    />      
                </div>
                {mappedPosts}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    let {user_id} = reduxState
    return {user_id}
}

export default connect(mapStateToProps)(Dashboard)