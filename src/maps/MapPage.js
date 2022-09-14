import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
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
    const [places, setPlaces] = useState([]);
    const [map, setMap]= useState('');
    const center = {
      lat : lat,
      lng : lng
    }
    var loc_id = "MLOC001";

    useEffect(() => {
      if (typeof(props.location.inputValue) != 'undefined'){
        loc_id = props.location.inputValue.mloc_id;
      }
      
      axios.get(url + `/api/location/types/main/${loc_id}`, {
          headers: {
              "Content-Type": `application/json`,
          }
      }).then((res) => {
        var data = res.data[0];
        setLat(Number(data.loc_lat));
        setLng(Number(data.loc_lng)); 
      })

      axios.get(url + `/api/view/image/${loc_id}`, {
        headers: {
            "Content-Type": `application/json`,
        }
      }).then((res) => {
          var data = res.data;
          var innerHTML = "";
          for(var i=0; i<data.length; i++){
            innerHTML += "<img src='http://travelbusanko.com/" + data[i].saved_path + "' class='image__box' id='"+ data[i].path_id + "' />" ;
            data[i].position = {
              lat: parseFloat(data[i].latitude),
              lng: parseFloat(data[i].longitude)
            }
          }
          setPlaces(data);
          $('.image__viewer').html(innerHTML);
      });
      
    }, []);

    const handleFigureClick = (e) => {
      for (var i=0; i<places.length; i++){
        if(places[i].path_id == e.target.id){
          center.lat = parseFloat(places[i].latitude);
          center.lng = parseFloat(places[i].longitude);
        }
      }
      map.panTo(center);
      map.setZoom(17);
    } 

    return (
      <Container>
        <Row>
          <Col>
            <LoadScript googleMapsApiKey="AIzaSyB-RafIQqKjj2kactuwVHkuoulZSKA4rSs" libraries={["places"]}>
              <GoogleMap
                bootstrapURLKeys={{key:"AIzaSyB-RafIQqKjj2kactuwVHkuoulZSKA4rSs"}}
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
                onLoad={map=>setMap(map)}
                id = "map"

              >
                
                { places.length !== 0 && places.map((place) => (
                    <Marker 
                      key={place.path_id}
                      text={place.file_name}
                      position={place.position}
                    />
                ))}
                  
              </GoogleMap>
            </LoadScript>
          </Col>
          <Col>
          <Figure className="image__viewer m-3" onClick={ handleFigureClick }>

          </Figure>
            {/* <div className="image__viewer m-3">
            
            </div> */}
          </Col>
        </Row>
      </Container>
      
              
    );
    
}

  
export default MapPage;