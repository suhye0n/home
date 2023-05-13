import React, { useState } from "react";

const OrderModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [food, setFood] = useState("");
  const [request, setRequest] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    // 주문 정보를 서버로 전송하는 코드 작성

    // 주문이 완료되면 모달을 닫고 폼을 초기화합니다.
    setShowModal(false);
    setFood("");
    setRequest("");
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>주문하기</button>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div
            style={{
              width: "400px",
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "20px",
            }}>
            <h2>음식 주문</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="food">음식:</label>
              <input
                type="text"
                id="food"
                value={food}
                onChange={e => setFood(e.target.value)}
              />
              <br />
              <label htmlFor="request">요청사항:</label>
              <textarea
                id="request"
                rows="4"
                value={request}
                onChange={e => setRequest(e.target.value)}></textarea>
              <br />
              <button type="submit">주문하기</button>
              <button onClick={() => setShowModal(false)}>취소</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderModal;
