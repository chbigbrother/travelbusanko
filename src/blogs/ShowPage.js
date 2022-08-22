import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const ShowPage = () => {
    const url = "http://travelbusanko.com";
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [loading, setLoading ] = useState(true);
    //console.log(id);
   
    const getPost = (id) => {        
        //axios.get("http://localhost:5000/board_test/g1", { params: {'id' : id}}).then((res) => { 
        axios.get(url + `/board_test/${id}`).then((res) => {                    
          setPost(res.data[0]);
          //console.log(res.data[0].title);        
          //console.log(post);   
          setLoading(false);
        }) 
    }
 
    useEffect(() => {
        getPost(id)
    }, [id])

    const printDate=(timestamp) => {
        return new Date(timestamp).toLocaleString();
    }

    /*   if( loading ) {
        return <LoadingSpinner />
    }  */
    return(
         <div>
            <div className="d-flex">
                        <h1 className="flex-grow-1">  { post.title }   </h1> 
             {/* <ul>
	            {post.map(post => (
	                <li key={post.id}>
	                {post.title} ({post.body})
	                </li>
	            ))}
	        </ul> 
  */}
                <div>                   
                    <Link className="btn btn-primary"
                        to={`/blogs/${id}/edit`}
                    >
                        EDIT
                    </Link> 
                </div>
            </div>
            <small className="text-muted">
             {/* Created At: {printDate(post.createdAt)}  */}
            </small>
            <hr />
             <p>   { post.body  }  </p> 

           
          </div>
    );
}; 

export default ShowPage;
