import React, { useState } from 'react';

import axios from 'axios';
//import Display from '../components/Display';

const Home = () => {
    const [data, setData] = useState([])
    //add appropriate url
    React.useEffect(() => {
        const getData = async() => {
            const response = await axios.get(`getdata.php`)
                setData(response.data)
            }
            getData()
    }, [])
    
    //modify attributes to be displayed as per parameters mentioned
    return(
        <>
            
            <br/>
            <div>
                <ul className="list-group">
                    <li><p>Email</p></li>
                    {data && data.length > 0 ? (
                        data.map((item) => {
                            console.log()
                            return (
                                <li key={item.Email} className="list-group-item">
                                    <p>{item.Email}</p>
                                </li>
                            );
                        })
                    ) : (
                        <li>No Logs left</li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default Home;