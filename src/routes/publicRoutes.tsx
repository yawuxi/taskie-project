import { iRoute } from "./routes-type";
import { AuthenticationPage } from "../features/authentication";

export const PUBLIC_ROUTES: iRoute[] = [
  {path: '/authentication', element: <AuthenticationPage />},
]
