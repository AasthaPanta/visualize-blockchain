import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../views/home";
import Settings from "../views/settingsView";
import CreateTransactions from "../views/createTransactionsView";
import { BlockProvider } from "../services/BlockContext";

const MainRouter = () => {
  return (
    <BlockProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/settings" component={Settings} />
        <Route path="/createtxns" component={CreateTransactions} />
      </Switch>
    </BlockProvider>
  );
};

export default MainRouter;
