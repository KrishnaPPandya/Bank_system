import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const Login = () => {
    
    let navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        console.log(`Clicked`);
        e.preventDefault();

        // const response = await fetch(`http://localhost:5000/api/auth/login`, {
        //     method: "POST",x
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({"email": email, "password": password})
        // })
        
        // const j = await response.json();
        const senddata = {
            
            email: email,
            password: password
        }
        axios.post('login.php',senddata).then((result)=>{
            console.log(result.data);
            const key = "valid";
            const  compare = key.localeCompare(result.data);
            console.log(compare);
            if(result.data === "valid")
            {
      
                localStorage.setItem('token', true);
                localStorage.setItem('email', email)
                navigate(`/`);

            }   
            else
            {
                console.log("here");
                alert('Invalid User');
            }
        })
        
        // console.log(j.success);

          

    }

    return(
        <div className="input-form">
                <form onSubmit={handleSubmit}> 
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="textFormControlInput1" required={true}></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="textFormControlInput1" required={true}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
        </div>
    );
};

export default Login;