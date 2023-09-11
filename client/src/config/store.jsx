/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

let initialUser = "";
let initialCart = [];
let shippingData = {}
let paymentData = ""

export const StateContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [cartItems, setCartItems] = useState(initialCart);
  const [show, setShow] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(paymentData)
  const [shippingDetails, setShippingDetails] = useState(shippingData)

  console.log("cu", currentUser);
  console.log("ci", cartItems);

  //save user to local storage
  useEffect(() => {
    if (currentUser !== initialUser) {
      localStorage.setItem("userinfo", JSON.stringify(currentUser));
    }
  }, [currentUser]);


  //save payment method
  useEffect(() => {
    if (paymentMethod !== paymentData) {
      localStorage.setItem("paymentType", JSON.stringify(paymentMethod));
    }
  }, [paymentMethod]);

  //get paymentMethod
  useEffect(() => {
    const getPaymentMethod = JSON.parse(localStorage.getItem ("paymentType"))
    if (getPaymentMethod) {
      setPaymentMethod(getPaymentMethod);
    }
  }, []);

  //save shippingdetails
  useEffect(() => {
    if (shippingDetails !== shippingData) {
      localStorage.setItem("shippingInfo", JSON.stringify(shippingDetails));
    }
  }, [shippingDetails]);


  //get shippingDetails
  useEffect(() => {
    const shipData = JSON.parse(localStorage.getItem("shippingInfo"))
    if (shipData) {
      setShippingDetails(shipData);
    }
  }, []);


  //retrive user from local storage
  useEffect(() => {
    const retrieveUser = JSON.parse(localStorage.getItem("userinfo"));
    if (retrieveUser) {
      setCurrentUser(retrieveUser);
    }
  }, []);


  useEffect(() => {
    if (cartItems !== initialCart) {
      localStorage.setItem("Shoppingcart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  //retrive user from local storage
  useEffect(() => {
    const retrieveCart = JSON.parse(localStorage.getItem("shoppingcart"));
    if (retrieveCart) {
      setCartItems(retrieveCart);
    }
  }, []);

  //add to cart/increament qty
  const increaseCartQty = (id) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item._id === id._id) == null) {
        return [...currentItems, { ...id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item._id === id._id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQty = (id) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item._id === id._id).quantity === 1) {
        return currentItems.filter((item) => item._id !== id._id);
      } else {
        return currentItems.map((item) => {
          if (item._id === id._id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const deleteCartItems = (id) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item._id !== id._id);
    });
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const priceTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const logOut = () => {
    localStorage.removeItem("userinfo");
    location.replace("/");
    toast.success("Logged out successfully");
  };

  return (
    <Context.Provider
      value={{
        currentUser,
        setCurrentUser,
        logOut,
        increaseCartQty,
        decreaseCartQty,
        deleteCartItems,
        cartQuantity,
        priceTotal,
        cartItems,
        setCartItems,
        show,
        setShow,
        paymentMethod,
        setPaymentMethod, 
        shippingDetails, 
        setShippingDetails,
        

      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);
