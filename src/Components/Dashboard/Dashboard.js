import React from 'react';
import Post from '../Post/Post'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Dashboard.css'

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
    handleToggle = () => {
        this.setState({userposts: !this.state.userposts})
    }
    componentDidMount(){
        this.getAllPosts()
    }

    getAllPosts = (id) => {
        const {userposts, search} = this.state
        axios.get(`/api/all-posts?userposts=${userposts}&search=${search}`)
        .then(res => {
            this.setState({posts: res.data})
            console.log(res.data)
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
        const {search, userposts, posts} = this.state

        const mappedPosts = posts
        .map((post, i) => (
            // console.log(posts[i].post_id),
            <div className='dash-page'>
                <Link to={`/post/${posts[i].post_id}`}>
                    <div className='dash-posts' key={i}>
                        <div>
                            <span className='dash-posts-title'>{posts[i].title}</span>
                        </div>

                        <div className='post-right-side'>
                            <span className='dash-posts-username'>{posts[i].username}</span>
                            <img 
                                className='dash-posts-img' 
                                src={posts[i].profile_pic}
                                alt=''
                            />
                        </div>
                    </div>
                </Link >
            </div>  
            
        ))
        // console.log(this.state.posts[0])
        // console.log(posts.post_id)
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
                    {userposts
                    ?(
                        <input
                            type='checkbox'
                            checked
                            onClick={this.handleToggle}
                        />  
                    )
                    :(
                        <input
                            type='checkbox'
                            onClick={this.handleToggle}
                        />  
                    )}
                        
                </div>

                {/* <div className='mapped-posts'> */}
                    {mappedPosts}
                {/* </div> */}
            </div>
        )
    }
}

// const mapStateToProps = reduxState => {
//     let {user_id} = reduxState
//     return {user_id}
// }

export default Dashboard;