import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ScrollButton from '../src/components/scrollButton/ScrollButton'
import ListReportPage from './pages/listReportPage/ListReportPage';
import FollowPage from './pages/followPage/FollowPage'
import ChartPage from './pages/chartPage/ChartPage'
import NotificationPage from './pages/notificationPage/NotificationPage'
import AccountPage from './pages/accountPage/AccountPage'
import LoginPage from './pages/loginPage/LoginPage';
import ProtectRoutes from './ProtectRoutes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<LoginPage />} />

            {/* protected router */}
            <Route element={<ProtectRoutes />}>
              <Route path="listReportPage" element={<ListReportPage />} />
              <Route path="followPage" element={<FollowPage />} />
              <Route path="chartPage" element={<ChartPage />} />
              <Route path="notificationPage" element={<NotificationPage />} />
              <Route path="accountPage" element={<AccountPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <ScrollButton />
    </>
  );
}

export default App;
