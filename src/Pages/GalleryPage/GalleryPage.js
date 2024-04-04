import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GalleryPage.css';

function GalleryPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            mode: 'no-cors',
            url: 'http://localhost:4502/bin/getassets',
            headers: {
                Authorization: 'Basic YWRtaW46YWRtaW4=',
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                setData(response.data);
                setImages(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

      } catch (error) {
        console.error("There was an error fetching the data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div>Welcome to the Gallery Page! 
        <div className="image-gallery">
            {images.map((image, index) => (
              <div key={index} className="image-container">
                  <img src={image.path} alt={image.name} />
              </div>
            ))}
      </div>
    </div>
    );
}

export default GalleryPage;