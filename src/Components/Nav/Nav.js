import React from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class Nav extends React.Component {
    constructor(props){
        super(props)
        
    }
    handleLogout = () => {
        axios.get(`/api/logout`)
        .then(() => {
            this.props.history.push('/')
        })
        .catch(err => console.log(err))
    }
    render() {
        // console.log(props)
        return (
            <div>
                <button>Home</button>
                <button>New Post</button>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps)(Nav))
