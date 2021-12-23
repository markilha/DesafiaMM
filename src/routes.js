import { Route } from "react-router";
import Home from "./pages/home/Home";

export function AppRoutes () {
    return (
        <>
          <Route exact path="/" component={Home}/>
        </>
    );
}