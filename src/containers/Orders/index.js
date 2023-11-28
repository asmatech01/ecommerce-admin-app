import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";

import "./style.css";

const Orders = (props) => {
  const order = useSelector((state) => state.order);
  console.log("here is order", order.orders);
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  return (
    <Layout sidebar>
      {order &&
        order.orders?.map((orderItem, index) => (
          <Card
            style={{
              margin: "10px 0",
            }}
            key={index}
            headerLeft={orderItem._id}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "50px 50px",
                alignItems: "center",
              }}
            >
              <div>
                <div className="title">ordered Items</div>
                {orderItem.orderItems?.map((item, index) => (
                  <>
                  <div className="value" key={index}>
                    Name: {item.name}
                  </div>
                  <div> 
                    Quantity:  {item.quantity}
                  </div>
                  <div> 
                    Price:  {item.price}
                  </div>
                  <div> 
                    Image: <img width={"100px"} src={item.image} />
                  </div>
                  </>
                ))}
              </div>
              <div>
                <div className="title">Shipping Info</div>
                {/* {orderItem.shippingInfo((item, index) => ( */}
                  <>
                  <div className="value" key={index}>
                    Name: {orderItem.shippingInfo.name}
                  </div>
                  <div className="value" key={index}>
                    email: {orderItem.shippingInfo.email}
                  </div>
                  <div> 
                    phoneNumber:  {orderItem.shippingInfo.phoneNumber}
                  </div>
                  <div> 
                    City:  {orderItem.shippingInfo.city}
                  </div>
                  <div> 
                    Address:  {orderItem.shippingInfo.address}
                  </div>
                  
                  </>
                {/* ))} */}
              </div>
              <div>
                <span className="title">Shipping Charges</span>
                <br />
                <span className="value">{orderItem.shippingCharge}</span>
              </div>
              <div>
                <span className="title">Total Price</span>
                <br />
                <span className="value">{orderItem.totalPrice}</span>
              </div>
              {/* <div>
              <span className="title">Payment Type</span> <br />
              <span className="value">{orderItem.paymentType}</span>
            </div>
            <div>
              <span className="title">Payment Status</span> <br />
              <span className="value">{orderItem.paymentStatus}</span>
            </div> */}
            </div>
            <div
              style={{
                boxSizing: "border-box",
                padding: "100px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="orderTrack">
                {orderItem.orderStatus?.map((status) => (
                  <div
                    className={`orderStatus ${
                      status.Processing ? "active" : ""
                    }`}
                  >
                    <div
                      className={`point ${status.isCompleted ? "active" : ""}`}
                    ></div>
                    <div className="orderInfo">
                      <div className="status">{status.type}</div>
                      <div className="date">{formatDate(status.date)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* select input to apply order action */}
              <div
                style={{
                  padding: "0 50px",
                  boxSizing: "border-box",
                }}
              >
                <select onChange={(e) => setType(e.target.value)}>
                  <option value={""}>select status</option>
                  {orderItem.orderStatus?.map((status) => {
                    return (
                      <>
                        {!status.isCompleted ? (
                          <option key={status.type} value={status.type}>
                            {status.type}
                          </option>
                        ) : null}
                      </>
                    );
                  })}
                </select>
              </div>
              {/* button to confirm action */}

              <div
                style={{
                  padding: "0 50px",
                  boxSizing: "border-box",
                }}
              >
                <button onClick={() => onOrderUpdate(orderItem._id)}>
                  {/* <button > */}
                  confirm
                </button>
              </div>
            </div>
          </Card>
        ))}
    </Layout>
    // <Layout sidebar>
    // </Layout>
  );
};

export default Orders;
