import React from 'react';
import Post from '../Post/Post.js'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Dashboard.css'

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            search: '',
            userposts: true,
            posts: [],
            pass: true
        }
    }
    handleSearch = (val) => {
        this.setState({search: val})
        // this.getAllPosts()
    }
    
    resetInput = () => {
        this.getAllPosts()
        this.setState({search: ''})
    }
    handleToggle = () => {
        this.getAllPosts()
        this.setState({userposts: !this.state.userposts})
    }
    componentDidMount(){
        this.getAllPosts()
    }

    getAllPosts = () => {
        const {userposts, search} = this.state
        axios.get(`/api/all-posts/?userposts=${userposts}&search=${search}`)
        .then(res => {
            this.setState({posts: res.data})
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    deletePost = (postid) => {
        axios.delete(`/api/post/${postid}`)
            .then(response => {
                this.setState({ posts: response.data })
            })
            .catch(error => console.log(error))
    }

    render() {
        const {search, userposts, posts} = this.state
        console.log(this.deletePost)

        const mappedPosts = posts
        .map((post, i) => (
            // console.log(posts[i].post_id),
            <div className='dash-page' key={i}>
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
            
        ));
        console.log(this.state)
        // console.log(posts.post_id)
        return (
            <div>
                {this.state.pass
                ?(
            <div>
                <input 
                    placeholder='Search by Title'
                    value={search}
                    onChange={e => this.handleSearch(e.target.value)}
                />
                <button onClick={this.getAllPosts}>Search</button>
                <button onClick={this.resetInput}> Reset </button>

                <div className='my-posts-checkbox'>
                    <span>My Posts</span>
                    {userposts
                    ?(
                        <input
                            type='checkbox'
                            // defaultChecked
                            onChange={this.handleToggle}
                        />  
                    )
                    :(
                        <input
                            type='checkbox'
                            onClick={this.handleToggle}
                        />  
                    )}
                        
                </div>
                    {mappedPosts}
                            
            </div>
            ):(
                <Post deletePost={this.deletePost} /> 
            )}
            </div>
        )
    }
}

// const mapStateToProps = reduxState => {
//     let {user_id} = reduxState
//     return {user_id}
// }

export default Dashboard;