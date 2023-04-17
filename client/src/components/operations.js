import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Operations = () => {

    let navigate = useNavigate();

    const [amtDefine, setAmtDefine] = React.useState(0)
    const [userAmount, setUserAmount] = React.useState(0)
    let stat  = 0;
    const senddata = {
        email: localStorage.getItem('email'),
        amount: userAmount
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
        console.log(stat);
        axios.get('getdata.php').then(result=>result.data).then((data)=>{
            // console.log(data);
            // if(result.data !=="valid")
            // {
            //  alert(result.data);

            // }   
            // else
            // {
                let val = 0;
                if(stat===0)
                {
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
                }

                setUserAmount(val)
                navigate(`/`);
                return val;
               
            //}
        })

    }
    if(stat===0)
    {
        let user1 = getDets();
        stat = 1;
    }
    
    const handleWithdraw = async(e) => {
        if (userAmount < amtDefine)
        {
            alert("Insufficient Balance!!!")
        }else{
        //     const response = await fetch(`http://localhost:5000/api/ops/modifyuser`, {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "auth-token": localStorage.getItem('token'),
        //         },
        //         body: JSON.stringify({"email": localStorage.getItem('email'), "amount": amtDefine, "status": "W"}),
        //     });
        //     const j = await response.json()
        //     console.log(j)
        //     if (j.success === "1"){
        //         alert(`Withdrawal successful!`)
        //         setAmtDefine(0)
        //         stat = 0;
        //         navigate("/")
        //     }else{   
        //         alert(`Withdrawal Error!`)
        //         setAmtDefine(0)
        //         navigate("/")
        //     }
        let amount1 = parseInt(senddata.amount);
        let amount2 = parseInt(amtDefine);
        let amount3 = amount1 - amount2;
        senddata.amount = amount3;
        axios.post('update.php',senddata).then((result)=>{
            // console.log(result.data);
            // const key = "valid";
            // const  compare = key.localeCompare(result.data);
            // console.log(compare);
            console.log(result.data)
 
                alert(result.data)
                setAmtDefine(0)
                stat = 0;
                navigate("/")


        })

        }
    }

    const handleDeposit = async(e) => {
        // senddata.amount = senddata.amount +amtDefine;
        let amount1 = parseInt(senddata.amount);
        let amount2 = parseInt(amtDefine);
        let amount3 = amount1 + amount2;
        senddata.amount = amount3;

        // const response = await fetch(`http://localhost:5000/api/ops/modifyuser`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "auth-token": localStorage.getItem('token'),
        //     },
        //     body: JSON.stringify({ "email": localStorage.getItem('email'), "amount": amtDefine,"status": "D"}),
        // });

        // const j = await response.json()
        axios.post('update.php',senddata).then((result)=>{
            // console.log(result.data);
            // const key = "valid";
            // const  compare = key.localeCompare(result.data);
            // console.log(compare);
            console.log(result.data)
 
                alert(result.data)
                setAmtDefine(0)
                stat = 0;
                navigate("/")


        })

    }
    
    return(
        <div className="input-group">
            <label>Amount at Present: {`${userAmount}`}</label><br/>
            <label>Enter amount: </label>
            <input type="number" className="input-control" value={amtDefine} onChange={(e) => setAmtDefine(e.target.value)} id="textFormControlInput1" required={true}></input><br/>

            <button type="button" className="btn btn-success" onClick={handleDeposit}>Deposit</button>
            <button type="button" className="btn btn-danger" onClick={handleWithdraw}>Withdraw</button>
        </div>
    )
};

export default Operations;