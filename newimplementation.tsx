import * as React from 'react';
import styles from './Gettingdata.module.scss';
// import { genericSearch } from "./utils/genericSearch";
import { IGettingdataProps } from './IGettingdataProps';
import { IGettingdataState } from './IGettingdataState';
import "bootstrap/dist/css/bootstrap.min.css";
import { TbFilter } from 'react-icons/tb';

const[data, setData] = React.useState([]);
const[searchApiData,setSearchApiData] =React.useState([]);
const [filterVal, setFilterVal] = React.useState('');

export default class Gettingdata extends React.Component<IGettingdataProps,IGettingdataState, {}> {
 
  public constructor(props: IGettingdataProps, state: IGettingdataState){    
    super(props);    
    this.state = { 
      searchApiData:[],   
      setData:[],
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
    

      reactHandler.setState({
        items: result.value,
        searchApiData: result.value,
        setData:result.value
      });
    }
    else if (getRequest.readyState === 4 && getRequest.status !== 200) {
      console.log('Error Occurred !');
    }
  };
  getRequest.send();
}


handleFilter=(e:any)=>{
  if(e.target.value == ''){
      setData(searchApiData)

  }else{
     const filterResult= searchApiData.filter(item=> item.Title.toLowerCase().include(e.target.value.toLowerCase()))
     if(filterResult.length>0){
      setData(filterResult)
     }else{
      setData([{"name":"No Result"}])
     }
     
  }
  setFilterVal(e.target.value)
      
}

  public render(): React.ReactElement<IGettingdataProps> {
    return (
<div className="container" >

<div className="text-center mb-3">
 <h1>Employee List Data</h1>
    </div>
    <input placeholder='Search' value={filterVal} onInput={(e)=>this.handleFilter(e)}></input>
  <table className="table table-striped table-bordered table-sm">
    <thead>
      <tr>
         
        <th className="th-sm">EmployeeName
            <TbFilter/>
            <input type='search' placeholder='EmployeeName' id='emname' ></input>
        </th>
        <th className="th-sm">Email
        <TbFilter/>
        <input type='search' placeholder='Email' id='eemail' ></input>
        </th>
        <th className="th-sm">Designation
        <TbFilter/>
        <input type='search' placeholder='Designation' id='edesignation' ></input>
        </th>
        <th className="th-sm">Mobile Number
        <TbFilter/>
        <input type='search' placeholder='Mobile Number' id='edesignation' ></input>
        </th>
      </tr>
    </thead>

    {this.state.items.map(function (item, key) {

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
    })}
    </table>


</div>
      
    );
  }
}
