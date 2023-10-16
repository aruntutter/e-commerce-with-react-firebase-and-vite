import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { FaPlus, FaMinus } from "react-icons/fa";

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;
  const dispatch = useDispatch();

  // Get cart items from Redux
  const cartItemsFromRedux = useSelector((state) => state.cart);
  console.log(cartItemsFromRedux);

  // Use local state for cart items
  const [cartItems, setCartItems] = useState(cartItemsFromRedux);

  // Delete cart
  const deleteCart = (item) => {
    console.log("Before Deletion:", cartItems);

    dispatch(deleteFromCart(item));
    toast.success("Item removed from the cart");

    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);

    console.log("After Deletion:", cartItems);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate the initial total amount
  let initialTotalAmount = 0;
  cartItems.forEach((cartItem) => {
    const itemPrice = parseFloat(cartItem.price);
    const itemQuantity = cartItem.quantity;

    // Check if itemPrice and itemQuantity are valid numbers
    if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
      initialTotalAmount += itemPrice * itemQuantity;
    } else {
      console.log("Invalid item price or quantity:", cartItem);
    }
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const shipping = parseInt(100);
  const [grandTotal, setGrandTotal] = useState(shipping);

  // Calculate Total Amount
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      const itemPrice = parseFloat(cartItem.price);
      const itemQuantity = cartItem.quantity;

      // Check if itemPrice and itemQuantity are valid numbers
      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        temp += itemPrice * itemQuantity;
      } else {
        console.log("Invalid item price or quantity:", cartItem);
      }
    });

    setTotalAmount(temp);
    setGrandTotal(temp + shipping);
  }, [cartItems]);

  // Payment Intigration
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buyNow = async () => {
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    let options = {
      key: "rzp_test_fRRAzd3CpJVbRL",
      key_secret: "DBoMHRM1NOm79LHesXZ9xx4l",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "EverGreenArt",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response);
        toast.success("Payment Successful");

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId,
        };

        try {
          const orderRef = collection(fireDB, "order");
          addDoc(orderRef, orderInfo);
        } catch (error) {
          console.log(error);
        }
      },

      theme: {
        color: "#3399cc",
      },
    };

    let pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  // Increase Quantity
  const increaseQuantity = (item) => {
    const itemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (itemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[itemIndex] = {
        ...updatedCart[itemIndex],
        quantity: (updatedCart[itemIndex].quantity || 0) + 1,
      };
      setCartItems(updatedCart);
    }
  };

  // // Decrease Quantity
  const decreaseQuantity = (item) => {
    const itemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (itemIndex !== -1) {
      const updatedCart = [...cartItems];

      if (updatedCart[itemIndex].quantity > 1) {
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: updatedCart[itemIndex].quantity - 1,
        };
      } else {
        // Prevent quantity from going below 1
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: 1,
        };
      }

      setCartItems(updatedCart); // Update the cart with the entire updatedCart
    }
  };

  return (
    <Layout>
      <div
        className="h-vh bg-blue-100 pt-5 pb-[0%] "
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 ">
            {cartItems.map((item, index) => {
              const { title, price, description, imageUrl } = item;
              return (
                <div
                  className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2
                        className="text-lg font-bold text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h2>
                      <h2
                        className="text-sm  text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {description}
                      </h2>
                      <p
                        className="mt-1 text-xs font-semibold text-gray-700"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹{price}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-between items-center sm:space-y-0 sm:mt-0 sm:space-x-6">
                      {/* Decrease Quantity Button */}
                      <div onClick={() => decreaseQuantity(item)}>
                        <FaMinus className="w-5 h-5 cursor-pointer hover:text-red-500 hover:stroke-red-500" />
                      </div>

                      {/* Quantity Display */}
                      <span className="text-lg font-semibold mt-2 sm:mt-0">
                        {item.quantity >= 0 ? item.quantity : 0}
                      </span>

                      {/* Increase Quantity Button */}
                      <div onClick={() => increaseQuantity(item)}>
                        <FaPlus className="w-5 h-5 cursor-pointer hover:text-green-500 hover:stroke-green-500" />
                      </div>

                      {/* Delete Button */}
                      <div onClick={() => dispatch(deleteCart(item))}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer hover:text-red-500 hover:stroke-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 mb-5"
            style={{
              backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <div className="mb-2 flex justify-between">
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Subtotal
              </p>
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                ₹{totalAmount}
              </p>
            </div>
            <div className="flex justify-between">
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Shipping
              </p>
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                ₹{shipping}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p
                className="text-lg font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total
              </p>
              <div className>
                <p
                  className="mb-1 text-lg font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  ₹{grandTotal}
                </p>
              </div>
            </div>
            {/* <Modal  /> */}
            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
