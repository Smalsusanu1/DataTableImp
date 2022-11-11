import * as React from 'react';
import styles from './Gettingdata.module.scss';
import { IGettingdataProps } from './IGettingdataProps';
import { IGettingdataState } from './IGettingdataState';
import "bootstrap/dist/css/bootstrap.min.css";
import { Input } from "semantic-ui-react";


// export interface IGettingdataState{    
//   items:[    
//         {    
//           "EmployeeName": "",    
//           "EmployeeId": "",    
//           "Designation":"",    
//           "Email":""  ,
//           "Title":"",
//           "PhoneNumber":"",
//         }]    
// }    
const[data, setData] = React.useState([]);
const[searchApiData,setSearchApiData] = React.useState([]);
const [filterVal, setFilterVal] = React.useState('');
const [search, setSearch]: [string, (search: string) => void] = React.useState("");
export default class Gettingdata extends React.Component<IGettingdataProps,IGettingdataState, {}> {



  // handleChange: (event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;





  public constructor(props: IGettingdataProps, state: IGettingdataState){   
  

  //   React.useEffect(()=>{
  //     const fetchData=()=>{
  //         fetch('')
  //         .then(response=>response.json())
  //         .then(json =>{
  //             setData(json)
  //             setSearchApiData(json)
  //         })
  //     }
  //     fetchData();
  // },[])

    super(props);    
    this.state = {    
      items: [    
        {    
          "EmployeeName": "",    
          "EmployeeId": "",    
          "Designation":"",    
          "Email":""  ,
          "Title":"",
          "PhoneNumber":"",
        }    
      ]    
    };    
  }    
    
  public componentDidMount(){    
    this.GetListData();
}   


GetListData() {
  var reactHandler = this;

  var getRequest = new XMLHttpRequest();
  getRequest.open('GET', "https://smalsusinfolabs.sharepoint.com/sites/Dashboard/Anubhav/_api/lists/getbyid('7abd66f6-8c75-46bf-ae12-fb6cc05effb9')/items?$select=Id,Title,Email,Designation,PhoneNumber&$filter=(Email ne null)", true);
  getRequest.setRequestHeader("Accept", "application/json");

  getRequest.onreadystatechange = function () {

    if (getRequest.readyState === 4 && getRequest.status === 200) {
      var result = JSON.parse(getRequest.responseText);
      setData(result)
      setSearchApiData(result)

      reactHandler.setState({
        items: result.value
      });
    }
    else if (getRequest.readyState === 4 && getRequest.status !== 200) {
      console.log('Error Occurred !');
    }
  };
  getRequest.send();
}



  public render(): React.ReactElement<IGettingdataProps> {
    const handleChange = (e: { target: { value: string; }; }) => {
      setSearch(e.target.value);
    };
  
    return (
<div className="container" >

<div className="text-center mb-3">
 <h1>Employee List Data</h1>
    </div>
    <div> <input type="text" onChange={handleChange} /></div>
    
  <table className="table table-striped table-bordered table-sm">
    <thead>
      <tr>
         
        <th className="th-sm">
            <input type='search' placeholder='EmployeeName' id='emname' ></input>
        </th>
        <th className="th-sm">
        <input type='search' placeholder='Email' id='eemail' ></input>
        </th>
        <th className="th-sm">
        <input type='search' placeholder='Designation' id='edesignation' ></input>
        </th>
        <th className="th-sm">
        <input type='search' placeholder='Mobile Number' id='emnumber' ></input>
        </th>
      </tr>
    </thead>
   
    {this.state.items.map((item) => {
   if (search == "" || item.Title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
      return (
        <tbody>
          <tr className="striped bordered hover">
            <td >{item.Title}</td>
            <td >{item.Email}</td>
            <td>{item.Designation}</td>
            <td>{item.PhoneNumber}</td>
          </tr>
        </tbody>
   
      );
            } })}
    </table>


</div>
      
    );
  }
}
