import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'

class Auth extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }
    handleRegister = () => {
        const {username, password} = this.state;
        axios.post(`/auth/register`, {password, username})
        .then(res => {
            this.props.getUser(res.data.username, res.data.profile_pic)
            console.log(res.data)
            // console.log(res.data.username)
            // console.log(res.data.profile_pic)
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }
    handleLogin = () => {
        const {username, password} = this.state;
        axios.post(`/auth/login`, {username, password})
        .then(res => {
            console.log(res.data)
            this.props.getUser(res.data.username, res.data.profile_pic, res.data.user_id)
            // this.props.getUser()
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return (
            <div>
                <div className='input-fields'>
                    <div>
                        <span>Username:</span>
                        <input 
                            placeholder='Username'
                            value={this.state.username}
                            name='username'
                            onChange = {e => this.handleInput(e)}
                        />
                    </div>
                    <div>
                        <span>Password:</span>
                        <input 
                            placeholder='password'
                            value={this.state.password}
                            type='password'
                            name='password'
                            onChange={e => this.handleInput(e)}
                        />
                    </div>
                </div>
                <button onClick={this.handleLogin}>Login</button>
                <button onClick={this.handleRegister}>Register</button>
            </div>
        )
    }
}

export default connect(null, {getUser})(Auth)