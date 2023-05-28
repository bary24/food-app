import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCardButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";
export default function HeaderCardButton(props) {
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;
    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    console.log("MSDKJKSKDJ");
    console.log(cartCtx.items);
    const totalNumberOfItems = cartCtx.items.reduce((sum, item) => {
        console.log("NNNNNNN");
        console.log(item);
        return sum + item.amount;
    }, 0);
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{totalNumberOfItems}</span>
        </button>
    );
}
