import {
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import ManageIcon from "../../icons/grid 1.png";
import AddIcon from "../../icons/plus 1.png";
import AddBooks from "./AddBooks/AddBooks";
import "./Admin.css";
import AdminHeader from "./AdminHeader";
import ManageBook from "./ManageBook/ManageBook";

const useStyles = makeStyles(() => ({
  drawerPaper: { width: "inherit", backgroundColor: "#172B4D" },
  link: {
    textDecoration: "none",
    color: "#FFFF",
  },
}));

const Admin = () => {
  const classes = useStyles();
  return (
    <div className="container">
      <AdminHeader></AdminHeader>
      <h3 className="text-center mt-3">Admin Panel</h3>
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
              <Link to="/" className={classes.link}>
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
            </List>
          </Drawer>
          <Switch>
            <Route exact path="/">
              <Container>
                <ManageBook></ManageBook>
              </Container>
            </Route>
            <Route exact path="/addBooks">
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
