import Login from './core/login.router';
import Dashboard from './core/dashboard.router'; 

let routers = [];
routers = routers.concat(Login);
routers = routers.concat(Dashboard);

export default routers;
