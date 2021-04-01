import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { userContext } from "../../App";
import ManageIcon from "../../icons/grid 1.png";
import AddIcon from "../../icons/plus 1.png";
import AddBooks from "./AddBooks/AddBooks";
import "./Admin.css";
import ManageBook from "./ManageBook/ManageBook";

const useStyles = makeStyles(() => ({
  drawerPaper: { width: "inherit", backgroundColor: "#172B4D" },
  link: {
    textDecoration: "none",
    color: "#FFFF",
  },
}));

const Admin = () => {
  const [logOut, setLogOut] = useContext(userContext);
  const classes = useStyles();
  return (
    <div>
      <Router>
        <div style={{ display: "flex" }}>
          <Drawer
            style={{ width: "200px" }}
            variant="persistent"
            anchor="left"
            open={true}
            classes={{ paper: classes.drawerPaper }}
          >
            <List>
              <Link to="/manageBooks" className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <img style={{ width: "20px" }} src={ManageIcon} alt="" />
                  </ListItemIcon>
                  <ListItemText
                    className="sideBarBtn"
                    primary={"Manage Books"}
                  />
                </ListItem>
              </Link>
              <Link to="/addBooks" className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <img style={{ width: "20px" }} src={AddIcon} alt="" />
                  </ListItemIcon>
                  <ListItemText className="sideBarBtn" primary={"Add Books"} />
                </ListItem>
              </Link>
              <ListItem button>
                <ListItemIcon>
                  <FontAwesomeIcon className="text-light" icon={faSignOutAlt} />
                </ListItemIcon>
                <ListItemText
                  onClick={() => setLogOut({})}
                  className="sideBarBtn"
                  primary={"Logout"}
                />
              </ListItem>
            </List>
          </Drawer>
          <Switch>
            <Route active={true} exact path="/manageBooks">
              <Container>
                <ManageBook></ManageBook>
              </Container>
            </Route>
            <Route path="/addBooks">
              <Container>
                <AddBooks></AddBooks>
              </Container>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Admin;
