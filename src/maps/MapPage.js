import React, { Component } from "react";
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import axios from 'axios';
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import $ from 'jquery';
import './Maps.css';
const containerStyle = {
    width: '100%',
    height: '80vh'
};


const url = "http://travelbusanko.com";

const MapPage = (props) => {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    
    const center = {
      lat : lat,
      lng : lng
    }

    let loc_id = props.location.inputValue.mloc_id;
    useEffect(() => {
      axios.get(url + `/api/location/types/main/${loc_id}`, {
          headers: {
              "Content-Type": `application/json`,
          }
      }).then((res) => {
        var data = res.data[0];
        setLat(Number(data.loc_lat));
        setLng(Number(data.loc_lng)); 
      })
    }, []);
       
    axios.get(url + `/api/view/image/${loc_id}`, {
        headers: {
            "Content-Type": `application/json`,
        }
    }).then((res) => {
        var data = res.data;
        var innerHTML = "";
        for(var i=0; i<data.length; i++){
          innerHTML += "<img src='http://travelbusanko.com/" + data[i].saved_path + "' class='image__box' />" ;
          
        }
        $('.image__viewer').html(innerHTML);

    })
    
    return (
      <Container>
        <Row>
          <Col>
            <LoadScript googleMapsApiKey="AIzaSyB-RafIQqKjj2kactuwVHkuoulZSKA4rSs">
              <GoogleMap
                bootstrapURLKeys={{key:"AIzaSyB-RafIQqKjj2kactuwVHkuoulZSKA4rSs"}}
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
              >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
              </GoogleMap>
            </LoadScript>
          </Col>
          <Col>
          <Figure className="image__viewer m-3">

          </Figure>
            {/* <div className="image__viewer m-3">
            
            </div> */}
          </Col>
        </Row>
      </Container>
      
              
    );
    
}

  
export default MapPage;