import axios from 'axios';
import { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useHistory } from 'react-router';
//import  LoadingSpinner  from '../components/LoadingSpinner';
import { bool } from 'prop-types';
import Pagination from './Pagination';
//import Pagination2 from './Pagination2';
import LoadingSpinner  from './LoadingSpinner';

const BlogList = ({ isAdmin }) => {

    const url = "http://travelbusanko.com"; 
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const limit = 5;

    useEffect(()=> {
        setNumberOfPages(Math.ceil(numberOfPosts/limit));
    }, [numberOfPosts]);

    const getPosts = (page = 1) =>{
        setCurrentPage(page);
        let params = { 
            _page : page,
            _limit : limit         
        }
  
        if(!isAdmin){
            params={...params, publish:true};
            console.log(params);
        }
       
        
        //axios.get('http://localhost:5000/board_test', {
        // axios.get( url +'/board_test?_page=&{page}&_limit={limit}')
         axios.get( url +'/board_test', {       
                 params                   
         }).then((res) => {                    
            //setNumberOfPosts(res.headers['x-total-count']); 
            //console.log(params._limit);
            //console.log(res.data);
            setNumberOfPosts(res.data.length);            
            setPosts(res.data);
            setLoading(false);
        })
    }

    const deleteBlog = (e, id) => {
      e.stopPropagation(); // 상위계층의 클릭 이벤트를 막아줌(버블링을 막음)
      //console.log('delete blog');
      //console.log({id});      
      //axios.delete(url + "/board_test", {id}).then(()=>{
       axios.delete(url + `/board_test/${id}`).then(()=>{
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id)
        )
        }); 
    };
    
    useEffect(()=>{
        getPosts();
    }, []); 

    if(loading ){
        return (
        <LoadingSpinner />
        )
    } 
    if (posts.length === 0) {
        return (<div> No blog posts found </div>)
    }

    const renderBlogList= ()=>{
        return posts.map(post => {       
            return (
                <Card key={post.id} 
                title={post.title} 
                onClick={ () => history.push(`/blogs/${post.id}`)} 
                >     
                {isAdmin ? (<div>
                    <button className="btn btn-danger btn-sm"
                    onClick={(e) =>  deleteBlog(e, post.id) }
                    /* onClick = {(e) => {
                    e.stopPropagation();
                    console.log('HHS')
                    }} */
                    >  Delete
                    </button>
                </div>) : null}
                </Card>    
            ); 
        })    
    }
    return (
    <div>
       { renderBlogList() } 
     
       {numberOfPages > 1 && <Pagination
          currentPage= {currentPage} 
          numberOfPages = {numberOfPages} 
          
          onClick={getPosts} 
        />}      
    </div>
    )
};

BlogList.propTypes = {
  isAdmin: bool
}
BlogList.defaultProps = {
  isAdmin: false
};
export default BlogList;
