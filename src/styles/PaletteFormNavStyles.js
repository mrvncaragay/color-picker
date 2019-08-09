import { DRAWER_WIDTH } from "../constants";
import sizes from "./sizes";
const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
  root: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirecton: "row",
    justifyContent: "space-between",
    height: "64px"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 20,
    marginLeft: 12
  },

  navBtns: {
    marginRight: "1rem",
    marginLeft: "auto",
    "& a": {
      textDecoration: "none"
    },
    [sizes.down("xs")]: {
      marginRight: "0.5rem"
    }
  },
  button: {
    margin: "0.5rem"
  },
  [sizes.down("xs")]: {
    margin: "0 0.2rem",
    padding: "0.2rem"
  }
});

export default styles;
