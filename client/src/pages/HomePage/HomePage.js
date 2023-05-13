import React, { useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.css";
import Image1 from "../../assets/불닭쌈.jpg";

const HomePage = () => {
  const [currentCategory, setCurrentCategory] = useState("recommend");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [selectedFoodsList, setSelectedFoodsList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPoints, setTotalPoints] = useState(0);

  const categories = {
    recommend: [
      // 추천상품 데이터
      {
        name: "불닭쌈",
        image: Image1,
        points: "3",
      },
      { name: "음식 이름1", image: "이미지 URL", points: "2" },
      { name: "음식 이름2", image: "이미지 URL", points: "1" },
      { name: "음식 이름3", image: "이미지 URL", points: "4" },
      { name: "음식 이름4", image: "이미지 URL", points: "5" },
    ],
    rice: [
      // 밥류 데이터
      { name: "음식 이름", image: "이미지 URL", points: "포인트" },
    ],
    beverage: [
      // 음료 데이터
      { name: "음식 이름", image: "이미지 URL", points: "포인트" },
    ],
    snack: [
      // 간식 데이터
      { name: "음식 이름", image: "이미지 URL", points: "포인트" },
    ],
    snack: [
      // 과자 데이터
      { name: "음식 이름", image: "이미지 URL", points: "포인트" },
    ],
    ramen: [
      // 컵라면 데이터
      { name: "음식 이름", image: "이미지 URL", points: "포인트" },
    ],
    other: [
      // 기타 데이터
      { name: "음식 이름", image: "이미지 URL", points: "포인트" },
    ],
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  const handleCategoryChange = category => {
    setCurrentCategory(category);
  };

  const handleOrder = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/orders/", {
        category: selectedCategory,
        food: selectedFood,
        quantity: quantity,
      });
      setOrderStatus(response.data.message);
      // Clear selected food and quantity after successful order
      setSelectedFood("");
      setQuantity(1);
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
    setSelectedFoodsList([]);
    setTotalPoints(0);
  };

  const handleFoodSelect = food => {
    setSelectedFood(food);
  };

  const handleQuantityChange = e => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    const selectedFoodItem = {
      food: selectedFood,
      quantity: quantity,
      points: selectedFood.points * quantity,
    };
    setSelectedFoodsList([...selectedFoodsList, selectedFoodItem]);
    setTotalPoints(totalPoints + selectedFoodItem.points);
    setSelectedFood("");
    setQuantity(1);
  };

  const handleRemoveFromCart = index => {
    const updatedSelectedFoodsList = [...selectedFoodsList];
    const removedFood = updatedSelectedFoodsList.splice(index, 1)[0];
    setTotalPoints(totalPoints - removedFood.points);
    setSelectedFoodsList(updatedSelectedFoodsList);
  };

  return (
    <div>
      <h2>음식 주문하기</h2>
      <button onClick={openModal}>주문하기</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="category-buttons">
              <button
                className={currentCategory === "recommend" ? "active" : ""}
                onClick={() => handleCategoryChange("recommend")}>
                추천상품
              </button>
              <button
                className={currentCategory === "rice" ? "active" : ""}
                onClick={() => handleCategoryChange("rice")}>
                밥류
              </button>
              <button
                className={currentCategory === "beverage" ? "active" : ""}
                onClick={() => handleCategoryChange("beverage")}>
                음료
              </button>
              <button
                className={currentCategory === "snack" ? "active" : ""}
                onClick={() => handleCategoryChange("snack")}>
                간식
              </button>
              <button
                className={currentCategory === "snack" ? "active" : ""}
                onClick={() => handleCategoryChange("snack")}>
                과자
              </button>
              <button
                className={currentCategory === "ramen" ? "active" : ""}
                onClick={() => handleCategoryChange("ramen")}>
                컵라면
              </button>
              <button
                className={currentCategory === "other" ? "active" : ""}
                onClick={() => handleCategoryChange("other")}>
                기타
              </button>
            </div>
            <div className="food-slider">
              <Slider {...sliderSettings}>
                {categories[currentCategory].map((food, index) => (
                  <div key={index} className="food-item">
                    <img
                      className="food-img"
                      src={food.image}
                      alt={food.name}
                    />
                    <div className="food-info">
                      <h3>{food.name}</h3>
                      <p>{food.points} 포인트</p>
                    </div>
                  </div>
                ))}
              </Slider>
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
