import axios from 'axios';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import Swal from "sweetalert2";

const url = "http://travelbusanko.com";
function AddLocPage() {
    
    const [previewImages, setPreviewImages] = useState([]);
    const [locTypes, setlocTypes] = useState([]);
    useEffect(() => {
        axios.get(url + "/api/location/types", {
            headers: {
                "Content-Type": `application/json`,
            }
        }).then((res) => {
            setlocTypes([...res.data]);
            var data = res.data;
            var innerHTML = "<option value='" + data[0].loctype_id + "'>위치 타입 선택</option>";
            for(var i=0; i<data.length; i++){
                innerHTML += "<option value='" + data[i].loctype_id + "'>" + data[i].loctype_name + "</option>";
            }
            $(".selectbox").html(innerHTML);
        })
    }, []);
    
    const addImage = e => {
        const nowSelectImageList = e.target.files;
        const previewList = [...nowSelectImageList];
        let fileURL = [];

        let file;
        let maxFile = 50;
        let filesLength = nowSelectImageList.length > maxFile ? maxFile : nowSelectImageList.length;
        
        fileURL.push(nowSelectImageList);
        
        for(var i=0; i<filesLength; i++){
            file = nowSelectImageList[i];
            if(file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png"){
                
                Swal.fire({
                    icon: "warning",
                    title: "사진 형식 에러",
                    text: `JPG 사진 파일만 가능합니다.`,
                    showCancelButton: true,
                    confirmButtonText: "확인",
                    cancelButtonText: "취소",
                })
                break;
            } else{
                const preview = URL.createObjectURL(nowSelectImageList[i]);
                previewList.push(preview);
            }
        }
        setPreviewImages(previewList);
    }

    const addSubLocations = (e) => {
        
        const main_value = $(".selectbox").val();
        if(main_value != "loct_001"){
            $(".sub_selectbox").css("display", "block");       
            axios.get(url + "/api/location/types/main", {
                headers: {
                    "Content-Type": `application/json`,
                }
            }).then((res) => {
                var data = res.data;
                var innerHTML = "<option value='" + data[0].mloc_id + "'>위치 타입 선택</option>";
                for(var i=0; i<data.length; i++){
                    innerHTML += "<option value='" + data[i].mloc_id + "'>" + data[i].loc_name + "</option>";
                }
                $(".sub_selectbox").html(innerHTML);                
            })            
        } else{
            $(".sub_selectbox").css("display", "none");        
        }
    }

    
    useEffect(()=>{
        
    })

  return (
    <div className='m-5'>
    <Form name="form" method="post" encType='multipart/form-data' action="http://travelbusanko.com/api/add/location">
        <Form.Label>위치 타입</Form.Label>
        <Form.Select aria-label="Default select example" className='selectbox' name="loctype_id" onChange={ addSubLocations }>
            {/* <option value="1">One</option>        "http://travelbusanko.com/api/add/location" http://localhost:5000/api/add/location
            <option value="2">Two</option>
            <option value="3">Three</option> */}
        </Form.Select>
        <br/>
        
        <Form.Select aria-label="Default select example" className="sub_selectbox" name="main_loctype_id" style={{"display": "none"}} > 
            {/* <option value="1">One</option>       
            <option value="2">Two</option>
            <option value="3">Three</option> */}
        </Form.Select>
        <br/>
        <Form.Control type="hidden" name="post_type" value="LOC" />
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>위치명</Form.Label>
            <Form.Control type="text" name="loc_name" placeholder="위치명입력" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>위도</Form.Label>
            <Form.Control type="text" name="loc_lat" placeholder="위도 입력" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>경도</Form.Label>
            <Form.Control type="text" name="loc_lng" placeholder="경도 입력" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" onChange={ addImage }>
            <Form.Label>위치 사진</Form.Label>
            <Form.Control type="file" name="uploadfile" multiple="multiple" placeholder="위치 포인트 입력" />
        </Form.Group>
        <div className='preview__box' style={{width:'100%', height:'300px', display:'flex'}}>
        {previewImages.map((image, id) => (
            <div key={id} style={{float:'left'}}>
                <img src={image} alt={`${image}-${id}`} style={{width:'100%', height:'300px'}}/>
            </div>
        ))}
        </div>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
    </div>
  );
}

export default AddLocPage;