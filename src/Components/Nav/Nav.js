import React from 'react';
import './Nav.css';
import {connect} from 'react-redux'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import { getUser } from '../../redux/reducer'

class Nav extends React.Component {
  
    componentDidMount() {
        axios.get(`/api/auth/me`)
            .then(res => {
                // this.props.getUser(res.data.username, res.data.profile_pic)
            })
    }
    getUserInfo = () => {
        axios.get(`/api/auth/me`)
            .then(res => {
                // this.props.getUser(res.data.username, res.data.profile_pic)
            })
    }
    handleLogout = () => {
        axios.post(`/auth/logout`)
        .then(() => {
            this.props.history.push('/')
        })
        .catch(err => console.log(err))
    }
    
    render() {
        // console.log(this.props)
        // console.log(this.props.username)
        return (
            <div className='nav-bar'>
                <div className='top-nav-buttons'>
                    <img 
                        className='profile-pic' 
                        src={this.props.profile_pic} 
                        alt={this.props.username}
                    />
                    <h5>{this.props.username}</h5>

                    <button 
                        onClick={() => this.props.history.push('/dashboard')}
                    > Home
                    </button>
                    <button 
                        onClick={() => this.props.history.push('/new')}
                    > New Post
                    </button>   
                </div>
                <div className='logout-button'>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {username, profile_pic} = reduxState
    return {username, profile_pic}
}

export default withRouter(connect(mapStateToProps, {getUser})(Nav))
