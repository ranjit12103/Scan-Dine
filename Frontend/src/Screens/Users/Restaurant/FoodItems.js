// src/components/FoodItems.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FoodCard = ({ image, prize, description, name, type, category }) => {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    width: '300px',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const prizeStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '0.9em',
  };

  const detailsStyle = {
    padding: '15px',
  };

  const nameStyle = {
    fontSize: '1.5em',
    margin: '0',
    color: "red",
  };

  const descriptionStyle = {
    color: "#007bff",
  };

  const textStyle = {
    margin: '10px 0',
    fontSize: '0.9em',
    color: '#555',
  };

  return (
    <div style={cardStyle}>
      <div style={{ position: 'relative' }}>
        <img src={image} alt={name} style={imageStyle} />
        <div style={prizeStyle}>{prize}</div>
      </div>
      <div style={detailsStyle}>
        <h2 style={nameStyle}>{name}</h2>
        <p style={descriptionStyle}>{description}</p>
        <p style={textStyle}>Type: {type}</p>
        <p style={textStyle}>Category: {category}</p>
      </div>
    </div>
  );
};

const FoodItems = () => {
  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
  };

  const appErrorStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
    color: 'black',
  };

  const headerStyle = {
    fontSize: '2em',
    margin: '10px 0',
    color: '#333',
  };

  const subHeaderStyle = {
    fontSize: '1.5em',
    marginBottom: '30px',
    color: '#555',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const searchBoxStyle = {
    marginBottom: '20px',
    padding: '10px',
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1em',
  };

  const noResultsStyle = {
    fontSize: '1.2em',
    color: '#777',
  };

  const { restaurantId } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const foodItemsUrl = `http://192.168.228.7:8080/ManageFoodItem/get/${restaurantId}`;

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch(foodItemsUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFoodItems(data.foodItems);
        setFilteredFoodItems(data.foodItems); // Set initial filtered items
      } catch (error) {
        setError('No Food Items Available');
        console.error('Error fetching food items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [foodItemsUrl]);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter food items based on search query
    const filtered = foodItems.filter(item =>
      item.foodName.toLowerCase().includes(query)
    );
    setFilteredFoodItems(filtered);
  };

  const baseUrl = 'http://192.168.228.7:8080/';

  if (loading) return <p style={appErrorStyle}>Loading...</p>;
  if (error) return <p style={appErrorStyle}>{error}</p>;

  return (
    <div style={appStyle}>
      <div style={headerStyle}>Restaurant Name</div>
      <div style={subHeaderStyle}>Menu Card</div>
      <input
        type="text"
        placeholder="Search by food name..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={searchBoxStyle}
      />
      <div style={cardContainerStyle}>
        {filteredFoodItems.length === 0 ? (
          searchQuery ? (
            <p style={noResultsStyle}>No food items Available.</p>
          ) : (
            <p>No food items available.</p>
          )
        ) : (
          filteredFoodItems.map(item => (
            <FoodCard
              key={item._id}
              image={`${baseUrl}${item.foodImage.replace('\\', '/')}`} // Convert backslashes to forward slashes
              prize={`$${item.price}`}
              description={item.description}
              name={item.foodName}
              type={item.foodType}
              category={item.foodCategory}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FoodItems;
