import React, { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

function BackDrop(props) {
    return <div className={classes.backdrop} onClick={props.onHideCart}></div>;
}

function Overlay(props) {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children} </div>
        </div>
    );
}

export default function Modal(props) {
    const portalElement = document.getElementById("modal-div");
    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onHideCart={props.onHideCart} />, portalElement)}
            {ReactDOM.createPortal(<Overlay> {props.children}</Overlay>, portalElement)}
        </Fragment>
    );
}
