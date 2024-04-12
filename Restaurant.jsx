import React, { useState } from 'react';
import jsonData from './data.json';

const Restaurant = () => {
  const [restaurantData, setRestaurantData] = useState(jsonData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextRestaurant = () => {
    setCurrentIndex((prevIndex) => (prevIndex === restaurantData.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevRestaurant = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? restaurantData.length - 1 : prevIndex - 1));
  };

  const filterRestaurants = (criteria) => {
    let filteredRestaurants = [];

    switch (criteria) {
      case '4 and above':
        filteredRestaurants = jsonData.filter((restaurant) => restaurant.rating >= 4);
        break;
      case '3 and above':
        filteredRestaurants = jsonData.filter((restaurant) => restaurant.rating >= 3);
        break;
      case '2 and above':
        filteredRestaurants = jsonData.filter((restaurant) => restaurant.rating >= 2);
        break;
      case '1 and above':
        filteredRestaurants = jsonData.filter((restaurant) => restaurant.rating >= 1);
        break;
      case 'All':
        filteredRestaurants = jsonData;
        break;
      case 'Card':
        filteredRestaurants = jsonData.filter((restaurant) => restaurant.payment.card);
        break;
      case 'Cash':
        filteredRestaurants = jsonData.filter((restaurant) => restaurant.payment.cash);
        break;
      case 'Upi':
        filteredRestaurants = jsonData.filter((restaurant) => restaurant.payment.upi);
        break;
      case 'Des':
        filteredRestaurants = [...jsonData].sort((a, b) => b.id - a.id);
        break;
      case 'Asc':
        filteredRestaurants = [...jsonData].sort((a, b) => a.id - b.id);
        break;
      default:
        filteredRestaurants = jsonData;
    }

    setRestaurantData(filteredRestaurants);
  };

  const currentRestaurant = restaurantData[currentIndex];

  return (
    <div className='outer-div'>
      <div>
        <h1>Restaurant Details</h1>
        <div className='button-div'>
          <button className='btn-stars' onClick={() => filterRestaurants('4 and above')}>4 and above</button>
          <button className='btn-stars' onClick={() => filterRestaurants('3 and above')}>3 and above</button>
          <button className='btn-stars' onClick={() => filterRestaurants('2 and above')}>2 and above</button>
          <button className='btn-stars' onClick={() => filterRestaurants('1 and above')}>1 and above</button>
          <button className='btn-stars' onClick={() => filterRestaurants('All')}>All</button>
          <button className='btn-stars' onClick={() => filterRestaurants('Card')}>Card</button>
          <button className='btn-stars' onClick={() => filterRestaurants('Cash')}>Cash</button>
          <button className='btn-stars' onClick={() => filterRestaurants('Upi')}>Upi</button>
          <button className='btn-stars' onClick={() => filterRestaurants('Des')}>Des</button>
          <button className='btn-stars' onClick={() => filterRestaurants('Asc')}>Asc</button>
        </div>
      </div>

      {/* Render restaurant details */}
      <div className="restaurant-details">
        <div key={currentRestaurant.id} className="restaurant-card">
          <img src={currentRestaurant.image} alt={currentRestaurant.restaurantName} />
          <h2>{currentRestaurant.restaurantName}</h2>
          <p>Items: {currentRestaurant.categories.join(', ')}</p>
          <p>Cost for One: {currentRestaurant.cost_for_one}</p>
          <p>Accept Payment: {currentRestaurant.payment.card ? 'Card, ' : ''} 
                             {currentRestaurant.payment.upi ? 'UPI, ' : ''} 
                             {currentRestaurant.payment.cash ? 'Cash' : ''}</p>
          <p>Rating: {currentRestaurant.rating} Stars</p>
        </div>
      </div>

      <div className="navigation-buttons">
        <button className='nav-btn' onClick={handlePrevRestaurant}>Previous</button>
        <button className="nav-btn" onClick={handleNextRestaurant}>Next</button>
      </div>
    </div>
  );
}

export default Restaurant;
