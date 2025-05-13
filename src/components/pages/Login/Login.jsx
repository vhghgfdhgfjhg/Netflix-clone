import React, { useState } from "react";
import "./Login.css";
import logo from "../../../assets/logo.png";
import { login , signup } from "../../../firebase";
import netflix_spinner from '../../../assets/netflix_spinner.gif'

const Login = () => {

  const [signstate, setsignstate] = useState("Sign In");
  const [name,setname] = useState('');
  const [email,setemail] =useState('');
  const [password,setpassword] =useState('');
  const [loding,setloding] = useState(false);

  const user_auth = async(event)=>{
    event.preventDefault();
    setloding(true);
  if(signstate === 'Sign In'){
    await login(email,password);
  }else{
    await signup(name,email,password);
  }
  setloding(false);
  }

  return (
    loding ? <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div> : 
    <div className="login">
      <img src={logo} className="login-logo" />
      <div className="login-form">
        <h1>{signstate}</h1>
        <form>
          {signstate === "Sign Up" ? (
            <input value={name} onChange={(e)=>{setname(e.target.value)}} type="text" placeholder="Your name" />
          ) : (
            <></>
          )}
          <input value={email} onChange={(e)=>{setemail(e.target.value)}} type="email" placeholder="Email" />
          <input value={password} onChange={(e)=>{setpassword(e.target.value)}} type="Password" placeholder="Password" />
          <button onClick={user_auth} type="submit">{signstate}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signstate === "Sign In" ? (
            <p>
              New to Netflix? <span onClick={()=>{setsignstate('Sign Up')}}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have account? <span onClick={()=>{setsignstate('Sign In')}}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
