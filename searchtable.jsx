import React, {useEffect, useState} from 'react';

export default function Searchfilter(){
    const[data, setData] = useState([]);
    const[searchApiData,setSearchApiData] = useState([]);
    const [filterVal, setFilterVal] = useState('');
    useEffect(()=>{
        const fetchData=()=>{
            fetch()
            .then(response=>response.json())
            .then(json =>{
                setData(json)
                setSearchApiData(json)
            })
        }
        fetchData();
    },[])
    const handleFilter=(e)=>{
        if(e.target.value == ''){
            setData(searchApiData)

        }else{
           const filterResult= searchApiData.filter(item=> item.name.toLowerCase().include(e.target.value.toLowerCase()))
           if(filterResult.length>0){
            setData(filterResult)
           }else{
            setData([{"name":"No Result"}])
           }
           
        }
        setFilterVal(e.target.value)
            
    }
    return(
        <div>
            <div>
                <input placeholder='Search' value={filterVal} onInput={(e)=>handleFilter(e)}></input>
            </div>
            <table>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>
                    Phone
                </th>
                {
                    data.map(item=>{
                        return(
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}