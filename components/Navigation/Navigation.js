import classes from "./Navigation.module.css";
import Logo from "../Logo/Logo";
import Button from "../UI/Button/Button";

function Navigation({ links }) {
  return (
    <nav className={classes.Navigation}>
      <Logo addClasses={[classes["Navigation-Logo"]]} />
      <ul className={classes["Navigation-List"]}>
        {links.map((link, idx) => {
          return (
            <li key={idx} className={classes["Navigation-ListItem"]}>
              <a
                className={classes["Navigation-ListItemLink"]}
                onClick={(e) => e.preventDefault()}
                href={link.to}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
      <div className={classes["Navigation-ButtonsContainer"]}>
        <Button addClasses={[classes["Navigation-Button"]]} mode={1}>
          Log in
        </Button>
        <Button addClasses={[classes["Navigation-Button"]]} mode={2}>
          Log out
        </Button>
      </div>
    </nav>
  );
}

export default Navigation;
