import React from 'react';
import {connect} from 'react-redux'
import './Form.css'
import axios from 'axios'

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    createPost = () => {
        const {title, img, content} = this.state
        axios.post(`/api/post/${this.props.user_id}`, { title, img, content})
        .then(() => {
            this.props.history.push('/dashboard')
        })
    }
    render() {
        console.log(this.props)
        const {title, image, content} = this.state
        return (
            <div className='new-post-form'>
                <h1>New Post</h1>
                <div className='input-container'>
                    <h4>Title: </h4>
                    <input
                        name='title'
                        value={title}
                        onChange={e => this.handleInput(e)} />
                </div>

            <div className='form-image'>
                <img className='image' src={image} alt={title} />
            </div>

            <div className='input-container'>
                <h4>Image URL: </h4>
                <input
                    value={image}
                    name='image'
                    type='text'
                    onChange={e => this.handleInput(e)} />
            </div>
            
            <div className='input-container'>
                <h4>Content:</h4>
                <input
                    value={content}
                    name='content'
                    onChange={e => this.handleInput(e)} />
            </div>
            <button onClick={this.createPost}>Post</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {user_id} = reduxState
    return {user_id}
};

export default connect(mapStateToProps)(Form)