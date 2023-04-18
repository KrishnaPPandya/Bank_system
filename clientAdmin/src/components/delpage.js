//Draft this page after a while
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import Newnav from '../components/newnav';

//make changes here to make page responsive
export const Delpage = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([])
    
    //add appropriate url
    React.useEffect(() => {
        const getData = async() => {
            const response = await axios.get(`/api/blogs/gt`)
                setData(response.data)
            }
            getData()
    }, [])

    //modify function to add email in body as per the php method defined
    const handleDelete = (id) => {
        axios.delete(`/api/blogs/del/${id}`)
             .then((res) => {
                    if (res.data)
                    {
                        console.log(res);
                    }
                })
             .catch((err) => console.log(err));      
            
            navigate("/");
    }

    //modify attributes to be displayed as per parameters mentioned
    //Here, upon clicking the item in the list, the object's email will
    //be sent to handleDelete function. 
    return(
        <>
            <Newnav/>
            <ul className="list-group">
                {data && data.length > 0 ? (
                    data.map((item) => {
                        return (
                            <li key={item.email} onClick = {() => handleDelete(item._id)} className="list-group-item">
                                <p>{item.blogContent}</p>
                            </li>
                        );
                    })
                ) : (
                    <li>No logs left</li>
                )}
            </ul>
        </>
    )
}

export default Delpage;