import { Fragment } from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCardButton from "./HeaderCardButton";
export default function Header(props) {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Meals app</h1>
                <HeaderCardButton />
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="meals" />
            </div>
        </Fragment>
    );
}
