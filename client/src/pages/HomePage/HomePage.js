import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.css";
import Image1 from "../../assets/불닭쌈.jpg";
import Image2 from "../../assets/오므라이스.jpg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState("recommend");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [selectedFoodsList, setSelectedFoodsList] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("theme-dark", "theme-light");
    htmlElement.classList.add(isDarkMode ? "theme-dark" : "theme-light");
  }, [isDarkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const categories = {
    recommend: [
      // 추천상품 데이터
      {
        name: "불닭쌈",
        image: Image1,
        points: "3",
      },
      {
        name: "오므라이스",
        image: Image2,
        points: "3",
      },
      {
        name: "불닭쌈",
        image: Image1,
        points: "3",
      },
      {
        name: "불닭쌈",
        image: Image1,
        points: "3",
      },
      {
        name: "불닭쌈",
        image: Image1,
        points: "3",
      },
      {
        name: "불닭쌈",
        image: Image1,
        points: "3",
      },
      {
        name: "불닭쌈",
        image: Image1,
        points: "3",
      },
      {
        name: "불닭쌈",
        image: Image1,
        points: "3",
      },
      {
        name: "불닭쌈",
        image: Image1,
        points: "3",
      },
      {
        name: "불닭쌈",
        image: Image1,
        points: "3",
      },
      {
        name: "불닭쌈",
        image: Image1,
        points: "3",
      },
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
      const menuNames = selectedFoodsList.map(food => food.name);
      const quantities = selectedFoodsList.map(food => food.quantity);
      const totalOrderPoints = selectedFoodsList.reduce(
        (total, food) => total + parseInt(food.points) * food.quantity,
        0
      );

      if (totalOrderPoints <= currentPoints) {
        const response = await axios.post(
          "http://localhost:8000/api/place_order/",
          {
            selectedFoodsList: selectedFoodsList,
            menu_names: menuNames,
            quantities: quantities,
            order_number: "0",
            customer_name: "고객명",
          }
        );

        setOrderStatus(response.data.message);
        setCurrentPoints(prevPoints => prevPoints - totalOrderPoints);
        setSelectedFoodsList([]);
        setTotalPoints(0);
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/place_order/",
          {
            selectedFoodsList: selectedFoodsList,
            menu_names: menuNames,
            quantities: quantities,
            order_number: "0",
            customer_name: "고객명",
          }
        );

        setOrderStatus(response.data.message);
        setCurrentPoints(prevPoints => prevPoints - totalOrderPoints);
        setSelectedFoodsList([]);
        setTotalPoints(0);
      }
    } catch (error) {
      console.error(error);
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

    const updatedPoints = parseInt(currentFood.points) * currentFood.quantity;
    currentFood.points = updatedPoints;

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
    const currentPointsFromStorage = localStorage.getItem("currentPoints");
    if (currentPointsFromStorage) {
      setCurrentPoints(parseInt(currentPointsFromStorage));
    }

    const isLogin = localStorage.getItem("isLogin");
    console.log("isLogin value:", isLogin);

    if (isLogin.trim() !== "true") {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <header id="header">
        <div class="left">
          <div class="title" alt="Home">
            <a href="/">수현이네집</a>
          </div>
        </div>
        <div class="center"></div>
        <div class="right">
          <div class="intro">안녕하세용</div>
          <div class="sns">
            <a
              href="//www.facebook.com/claphye0n"
              target="_blank"
              class="tooltip"
              alt="Facebook">
              <i class="xi-facebook"></i>
            </a>
            <a
              href="//www.instagram.com/claphye0n"
              target="_blank"
              class="tooltip"
              alt="Instagram">
              <i class="xi-instagram" aria-hidden="true"></i>
            </a>
            <a
              href="//twitter.com/claphye0n"
              target="_blank"
              class="tooltip"
              alt="Twitter">
              <i class="xi-twitter" aria-hidden="true"></i>
            </a>
            <a
              href="//youtube.com"
              target="_blank"
              class="tooltip"
              alt="Youtube">
              <i class="xi-youtube"></i>
            </a>
          </div>
          <div className={`theme ${isDarkMode ? "theme-dark" : "theme-light"}`}>
            <div onClick={handleModeToggle}>
              {isDarkMode ? (
                <i className="xi-sun" aria-hidden="true"></i>
              ) : (
                <i className="xi-night" aria-hidden="true"></i>
              )}
            </div>
          </div>

          <div className="battery">
            <i className="xi-battery-90"></i>
          </div>
          <div class="clock">
            <span class="time" alt="Time">
              {currentTime.toLocaleTimeString()}
            </span>
            <span class="date" alt="Date"></span>
          </div>
        </div>
      </header>
      <button onClick={openModal} className="button">
        <i className="xi-cookie"></i>
      </button>
      <button
        onClick={() => {
          window.location.href = "https://carp.tistory.com";
        }}
        className="button">
        <i className="xi-note-o"></i>
      </button>
      <button
        onClick={() => {
          window.location.href = "https://carp.tistory.com/guestbook";
        }}
        className="button">
        <i className="xi-pen-o"></i>
      </button>
      <button
        onClick={() => {
          localStorage.setItem("isLogin", false);
          window.location.href = "/login";
        }}
        className="button">
        <i className="xi-log-out"></i>
      </button>
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
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="selected-foods-list">
              {selectedFoodsList.map((food, index) => (
                <div key={index} className="selected-food-item">
                  <div className="selected-food-info">
                    <h4 style={{ display: "inline" }}>{food.name}</h4>
                    <button
                      className="delete-btn"
                      onClick={() => handleRemoveFood(index)}>
                      x
                    </button>
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
                  </div>
                </div>
              ))}
              <button className="button" onClick={handleOrder}>
                <i className="xi-cookie xi-spin"></i>
              </button>
              {orderStatus && <p>{orderStatus}</p>}
            </div>
            <button className="button" onClick={closeModal}>
              <i className="xi-close-square-o"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
