import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Transfer = () => {

    let navigate = useNavigate();

    const [amtDefine, setAmtDefine] = React.useState(0)
    const [receiverEmail, setReceiverEmail] = React.useState('');
    const [userAmount, setUserAmount] = React.useState(0)
    let stat =0;
    const senddata = {
        email: localStorage.getItem('email'),
        amount: userAmount
    }
    const senddata2 = {
        email: receiverEmail,
        amount: 0
    }  
    const transaction = {
        email1: senddata.email,
        email2: senddata2.email,
        amount: amtDefine
    }

      
    const getDets = async() => {
        // let response = await fetch(`http://localhost:5000/api/ops/getuserdets`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "auth-token":   localStorage.getItem('token'),
        //         "email": localStorage.getItem('email'),
        //     }
        // });
        // let val = await response.json();
        // setUserAmount(val.amount)
        // return val;
                // let response = await fetch(`http://localhost:5000/api/ops/getuserdets`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "auth-token":   localStorage.getItem('token'),
        //         "email": localStorage.getItem('email'),
        //     }
        // });
        
        axios.get('getdata.php').then(result=>result.data).then((data)=>{
            // console.log(data);
            // if(result.data !=="valid")
            // {
            //  alert(result.data);

            // }   
            // else
            // {
                let val = 0;
             
                    for(let i =0;i<data.length;i++)
                    {
                        // console.log(data[i]);
                        if(data[i].Email===senddata.email)
                        {
                            val = data[i].amount;
                            console.log(val);
                            stat = 1;
                            break;
                        }
                    }
                

                setUserAmount(val)
                navigate(`/transfer`);
                return val;

               
            //}
        })
    }
        useEffect(() => {
        // 👇️ only runs once
        console.log('useEffect ran');
        let user1 = getDets();
        console.log(userAmount);
    
      }, []);
    //let user1 = getDets();
    
    const getDets2 = async() => {
        // let response = await fetch(`http://localhost:5000/api/ops/getuserdets`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "auth-token":   localStorage.getItem('token'),
        //         "email": localStorage.getItem('email'),
        //     }
        // });
        // let val = await response.json();
        // setUserAmount(val.amount)
        // return val;
                // let response = await fetch(`http://localhost:5000/api/ops/getuserdets`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "auth-token":   localStorage.getItem('token'),
        //         "email": localStorage.getItem('email'),
        //     }
        // });
        console.log(senddata2.email);
        axios.get('getdata.php').then(result=>result.data).then((data)=>{
            // console.log(data);
            // if(result.data !=="valid")
            // {
            //  alert(result.data);

            // }   
            // else
            // {
                let val = 0;
                
                    for(let i =0;i<data.length;i++)
                    {
                        console.log(data[i]);
                        if(data[i].Email===senddata2.email)
                        {
                            val = data[i].amount;
                            console.log(val);
                            stat = 1;
                            break;
                        }
                    }
                

                senddata2.amount = val;
                console.log("reciver: ",senddata2.amount);
                let Amount1 = parseInt(senddata2.amount);
                let Amount2 = parseInt(amtDefine);
                
                let Amount3 = Amount1 + Amount2;
                senddata2.amount = Amount3;
                console.log(senddata2.amount);
                axios.post('update.php',senddata2).then((result)=>{
                    // console.log(result.data);
                    // const key = "valid";
                    // const  compare = key.localeCompare(result.data);
                    // console.log(compare);
                    console.log(result.data)
         
                        // alert(result.data)

        
        
                })
                axios.post('transaction.php',transaction).then((result)=>{
                    
                    if(result.data === "valid")
                    {   
                        setAmtDefine(0);
                        navigate(`/transfer`);
                    }   
                    else
                    {
                        console.log("here");
                        setAmtDefine(0);
                        navigate('/transfer');
                        alert('Invalid User');
                    }
                })
                
                // navigate(`/transfer`);
                
               
            //}
        })
    }

   
    const handleTransaction = async(e) => {
        console.log(userAmount); 
        console.log(amtDefine);
        let amount1 = parseInt(senddata.amount);
        let amount2 = parseInt(amtDefine);
        if (amount2 > amount1)
        {
            alert("Insufficient Balance")
        }else{
            // const response1 = await fetch(`http://localhost:5000/api/ops/modifyuser`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "auth-token": localStorage.getItem('token'),
            //     },
            //     body: JSON.stringify({"email": localStorage.getItem('email'), "amount": amtDefine, "status": "W"}),
            // });
            
            let amount3 = amount1 - amount2;
            senddata.amount = amount3;
            axios.post('update.php',senddata).then((result)=>{
                // console.log(result.data);
                // const key = "valid";
                // const  compare = key.localeCompare(result.data);
                // console.log(compare);
                console.log(result.data)
     
                // alert(result.data)
                let user1 = getDets();
                let user2 = getDets2();

                   
                    
            })


        // const response = await fetch(`http://localhost:5000/api/ops/modifyuser`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "auth-token": localStorage.getItem('token'),
        //     },
        //     body: JSON.stringify({ "email": localStorage.getItem('email'), "amount": amtDefine,"status": "D"}),
        // });

        // const j = await response.json()


            // const response2 = await fetch(`http://localhost:5000/api/ops/modifyuser`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "auth-token": localStorage.getItem('token'),
            //     },
            //     body: JSON.stringify({"email": receiverEmail, "amount": amtDefine, "status": "D"}),
            // });

            // const j1 = await response1.json(), j2 = await response2.json()

            // if (j1.success === "1" && j2.success === "1")   
            // {
            //     alert("Transaction Successful!!!")
            //     console.log("Success")
            //     setAmtDefine(0)
            //     setReceiverEmail('')
            //     navigate("/transfer")
            // }
            // else
            // {
            //     alert("Transaction Failed")
            //     const response1 = await fetch(`http://localhost:5000/api/ops/modifyuser`, {
            //         method: "PUT",
            //         headers: {
            //             "Content-Type": "application/json",
            //             "auth-token": localStorage.getItem('token'),
            //         },
            //         body: JSON.stringify({"email": localStorage.getItem('email'), "amount": amtDefine, "status": "D"}),
            //     });

            //     const j1 = await response1.json()
            //     if (j1.success === "1") console.log("rectification done")
                
            //     console.log("Error at our end")
            // }
        }
    }

    return(
        <div className="input-group">
            <label>Amount at present: {`${userAmount}`}</label><br/>

            <label>Enter amount: </label>
            <input type="number" className="input-control" value={amtDefine} onChange={(e) => setAmtDefine(e.target.value)} id="textFormControlInput1" required={true}></input><br/>

            <label>Enter receiver's EmailId: </label>
            <input type="email" className="input-control" value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} id="textFormControlInput1" required={true}></input><br/>

            <button type="button" className="btn btn-success" onClick={handleTransaction}>Transfer</button>
        </div>
    )
};

export default Transfer;