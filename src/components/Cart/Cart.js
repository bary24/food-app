import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "../CartItem/CartItem";

export default function Cart(props) {
    const cartCtx = useContext(CartContext);
    const addItemHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };
    const removeItemHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((cartItem) => (
                <CartItem
                    key={cartItem.id}
                    name={cartItem.name}
                    amount={cartItem.amount}
                    price={cartItem.price}
                    onRemove={removeItemHandler.bind(null, cartItem.id)}
                    onAdd={addItemHandler.bind(null, cartItem)}
                />
            ))}
        </ul>
    );
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    return (
        <Modal onHideCart={props.onHideCart}>
            <div>{cartItems}</div>
            <div className={classes.total}>
                <span>Total price</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]}> Order </button>
                <button onClick={props.onHideCart} className={classes.button}>
                    Close
                </button>
            </div>
        </Modal>
    );
}
