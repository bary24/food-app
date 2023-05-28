import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";
import { useRef, useState } from "react";
export default function MealItemForm(props) {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        console.log("HHHHHH");
        console.log(amountInputRef);
        const enteredAmount = amountInputRef.current.value;
        const numberEnteredAmount = +enteredAmount;
        if (enteredAmount.trim().length === 0 || numberEnteredAmount < 1 || enteredAmount > 5) {
            setAmountIsValid(false);
        }
        props.onAddItem(numberEnteredAmount);
    };
    console.log(props.id);
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: `amount ${props.id}`,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount</p>}
        </form>
    );
}
