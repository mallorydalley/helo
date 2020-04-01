import React from 'react';
import {connect} from 'react-redux'
import './Form.css'

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            image: '',
            content: ''
        }
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const {title, image, content} = this.state
        return (
            <div className='new-post-form'>
                <h1>New Post</h1>
                <div className='input-container'>
                    <p>Title: </p>
                    <input
                        name='title'
                        value={title}
                        onChange={e => this.handleInput(e)} />
                </div>

            <div className='form-image'>
                <image className='image' src={image} alt={title} />
            </div>

            <div className='input-container'>
                <p>Image URL: </p>
                <input
                    value={image}
                    name='image'
                    onChange={e => this.handleInput(e)} />
            </div>
            
            <div className='input-container'>
                <p>Content:</p>
                <input
                    value={content}
                    name='content'
                    onChange={e => this.handleInput(e)} />
            </div>
            <button>Post</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Form)