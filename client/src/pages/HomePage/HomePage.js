import React, { useState } from "react";
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const categories = [
    {
      name: "추천상품",
      foods: [
        { name: "김치볶음밥", points: 5, image: "image-url" },
        { name: "추천음식1", points: 3, image: "image-url" },
        { name: "추천음식2", points: 4, image: "image-url" },
        // ... Add more foods for 추천상품 category
      ],
    },
    {
      name: "밥류",
      foods: [
        { name: "볶음밥", points: 5, image: "image-url" },
        { name: "짜장밥", points: 3, image: "image-url" },
        { name: "짬뽕밥", points: 4, image: "image-url" },
        // ... Add more foods for 밥류 category
      ],
    },
    {
      name: "음료",
      foods: [
        { name: "콜라", points: 5, image: "image-url" },
        { name: "사이다", points: 3, image: "image-url" },
        { name: "환타", points: 4, image: "image-url" },
        // ... Add more foods for 음료 category
      ],
    },
    // ... Add other categories with foods and images
  ];

  const handleOrder = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/orders/", {
        category: selectedCategory,
        food: selectedFood,
      });
      setOrderStatus(response.data.message);
    } catch (error) {
      console.error(error);
      setOrderStatus("주문에 실패했습니다.");
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategory("");
    setSelectedFood("");
    setOrderStatus("");
  };

  return (
    <div>
      <h2>음식 주문하기</h2>
      <button onClick={openModal}>주문하기</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>음식 주문</h3>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}>
              <option value="">카테고리 선택</option>
              {categories.map(category => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="grid">
              {selectedCategory &&
                categories
                  .find(category => category.name === selectedCategory)
                  .foods.map((food, index) => (
                    <div key={index} className="food-card">
                      <img src={food.image} alt={food.name} />
                      <p>{food.name}</p>
                      <p>포인트: {food.points}</p>
                      <button onClick={() => setSelectedFood(food.name)}>
                        선택
                      </button>
                    </div>
                  ))}
            </div>
            <button onClick={handleOrder}>주문</button>
            {orderStatus && <p>{orderStatus}</p>}
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
