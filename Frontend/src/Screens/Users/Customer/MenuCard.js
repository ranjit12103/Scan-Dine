import React from 'react';

const FoodCard = ({ image, prize, description, name, type, category }) => {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    maxWidth: '300px',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative', // Added to position the prize absolutely
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    position: 'relative', // Position relative for the prize overlay
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
  };

  const descriptionStyle = {
    color: '#555',
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

const MenuCard = () => {
  const foodData = [
    {
      image: 'https://oyemeal-production-media.s3.amazonaws.com/images_dish/a671e81bbef34ab4b9dadd27d05b23ef-480x320.jpg',
      prize: '$12.99',
      description: 'Delicious and savory dish with a blend of spices and fresh ingredients.',
      name: 'Spicy Chicken Curry',
      type: 'Non-Veg',
      category: 'Lunch',
    },
    {
      image: 'https://oyemeal-production-media.s3.amazonaws.com/images_dish/a671e81bbef34ab4b9dadd27d05b23ef-480x320.jpg',
      prize: '$8.99',
      description: 'Healthy salad with a variety of fresh vegetables.',
      name: 'Garden Salad',
      type: 'Veg',
      category: 'Lunch',
    },
    {
      image: 'https://oyemeal-production-media.s3.amazonaws.com/images_dish/a671e81bbef34ab4b9dadd27d05b23ef-480x320.jpg',
      prize: '$5.99',
      description: 'Classic pancakes served with syrup and fresh berries.',
      name: 'Pancakes',
      type: 'Veg',
      category: 'Breakfast',
    },
    {
      image: 'https://oyemeal-production-media.s3.amazonaws.com/images_dish/a671e81bbef34ab4b9dadd27d05b23ef-480x320.jpg',
      prize: '$15.99',
      description: 'Rich and creamy pasta with a flavorful sauce.',
      name: 'Alfredo Pasta',
      type: 'Non-Veg',
      category: 'Lunch',
    },
  ];

  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
  };

  const headerStyle = {
    fontSize: '2em',
    margin: '10px 0',
    color: '#333',
    // color:"red",
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

  return (
    <div style={appStyle}>
      <div style={headerStyle}>Restaurant Name</div>
      <div style={subHeaderStyle}>Menu Card</div>
      <div style={cardContainerStyle}>
        {foodData.map((food, index) => (
          <FoodCard
            key={index}
            image={food.image}
            prize={food.prize}
            description={food.description}
            name={food.name}
            type={food.type}
            category={food.category}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuCard;
