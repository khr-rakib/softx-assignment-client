import React from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import AllBook from './AllBook';
import EditBook from './EditBook';
import InsertBook from './InsertBook';
import RequestBook from './RequestBook';

const Dashboard = () => {
    let { path, url } = useRouteMatch();
    return (
        <div className="row">
            <div className="col-md-3 mb-4">
                <ul className="list-group shadow">
                    <li className="list-group-item"> <NavLink exact activeStyle={{ fontWeight: "900" }} to={`${url}`} >All Books</NavLink> </li>
                    <li className="list-group-item"> <NavLink activeStyle={{ fontWeight: "900" }} to={`${url}/book/insert`}>Add New Book</NavLink> </li>
                    <li className="list-group-item"> <NavLink activeStyle={{ fontWeight: "900" }} to={`${url}/book/request`}>Requested Book</NavLink> </li>
                </ul>
            </div>
            <div className="col-md-9">
                <Switch>
                    <Route exact path={path}>
                        <AllBook />
                    </Route>
                    <Route path={`${path}/book/insert`}>
                        <InsertBook />
                    </Route>
                    <Route path={`${path}/book/edit/:bookId`}>
                        <EditBook />
                    </Route>
                    <Route path={`${path}/book/request`}>
                        <RequestBook />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Dashboard;