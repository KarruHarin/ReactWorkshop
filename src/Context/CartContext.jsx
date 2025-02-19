import React, { useState } from "react";
import CartContext from "./Cart";

const CartContextProvider = ({children}) => {
    const [cart, setcart] = useState([]);
    return (
        <CartContext.Provider value={{cart, setcart}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;