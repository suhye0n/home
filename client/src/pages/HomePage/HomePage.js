import React, { useState, useEffect } from "react";
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
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);

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

  const handleFoodSelect = food => {
    const selectedFood = {
      name: food.name,
      image: food.image,
      points: food.points,
      quantity: 1,
    };
    setSelectedFoodsList(prevList => [...prevList, selectedFood]);
    setTotalPoints(prevPoints => prevPoints + parseInt(food.points));
  };

  const handleQuantityChange = (index, action) => {
    const updatedList = [...selectedFoodsList];
    const currentFood = updatedList[index];

    if (action === "increment") {
      currentFood.quantity += 1;
    } else if (action === "decrement" && currentFood.quantity > 1) {
      currentFood.quantity -= 1;
    }

    currentFood.points = parseInt(currentFood.points) * currentFood.quantity;
    const updatedTotalPoints = updatedList.reduce(
      (total, food) => total + parseInt(food.points),
      0
    );

    setSelectedFoodsList(updatedList);
    setTotalPoints(updatedTotalPoints);
  };

  const handleRemoveFood = index => {
    const updatedList = [...selectedFoodsList];
    const removedFood = updatedList.splice(index, 1)[0];

    setTotalPoints(
      prevPoints =>
        prevPoints - parseInt(removedFood.points) * removedFood.quantity
    );
    setSelectedFoodsList(updatedList);
  };

  useEffect(() => {
    // 현재 포인트를 가져오는 API 호출
    const fetchCurrentPoints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/current_points/"
        );
        setCurrentPoints(response.data.points);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentPoints();
  }, []);

  return (
    <div>
      <h2>음식 주문하기</h2>
      <div className="current-points">현재 포인트: {currentPoints}</div>
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
                  <div
                    key={index}
                    className="food-item"
                    onClick={() => handleFoodSelect(food)}>
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
            <div className="selected-foods-list">
              <h3>선택한 음식</h3>
              {selectedFoodsList.map((food, index) => (
                <div key={index} className="selected-food-item">
                  <div className="selected-food-info">
                    <h4>{food.name}</h4>
                    <p>포인트: {food.points}</p>
                    <div className="food-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(index, "decrement")
                        }>
                        -
                      </button>
                      <span className="quantity">{food.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(index, "increment")
                        }>
                        +
                      </button>
                    </div>
                    <button onClick={() => handleRemoveFood(index)}>
                      삭제
                    </button>
                  </div>
                </div>
              ))}
              <p>총 주문 포인트: {totalPoints}</p>
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
