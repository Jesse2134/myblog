import { resolve } from "path";

const Dashboard = resolve => require(['@/views/layout/dashboard'], resolve);
const Home = resolve => require(['@/views/layout/home'],resolve);

const dashboardRouter = [{
  path: '/',
  component: Home,
  hidden: true,
  children: {

  }
}]

export default dashboardRouter;
