import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from '../views/home';
import Settings from '../views/settingsView';
import CreateTransactions from '../views/createTransactionsView';


const MainRouter = () => {
    
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/settings" component={Settings} />
            <Route path="/createtxns" component={CreateTransactions} />
        </Switch>
    )
    
}

export default MainRouter;