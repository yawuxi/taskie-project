import { iRoute } from "./routes-type";
import { Home, Projects, Team, Messages, Settings } from '../pages'

export const PRIVATE_ROUTES: iRoute[] = [
  {path: '/home', title: 'Home', element: <Home />},
  {path: '/projects', title: 'Projects', element: <Projects />},
  {path: '/team', title: 'Team', element: <Team />},
  {path: '/messages', title: 'Messages', element: <Messages />},
  {path: '/settings', title: 'Settings', element: <Settings />},
]
