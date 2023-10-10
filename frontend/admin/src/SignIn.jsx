import React from 'react';
import './Login.css';
import {Link} from 'react-router-dom';

const SignIn = () => {
  return (
    <div>
      <div className="login-box">
        <h2>LOGIN</h2>
        <form>
            <div className="user-box">
                <input type="text" name="" required=""/>
            <label>Username</label>    
            </div>
            <div className="user-box">
                <input type="password" name="" required=""/>
                <label>Password</label>
            </div>
            <Link to="/components/dashboard" className='lnk'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
            </Link>
            {/* <!--That's all--> */}
        </form>
    </div>
    </div>
  )
}

export default SignIn
