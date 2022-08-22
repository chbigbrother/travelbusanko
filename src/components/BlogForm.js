import { useState } from  'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { bool } from 'prop-types';
import { useEffect } from 'react';

const BlogForm = ( {editing} ) => {
    const url = 'http://travelbusanko.com';
    const history = useHistory();
    const { id } = useParams();
    console.log(id);

    const [title, setTitle] = useState('');   
    const [originalTitle, setOriginalTitle] = useState('');
    const [body, setBody] = useState('');
    const [originalBody, setOriginalBody] = useState('');
    const [publish, setPublish] = useState(true); 
    const [originalPublish, setOriginalPublish] = useState(false); 

    useEffect(()=>{
      if (editing) {        
      //axios.get(`http://localhost:5000/board_test/${id}`).then(res => {
      //axios.get(url + `/board_test/${id}`).then(res => {
      axios.get(url + `/board_test/${id}`).then(res => {
        console.log(res.data[0].title);
        //console.log("test");
        //console.log(id);
        setTitle(res.data[0].title);
        console.log(title);
        setOriginalTitle(res.data[0].title);
        setBody(res.data[0].body);
        setOriginalBody(res.data[0].body);
        setPublish(res.data[0].publish);
        setOriginalPublish(res.data[0].publish);
      })
     }
    },[id, editing]);

    const isEdited =() =>{
      return title !== originalTitle 
        || body !== originalBody
        || publish !== originalPublish;
    };

    const goBack =()=>{
      if(editing){ 
      history.push(`/blogs/${id}`);
      } else {
      history.push('/blogs');
      }
    }
    

    const onSubmit = () => {
        //console.log(title, body);
        if (editing) {       
          axios.put(url + `/board_test/${id}`, {
            title, //: title,
            body //: body,
            //publish
          }).then(res => {
              //console.log(res);
              //setOriginalTitle(res.data.title);              
              //setOriginalBody(res.data.body);
              history.push(`/blogs/${id}`)
          })

        } else {
            axios.post(url+ '/board_test/:id', {
            title,
            body
           // publish,
           // createdAt: Date.now()
        }).then(() => {
          history.push('/blogs');
        })
      }
    };

    const onChangePublish = (e)=>{
      console.log(e.target.checked);
      setPublish(e.target.checked);
    };

  return(
        <div> 
        <h1> {editing ? 'Edit a blog post' : 'Create a blog post'} </h1>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input 
            className="form-control" 
            value= { title }
            onChange={ (event)=> {
              setTitle(event.target.value);  
            } }
          />
        </div>
        <div className="mb-3">
          <label className="form-label"> Content </label>
          <textarea 
            className="form-control" 
            value = { body }
            onChange={ (event)=> {
              setBody(event.target.value);
            } }
            rows="10"
          />
        </div>
        <div className="form-check" mb-3>
            <input
              className="form-check-input"
              type ="checkbox"
              checked={publish}
              onChange={onChangePublish}
            />
            <label className="from-check-label">
              Publish
            </label>
        </div>

        <button 
          className="btn btn-primary" 
          onClick = { onSubmit } 
          disabled={editing && !isEdited()}
        >
         {editing ? 'Edit' : 'Post' } 
        </button>
        <button 
          className="btn btn-danger ms-2"   
          onClick={goBack}    
        >
          Cancel
        </button>
      </div>
    );
};


BlogForm.propTypes = {
  editing: bool
}


BlogForm.defaultProps = {
  editing: false
}
export default BlogForm;