import React, { useState, useEffect } from "react";
import Axios from "../../Axios/Axios";
import "./MobilityAdd.css";
import Layout from "../../layout/Layout";
import MobilityAddForm from "./MobilityAddForm"; // New component

const MobilityAdd = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await Axios.get("/content/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <Layout>
      <div className="mobility-add-page">
        {/* Header */}
        <header className="page-header">
          <h1>Mobility Add</h1>
          <a href="/mobility-add/new" className="add-button">
            Mobility Add
          </a>
        </header>

        {/* List View */}
        <div className="list-view">
          {loading ? (
            <p>Loading items...</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="card">
                <div className="card-header">
                  <h3>{item.title}</h3>
                </div>
                <div className="card-content">
                  {item.short_video_or_image && (
                    <video
                      className="video-placeholder"
                      controls
                      src={item.short_video_or_image}
                      alt="Video"
                    />
                  )}
                  <p>Type: {item.type}</p>
                  <p>Query: {item.query}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MobilityAdd;
