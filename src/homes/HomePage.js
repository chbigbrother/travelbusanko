
import axios from 'axios';
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '80vh'
};

const HomePage = () => {
    const [locTypes, setLocTypes] = useState([]);
    const nextPage = useHistory();

    const center = {
        lat : 35.118620223842,
        lng : 129.0959130382
    }
    const url = "http://travelbusanko.com";
    useEffect(() => {
        axios.get(url + "/api/location/types/main", {
            headers: {
                "Content-Type": `application/json`,
            }
        }).then((res) => {
            setLocTypes([...res.data]);
        })
    }, []);
    
    return (
        
        <Container>
        <Row>
            <Col>
                    {
                        locTypes.map((data) => (
                            <div class='d-grid gap-2' style={{"margin-bottom":"10%"}}>
                                <Button variant="primary" size="lg" onClick={() =>  nextPage.push({
                                    pathname: "/maps",
                                    inputValue: {mloc_id:data.mloc_id},
                                    })}>
                                    {data.loc_name}
                                </Button>
                            </div>
                        ))
                    }

                
            </Col>
            <Col>
                <LoadScript googleMapsApiKey="AIzaSyB-RafIQqKjj2kactuwVHkuoulZSKA4rSs">
                <GoogleMap
                    bootstrapURLKeys={{key:"AIzaSyB-RafIQqKjj2kactuwVHkuoulZSKA4rSs"}}
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}
                >
                </GoogleMap>
                </LoadScript>
            </Col>
          
        </Row>
      </Container>
    );
};

export default HomePage;