import React from 'react';
import axios from 'axios';

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
        axios.post(`/api/register`, {username, password})
        .then(res => {
            this.props.history.push('/dashboard')
        })
    }
    handleLogin = () => {
        const {username, password} = this.state;
        axios.post(`/api/login`, {username, password})
        .then(res => {
            this.props.history.push('/dashboard')
        })
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
                            name='username'
                            onChange = {e => this.handleInput(e)}
                        />
                    </div>
                    <div>
                        <span>Password:</span>
                        <input 
                            placeholder='password'
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

export default Auth