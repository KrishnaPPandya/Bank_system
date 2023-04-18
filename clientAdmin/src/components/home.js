import React, { useState } from 'react';
import { Newnav } from '../components/newnav';
import axios from 'axios';
//import Display from '../components/Display';

export const Home = () => {
    const [data, setData] = useState([])
    //add appropriate url
    React.useEffect(() => {
        const getData = async() => {
            const response = await axios.get(`/api/blogs/gt`)
                setData(response.data)
            }
            getData()
    }, [])
    
    //modify attributes to be displayed as per parameters mentioned
    return(
        <>
            <Newnav/>
            <br/>
            <div>
                <ul className="list-group">
                    {data && data.length > 0 ? (
                        data.map((item) => {
                            return (
                                <li key={item.email} className="list-group-item">
                                    <p>{item.blogContent}</p>
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