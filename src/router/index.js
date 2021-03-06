// vue-router的配置
// vue路由懒加载,当路由被访问的时候才加载对应组   把组件按组分块,分包减小vendor体积，包括cdn形式取资源
const Index = () => import(/* webpackChunkName: "group-index" */ '../components/index')
const IndustryDynamics = () => import(/* webpackChunkName: "group-IndustryDynamics" */ '../components/IndustryDynamics')
const LifeExhibition = () => import(/* webpackChunkName: "group-LifeExhibition" */ '../components/LifeExhibition')
const TechnicalExchange = () => import(/* webpackChunkName: "group-TechnicalExchange" */ '../components/TechnicalExchange')
const SystemMonitoring = () => import(/* webpackChunkName: "group-SystemMonitoring" */ '../components/SystemMonitoring')
const NewsDetails = () => import(/* webpackChunkName: "group-NewsDetails" */ '../components/NewsDetails')
const TechnicalExchangeDetails = () => import(/* webpackChunkName: "group-TechnicalExchangeDetails" */ '../components/TechnicalExchangeDetails')
const Login = () => import(/* webpackChunkName: "group-Login" */ '../components/login/login')
const Register = () => import(/* webpackChunkName: "group-Login" */ '../components/login/register')
const LifeExhibitionDetails = () => import(/* webpackChunkName: "group-LifeExhibitionDetails" */ '../components/LifeExhibitionDetails')

// eslint-disable-next-line no-undef
export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/industryDynamics',
      name: 'industryDynamics',
      component: IndustryDynamics
    },
    {
      path: '/lifeExhibition',
      name: 'lifeExhibition',
      component: LifeExhibition
    },
    {
      path: '/technicalExchange',
      name: 'technicalExchange',
      component: TechnicalExchange
    },
    {
      path: '/systemMonitoring',
      name: 'systemMonitoring',
      component: SystemMonitoring
    },
    {
      path: '/newsDetails/:id',
      name: 'newsDetails',
      component: NewsDetails
    },
    {
      path: '/technicalExchangeDetails/:id',
      name: 'technicalExchangeDetails',
      component: TechnicalExchangeDetails
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/lifeExhibitionDetails/:id',
      name: 'lifeExhibitionDetails',
      component: LifeExhibitionDetails
    }
  ]
})
