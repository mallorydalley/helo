import React from 'react';
import './App.css';
// import Auth from './Components/Auth/Auth'
// import Dashboard from './Components/Dashboard/Dashboard'
// import Form from './Components/Form/Form'
// import Post from './Components/Post/Post'
import Nav from './Components/Nav/Nav'
import routes from './routes'
import {withRouter} from 'react-router-dom'

function App(props) {
  console.log(props)
  return (
    <div className="App">   

    {props.location.pathname === '/'
    ? (<>
        {routes}
      </>)
    : (<>
        <Nav />
        {routes}
      </>)
    }

    </div>
  );
}

export default withRouter(App);
