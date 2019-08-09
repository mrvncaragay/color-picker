import { DRAWER_WIDTH } from "../constants";
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
    }
  },
  button: {
    margin: "0 0.5rem"
  }
});

export default styles;
