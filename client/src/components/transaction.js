import React from "react";
import {useNavigate}  from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Transaction = () =>{

    let navigate = useNavigate();

    const [amtDefine, setAmtDefine] = React.useState(0)
    const [userAmount, setUserAmount] = React.useState(0)
    const state1={
        transaction: [],
        stat: 0
    }
    const state2 = {
        transaction: [],
        stat:0
    }
    
    const senddata = {
        email: localStorage.getItem('email'),
        amount: userAmount
    };

    const getDets = async() => {
        axios.get('gettransaction.php').then(result=>result.data).then((data)=>{

            for(let i=0;i<data.length;i++)
            {
                
                // console.log("email1");
                if(data[i].email1 === senddata.email)
                {
                    // console.log(data[i]);
                    if(state1.stat===0)
                    {
                    state1.transaction.push(data[i]);

                    }
                }
                //console.log("email2");

                if(data[i].email2 === senddata.email)
                {
                    
                    // console.log(data[i]);
                    if(state2.stat===0)
                    {
                        state2.transaction.push(data[i]);

                    }
                }
            }
            state1.stat=1;
            state2.stat=1;

    
        })
        navigate("/transaction");
    }
    useEffect(() => {
        // 👇️ only runs once
        console.log('useEffect ran');
        let user1 = getDets();
        console.log(userAmount);
    
      }, []);
    
        


    return(
        <div className="container">
            {/* <h1 className="page-header text-center">Transactions </h1>
            <div className="col-md-4">
                <div className="panel panel-primary">
                    <div className="panel-heading"><span className="glyphicon glyphicon-user"></span></div>
                </div>
            </div> */}
            <div className="col-md-8">
                <h3>Transactions</h3>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Sender</th>
                            <th>Reciever</th>
                            <th>Amount</th>

                        </tr>
                    </thead>
                    
                        {/* {state1.transaction.map((transaction,index) => (
                           <tr key={index}>
                            <td>{transaction.id}</td>
                            <td>{transaction.email1}</td>
                            <td>{transaction.email2}</td>
                            <td>{transaction.amount}</td>

                           </tr> 
                        ))} */}
                        
                        
                        {state1.transaction.map((item) => {
                            console.log(item.id);
                            return (
 
                            <tbody key={item}>
                                <td>{item.id}</td>
                                <td>{item.email1}</td>
                                <td>{item.email2}</td>
                                <td>{item.amount}</td>
                            </tbody>

                            )
                        })}
       
                        
                    

                </table>
            </div>
        </div>
        )
}

export default Transaction;
