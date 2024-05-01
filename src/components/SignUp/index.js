import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import '../SignIn/index.css'



export class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    role:'',
    errMsg: '',
    successMsg:'',
  };


  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleRoleChange=event=>{
    this.setState({role:event.target.value})
  }

  handleSubmittwo = async event => {
    event.preventDefault();
    const { name, email, password,role } = this.state;
    const userDetails = { name, email, password,role };
    const response = await fetch('https://epimax-server.onrender.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });
    const data = await response.json();
    if (response.ok) {
      this.onSuccess(data.token);
    } else {
      this.onFail(data.msg);
    }
  };

  onSuccess = token => {
    Cookies.set('jwt_token', token, { expires: 30 });
    this.setState({
        name: '',
        email: '',
        password: '',
        role:'',
        successMsg: 'Registration successful. You can now sign in.',
        errMsg: '' // Clear any previous error message
      });
  };

  onFail = errorData => {
    let errorMessage = '';
  if (Array.isArray(errorData)) {
    // If errorData is an array, join its elements into a string
    errorMessage = errorData.join(', ');
  } else if (typeof errorData === 'string') {
    // If errorData is a string, use it directly
    errorMessage = errorData;
  } else if (typeof errorData === 'object' && errorData.msg) {
    // If errorData is an object with a 'msg' property, use its value
    errorMessage = errorData.msg;
  } else {
    // If errorData is of an unexpected format, display a generic error message
    errorMessage = 'An unexpected error occurred';
  }
  this.setState({ errMsg: errorMessage })
  };



   

  render() {

    const { name, email, password,role, errMsg,successMsg } = this.state;
    return (
    <div className='login-container'>
        <div className="signin-container">
        <h1 className='login-heading'>Sign Up</h1>
        <form onSubmit={this.handleSubmittwo} className="login-form-container">
          <label htmlFor="name" className='login-label'>Name</label>
          <input
            value={name}
            onChange={this.handleNameChange}
            placeholder="Name"
            type="text"
            id="name"
            required
            className='login-input1'
          />
           <label htmlFor="email2" className='login-label'>Email</label>
          <input
            id="email2"
            value={email}
            onChange={this.handleEmailChange}
            placeholder="Email"
            type="email"
            required
            className='login-input2'
          />
           <label htmlFor="pswd" className='login-label'>Password</label>
          <input
            id="pswd"
            value={password}
            onChange={this.handlePasswordChange}
            placeholder="Password"
            type="password"
            required
            className='login-input2'
          />
          <label htmlFor="role" className='login-label'>Role</label>
          <input
            id="rle"
            value={role}
            onChange={this.handleRoleChange}
            placeholder="Role"
            type="text"
            required
            className='login-input2'
          />
          <button type="submit" className='sign-in-btn'>Sign Up</button>
          <p className='signup-text' >Already have an account? <span className='signup'><Link to="/login">SignIn here</Link></span>.</p>
          {errMsg && <p className="err-msg">{errMsg}</p>}
          {successMsg && <p className="sucs-msg">{successMsg}</p>}
        </form>
      </div>
    </div>
      
    );
  }
}
export default SignUp;