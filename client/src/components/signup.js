import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import React from "react";

const Signup = () => {

    let navigate = useNavigate();
    //create individual changing components
    //const [credentials, setCredentials] = useState({name: "", email: "", password: "", secPass: ""});
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [secPass, setSecPass] = useState("")

    const handleSubmit = async(e) => {
        console.log(`Clicked`);
        e.preventDefault();
        // const senddata={
        //     Name: name;
        // }
        if (password === secPass){
            // const response = await fetch(`insert.php`, {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     body: ({"name": name, "email": email , "password": password}),
            // });
            
            const senddata = {
                name: name,
                email: email,
                password: password
            }
            axios.post('insert.php',senddata).then((result)=>{
                console.log(result.data);
                if(result.data !=="valid")
                {
                 alert(result.data);
    
                }   
                else
                {
                    localStorage.setItem('token', true);
                    localStorage.setItem('email', email)
                    navigate(`/`);
                }
            })
            
            
            navigate("/");
        }
        else{
            alert("Please properly confirm password!");
        }
        
    }

    // const onChange = (e) => {
    //     setCredentials({...credentials, [e.target.name]: e.target.value});
    // };

    return (
            <div className="input-form">
                <form onSubmit={handleSubmit}> 
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e)=> setName(e.target.value)} id="textFormControlInput1" required={true}></input>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="textFormControlInput1" required={true}></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="textFormControlInput1" required={true}></input>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" value={secPass} onChange={(e) => setSecPass(e.target.value)} id="textFormControlInput1" required={true}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
    );
};

export default Signup;