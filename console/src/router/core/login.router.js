const Login = resolve => require(['@/views/login/login'], resolve);

const loginRouter = [{
  path: '/login',
  component: Login,
  hidden: true,
}]

export default loginRouter;
