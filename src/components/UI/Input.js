import classes from "./Input.module.css";
import React from "react";
export default React.forwardRef(function Input(props, ref) {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    );
});
