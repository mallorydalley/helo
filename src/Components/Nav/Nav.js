import React from 'react';
import {connect} from 'react-redux'

class Nav extends React.Component {
    constructor(props){
        super(props)
        
    }
    render() {
        // console.log(props)
        return (
            <div>
                <button>Home</button>
                <button>New Post</button>
                <button>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Nav)
