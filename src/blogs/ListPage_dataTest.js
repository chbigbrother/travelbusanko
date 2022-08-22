import '../App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react'

const url = 'http://localhost:5000'
const ListPage = () => {

  const [userdata, setUserData] = useState([]);
  const [boarddata, setBoardData] = useState([]);

  
  useEffect(() => {
    axios.get(url +'/api/users/').then( (res) => {
           console.log(res.data);
           setUserData(res.data);           
    })

    axios.get(url +'/api/board/').then( (res2) => {
      console.log(res2.data);
      setBoardData(res2.data);
      })
    
    }, []);

  return (
    <div>    Blogs   List Page 
      <p> **** user data ***** </p>
      {userdata.map(user =>{
        return( 
          <div>  id = {user.id} , name ={user.name}    </div>
        )
      })}

      <p> **** board data **** </p>
      {boarddata.map(board =>{
        return( 
          <div> name = {board.name} , title ={board.title}   , content = {board.content} </div>
        )
      })}
    </div>       
      
  );
};  

export default ListPage;