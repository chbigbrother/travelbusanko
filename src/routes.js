import HomePage from './homes/HomePage';
import MapPage from './maps/MapPage';
import AddLocPage from './regLocations/AddLocPage';
import EventListPage from './events/EventListPage';
import CreatePage from './blogs/CreatePage';
import EditPage from './blogs/EditPage';
import ListPage from './blogs/ListPage';
import LoginPage from './members/LoginPage';
import SignupPage from './members/SignupPage';
//import AdminPage from './blogs/AdminPage';
//import ShowPage from './blogs/ShowPage';
import ShowPage from './blogs/ShowPage';
;

const routes = [
{
  path: '/',
  component: HomePage
},
{
  path: '/maps',
  component: MapPage
},
{
  path: '/locations',
  component: AddLocPage
},
{
  path: '/events',
  component: EventListPage
},
{
  path: '/blogs',
  component: ListPage
},
{
  path: '/blogs/create',
  component: CreatePage
},
{
  path: '/members',
  component: LoginPage
},
{
  path: '/members/signup',
  component: SignupPage
},
{
  path: '/blogs/:id/edit',
  component: EditPage
},
{
  path: '/blogs/:id',
  component: ShowPage
},
];
export default routes;