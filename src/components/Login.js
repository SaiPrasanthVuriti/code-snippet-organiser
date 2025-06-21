
import { useState } from 'react';
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  passwordResetLink
} from '../service/authService';
import { useNavigate } from 'react-router-dom';
import MailIcon from '../icons/MailIcon';
import AvatarIcon from '../icons/AvatarIcon';
import PassIcon from '../icons/Pass-Icon';


const Login  = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [caution,setCaution] =useState(false);
  const [rstbtn,setRstbtn] =useState(false);
  const [errMsg,setErrMsg]=useState("");
  const navigate = useNavigate();

  const handleErrors = (err) => {
  switch (err.code) {
    case "auth/user-not-found":
      setErrMsg("User not found. Please check your email.");
      break;
    case "auth/wrong-password":
      setErrMsg("Wrong password. Please try again.");
      break;
    case "auth/invalid-credential":
      setErrMsg("Invalid email or password .");
      break;
    case "auth/invalid-email":
      setErrMsg("Invalid email format.");
      break;

    case "auth/weak-password":
      setErrMsg("Password should be at least 6 characters.");
      break;
    case "auth/email-already-in-use":
      setErrMsg("Email already in use. Try logging in.");
      break;
     case "":
      setErrMsg("Email already in use. Try logging in.");
      break;
     case "auth/network-request-failed":
      setErrMsg("Please check your Internet Connection")
      break;
    default:
      setErrMsg("Something went wrong. Please try again.");
  }
   console.log(err);
};
  const handleloginWithEmail = async (email,password) => {
   if(email!==""&&password!==""){
           try {     
              await loginWithEmail(email,password);
               navigate('/home');}
               catch(err){handleErrors(err);}
   }
   else{setCaution(true);}
  } 
 const handleloginWithGoogle = async () => {
   try{
     await loginWithGoogle();
    navigate('/home');
   }
   catch(err){
    handleErrors(err);
   }
  } 
   const handleregisterWithEmail = async (email,password) => {
   if(email!==""&&password!==""){
     try {await registerWithEmail(email,password);
    navigate('/home');}
    catch(err){
      handleErrors(err);
    }
   }
   else{setCaution(true);}
  } 

const handleRstPwd = async () =>{
   if (email!==""){
    try{ await passwordResetLink(email);
        setErrMsg("Password reset email sent! Check your inbox.");
    }
   catch(err){
     handleErrors(err);
   }
   }
   else{setCaution(true);}
  }
    return (
        <div className='login-window'>  
         <div className='login-head'><AvatarIcon/></div>
      <div>
     <div className='login-inputbox'>
         <MailIcon/>
        <input className='login-input'
        type="email"
        placeholder="Email"
        onChange={(e) => {setEmail(e.target.value);if(email!==""){setCaution(false);}}}
      />
     </div>
     <div className='login-inputbox'>
      <PassIcon/>
      <input className='login-input'
        type="password"
        placeholder="Password"
        onChange={(e) => {setPassword(e.target.value);if(password!==""){setCaution(false);}}}
      />
     </div>
      </div>
      {errMsg!==""&&<p className='error-message'>{errMsg}</p>}
      <div className='button-group'>
      <button className="auth-button"onClick={()=>{handleloginWithEmail(email, password)}}>Login</button>
      <button className="auth-button"onClick={()=>{handleregisterWithEmail(email, password)}}>Register</button>
      </div>
     {caution&&(email===""||password==="")&&<p>please enter email and password</p> }
     <div className='login-question'>
       <button className='forgot-password' onClick={()=>{handleloginWithGoogle()}}>Login with Google?</button>
      <button  className="forgot-password"onClick={()=>{setRstbtn(true)}}>forgot password?</button>
      
     </div>
     {rstbtn&&<button className='auth-button' onClick={()=>{handleRstPwd()}}>send link to reset password</button>}
   </div>
    )
}
export default Login;