import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import Signin from './pages/Signin/Signin';
import SignUp from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Wallet from './pages/Wallet/Wallet';
import Info from './pages/Info/Info';
import NavBar from './pages/NavBar/NavBar';
import Share from './pages/Share/Share';

import Community from './pages/Community/Community';

import NewPost from './pages/Community/OpenSpace/Create/NewPost';
import ReadPost from './pages/Community/OpenSpace/Read/Post';
import EditPost from './pages/Community/OpenSpace/Update/EditPost';
import DeletePost from './pages/Community/OpenSpace/Delete/DeletePost';

import NewTeam from './pages/Community/TeamSpace/Create/NewTeam';
import ReadTeam from './pages/Community/TeamSpace/Read/Team';
import InviteMember from './pages/Community/TeamSpace/InviteMember/InviteMember';
import EditTeam from './pages/Community/TeamSpace/Update/EditTeam';
import DeleteTeam from './pages/Community/TeamSpace/Delete/DeleteTeam';
import TerminateProject from './pages/Community/TeamSpace/TerminateProject/TerminateProject';

import BizCardDetail from './pages/BizCard/Read/BizCardDetail';
import EditBizCard from './pages/BizCard/Update/EditBizCard';
import EditInfo from './pages/Info/Update/EditInfo';

const App = () =>
{
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/share" element={<ProtectedRoute element={<Share />} />} />

        <Route path="/community/openspace/newpost" element={<ProtectedRoute element={<NewPost />} />} />
        <Route path="/community/openspace/:postId" element={<ProtectedRoute element={<ReadPost />} />} />
        <Route path="/community/openspace/:postId/editpost" element={<ProtectedRoute element={<EditPost />} />} />
        <Route path="/community/openspace/:postId/deletepost" element={<ProtectedRoute element={<DeletePost />} />} />

        <Route path="/community/teamspace/newteam" element={<ProtectedRoute element={<NewTeam />} />} />
        <Route path="/community/teamspace/:teamId" element={<ProtectedRoute element={<ReadTeam />} />} />
        <Route path="/community/teamspace/:teamId/invitemember" element={<ProtectedRoute element={<InviteMember />} />} />
        <Route path="/community/teamspace/:teamId/editteam" element={<ProtectedRoute element={<EditTeam />} />} />
        <Route path="/community/teamspace/:teamId/deleteteam" element={<ProtectedRoute element={<DeleteTeam />} />} />
        <Route path="/community/teamspace/:teamId/terminateproject" element={<ProtectedRoute element={<TerminateProject />} />} />

        <Route path="/bizcard/:userId" element={<ProtectedRoute element={<BizCardDetail />} />} />
        <Route path="/bizcard/:userId/edit" element={<ProtectedRoute element={<EditBizCard />} />} />

        <Route path="/info/edit" element={<ProtectedRoute element={<EditInfo />} />} />

        <Route path="*" element={<ProtectedRoute element={<Layout />} />} />
      </Routes>
    </Router>
  );
}

const Layout = () =>
{
  return (
    <div>
      <NavBar />
      <Main />
    </div>
  );
}

const Main = () =>
{
  return (
    <div style={{ paddingBottom: '60px' }}>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/wallet" element={<ProtectedRoute element={<Wallet />} />} />
        <Route path="/community/*" element={<ProtectedRoute element={<Community />} />} />
        <Route path="/info" element={<ProtectedRoute element={<Info />} />} />
      </Routes>
    </div>
  );
}

export default App;
