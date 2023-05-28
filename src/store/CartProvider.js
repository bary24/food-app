import CartContext from "./cart-context";
import { useReducer } from "react";
const defaultCartState = {
    items: [],
    totalAmount: 0,
};
const cartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        let updatedItems;
        let updatedTotalAmount;
        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.value.id;
        });
        const existingCartItem = state.items[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.value.amount,
            };
            updatedTotalAmount = state.totalAmount + updatedItem.price;
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.value);
            updatedTotalAmount = state.totalAmount + action.value.price * action.value.amount;
        }

        console.log("UPDATED ITEMSSS");
        console.log(updatedItems);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "REMOVE_ITEM") {
        let updatedItems;
        let updatedItem;
        const itemToRemoveIndex = state.items.findIndex((item) => {
            return item.id === action.id;
        });
        const itemToRemove = state.items[itemToRemoveIndex];
        let updatedTotalAmount;
        if (itemToRemove) {
            updatedTotalAmount = state.totalAmount - itemToRemove.price;
            if (itemToRemove.amount > 1) {
                updatedItem = { ...itemToRemove, amount: itemToRemove.amount - 1 };
                updatedItems = [...state.items];
                updatedItems[itemToRemoveIndex] = updatedItem;
            } else {
                updatedItems = state.items.filter((item) => item.id !== action.id);
            }
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    return defaultCartState;
};
export default function CartProvider(props) {
    const [cartState, distpatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemHandler = (item) => {
        console.log("ITEMMMM");
        console.log(item);
        distpatchCartAction({ type: "ADD_ITEM", value: item });
    };
    const removeItemHandler = (id) => {
        distpatchCartAction({ type: "REMOVE_ITEM", id: id });
    };
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
    };
    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
}
