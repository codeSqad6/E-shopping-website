// import { useEffect } from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addToCart,
//   decreaseQty,
//   deleteFromCartAPI,
//   deleteProduct,
//   fetchCart,
// } from "../app/features/cart/cartSlice";

// const Cart = () => {
//   const { cartList } = useSelector((state) => state.cart);
//   const isAuth = useSelector((state) => state.auth.isAuthenticated);

//   const dispatch = useDispatch();
//   dispatch(fetchCart());
//   dispatch(deleteFromCartAPI({ productId: item.id }));

//   // middlware to localStorage
//   const totalPrice = cartList.reduce(
//     (price, item) => price + item.qty * item.price,
//     0
//   );
//   // useEffect(() => {
//   //   window.scrollTo(0, 0);
//   //   // if(CartItem.length ===0) {
//   //   //   const storedCart = localStorage.getItem("cartItem");
//   //   //   setCartItem(JSON.parse(storedCart));
//   //   // }
//   // }, []);

//   return (
//     <section className="cart-items">
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={8}>
//             {cartList.length === 0 && (
//               <h1 className="no-items product">No Items are add in Cart</h1>
//             )}
//             {cartList.map((item) => {
//               const productQty = item.price * item.qty;
//               return (
//                 <div className="cart-list" key={item.id}>
//                   <Row>
//                     <Col className="image-holder" sm={4} md={3}>
//                       <img
//                         src={`http://test.smartsto0re.shop${item.imageUrls}`}
//                         alt=""
//                       />
//                     </Col>

//                     <Col sm={8} md={9}>
//                       <Row className="cart-content justify-content-center">
//                         <Col xs={12} sm={9} className="cart-details">
//                           <h3>{item.productName}</h3>
//                           <h4>
//                             ${item.price}.00 * {item.qty}
//                             <span>${productQty}.00</span>
//                           </h4>
//                         </Col>
//                         <Col xs={12} sm={3} className="cartControl">
//                           <button
//                             className="incCart"
//                             onClick={() => {
//                               if (!isAuth) return alert("يجب تسجيل الدخول");
//                               dispatch(addToCart({ product: item, num: 1 }));
//                             }}
//                           >
//                             <i className="fa-solid fa-plus"></i>
//                           </button>
//                           <button
//                             className="desCart"
//                             onClick={() => {
//                               if (!isAuth) return alert("يجب تسجيل الدخول");
//                               dispatch(decreaseQty(item));
//                             }}
//                           >
//                             <i className="fa-solid fa-minus"></i>
//                           </button>
//                         </Col>
//                       </Row>
//                     </Col>
//                     <button
//                       className="delete"
//                       onClick={() => {
//                         if (!isAuth) return alert("يجب تسجيل الدخول");

//                         dispatch(deleteProduct(item));
//                       }}
//                     >
//                       <ion-icon name="close"></ion-icon>
//                     </button>
//                   </Row>
//                 </div>
//               );
//             })}
//           </Col>
//           <Col md={4}>
//             <div className="cart-total">
//               <h2>Cart Summary</h2>
//               <div className=" d_flex">
//                 <h4>Total Price :</h4>
//                 <h3>${totalPrice}.00</h3>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default Cart;
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addToCartAPI,
  deleteFromCartAPI,
  updateCartItemAPI,
} from "../app/features/cart/cartSlice";
import axios from "axios";
import { useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartList, status } = useSelector((state) => state.cart);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [productDetailsMap, setProductDetailsMap] = useState({});

  useEffect(() => {
    if (isAuth && Array.isArray(cartList)) {
      cartList.forEach((item) => {
        if (!item.product && !productDetailsMap[item.productId]) {
          axios
            .get(`http://test.smartsto0re.shop/api/Products/${item.productId}`)
            .then((res) => {
              setProductDetailsMap((prev) => ({
                ...prev,
                [item.productId]: res.data,
              }));
            })
            .catch((err) => {
              console.error(
                `❌ فشل تحميل بيانات المنتج: ${item.productId}`,
                err
              );
            });
        }
      });
    }
  }, [cartList, isAuth]);

  // const totalPrice = cartList.reduce(
  //   (sum, item) => sum + item.qty * item.price,
  //   0
  // );
  const safeCart = Array.isArray(cartList) ? cartList : [];
  const count = safeCart.length;
  const totalPrice = safeCart.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  if (!isAuth) {
    return <p>Please **log in** to view your cart.</p>;
  }

  if (status === "loading") {
    return <p>Loading your cart...</p>;
  }

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {count === 0 && (
              <h1 className="no-items product">Your cart is empty.</h1>
            )}

            {safeCart.map((item) => {
              const productQty = item.unitPrice * item.quantity; //...........
              console.log("📸 image URL:", item.product?.imageUrls);
              console.log("🧩 item.product:", item.product);

              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img
                        src={
                          item.product?.imageUrls?.[0]
                            ? `http://test.smartsto0re.shop${item.product.imageUrls[0]}`
                            : productDetailsMap[item.productId]?.imageUrls?.[0]
                            ? `http://test.smartsto0re.shop${
                                productDetailsMap[item.productId].imageUrls[0]
                              }`
                            : "https://via.placeholder.com/150"
                        }
                        alt={item.productName}
                      />
                    </Col>

                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            ${item.unitPrice} × {item.quantity} = $
                            {productQty.toFixed(2)}
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() => {
                              dispatch(
                                addToCartAPI({
                                  productId: item.productId,
                                  quantity: 1,
                                })
                              ).then(() => dispatch(fetchCart()));
                            }}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="desCart"
                            onClick={async () => {
                              const newQty = item.quantity - 1;

                              try {
                                if (newQty > 0) {
                                  await dispatch(
                                    updateCartItemAPI({
                                      cartItemId: item.id, // ✅ هذا هو ID عنصر السلة وليس المنتج
                                      quantity: newQty, // تأكد من الحرف الكبير حسب الـ API
                                    })
                                  ).unwrap();
                                } else {
                                  await dispatch(
                                    deleteFromCartAPI({
                                      cartItemId: item.id,
                                    })
                                  ).unwrap();
                                }

                                dispatch(fetchCart());
                              } catch (error) {
                                console.error("❌ خطأ في تقليل الكمية:", error);
                              }
                            }}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>

                    <button
                      className="delete"
                      onClick={() => {
                        // بعد حذف المنتج
                        dispatch(deleteFromCartAPI({ cartItemId: item.id }));
                      }}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>

          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className="d_flex">
                <h4>Total Price:</h4>
                <h3>${totalPrice.toFixed(2)}</h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
