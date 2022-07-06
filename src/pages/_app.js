import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './dashboard';
import About from './about';

import Login from './authentification/login';
import Logout from './authentification/logout';
import ResetPassword from './authentification/password/resetPassword';
import ForgotPassword from './authentification/password/forgotPassword';

import Profile from './profile';
import ChangePassword from './profile/changePassword';

import People from './people';

import SwitchEPSDepatments from './eps/SwitchDepatments';
import OGX_EPS from './eps/ogx_eps';
import ICX_EPS from './eps/icx_eps';
import SingleOGXEP from '../components/SingleOGXEP';
import SingleICXEP from '../components/SingleICXEP';

import SwitchOppDepatments from './opportunities/SwitchDepatments';
import ICX_OPPORTUNITIES from './opportunities/icx_opportunities';
import OGX_OPPORTUNITIES from './opportunities/ogx_opportunities';

import Settings from './settings';
import HelpCenter from './helpCenter';

import AdminRoute from '../utils/route/AdminRoute';
import PrivateRoute from '../utils/route/PrivateRoute';
import LoginRoute from '../utils/route/LoginRoute';
import ICXRoute from '../utils/route/ICXRoute';
import OGXRoute from '../utils/route/OGXRoute';

import Posts from './posts';
import SinglePost from '../components/SinglePost';

import CheckUserRole from './checkUserRole';
import Notifications from './notifications';

import PageNotFound from './pageNotFound';

const App = () => (
  <BrowserRouter>
    <Switch>

      <AdminRoute pathname="eps" path="/eps" key="eps" exact component={SwitchEPSDepatments} />
      <ICXRoute path="/icx-eps" key="icx-eps" exact component={ICX_EPS} />
      <ICXRoute path="/icx-eps/:name" key="singleICXEP" exact component={SingleICXEP} />
      <OGXRoute path="/ogx-eps" key="ogx-eps" exact component={OGX_EPS} />
      <OGXRoute path="/ogx-eps/:id" key="singleOGXEP" exact component={SingleOGXEP} />

      <AdminRoute pathname="opportunities" path="/opportunities" key="opportunities" exact component={SwitchOppDepatments} />
      <ICXRoute path="/icx-opportunities" key="icx-opportunities" exact component={ICX_OPPORTUNITIES} />
      {/* <ICXRoute path="/icx-opportunities/:name" key="singleICXOPP" exact component={SingleICXEP} /> */}
      <OGXRoute path="/ogx-opportunities" key="ogx-opportunities" exact component={OGX_OPPORTUNITIES} />
      {/* <OGXRoute path="/ogx-opportunities/:id" key="singleOGXOPP" exact component={SingleOGXEP} /> */}

      <PrivateRoute path="/" exact component={Dashboard} />
      <PrivateRoute path="/about" exact component={About} />
      <PrivateRoute path="/notifications" exact component={Notifications} />
      <PrivateRoute path="/people" key="people" exact component={People} />

      <PrivateRoute path="/posts" key="posts" exact component={Posts} />
      <PrivateRoute path="/posts/:id" key="single-post" exact component={SinglePost} />

      <PrivateRoute path="/settings/profile" exact component={Profile} />
      <PrivateRoute path="/settings/change-password" exact component={ChangePassword} />
      <PrivateRoute path="/settings" exact component={Settings} />
      <PrivateRoute path="/help" exact component={HelpCenter} />

      <LoginRoute path="/login" exact component={Login} />
      <LoginRoute path="/forgot" component={ForgotPassword} />
      <LoginRoute path="/reset/:id" exact component={ResetPassword} />
      <LoginRoute path="/check-role" exact component={CheckUserRole} />

      <Route path="/logout" exact component={Logout} />
      <Route component={PageNotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;

// import VoteLogin from './authentification/voteLogin';
// import VoteRooms from './vote/Display/VoteRooms';
// import VotedSuccess from './vote/Display/VotedSuccess';
// import LiveVote from './vote/Display/LiveVote';
// import RoomClosed from './vote/Room/RoomClosed';
// import SingleRoom from './vote/Room/SingleRoom';
// import CandidateProfile from './vote/Candidate/CandidateProfile';
// import VoteResults from './vote/Display/VoteResults';

// {/* <PrivateRoute path="/vote-rooms" exact component={VoteRooms} /> */}
// {/* <PrivateRoute path="/vote-rooms/:id/:name" exact component={SingleRoom} /> */}
// {/* <PrivateRoute path="/vote-rooms/:id/:name/:candidate" exact component={CandidateProfile} /> */}
// {/* <PrivateRoute path="/room-closed/:id/:name" exact component={RoomClosed} /> */}
// {/* <PrivateRoute path="/live-vote/:id/:name" exact component={LiveVote} /> */}
// {/* <PrivateRoute path="/vote-result/:id/:name" exact component={VoteResults} /> */}
// {/* <PrivateRoute path="/vote-success/:id/:name" exact component={VotedSuccess} /> */}
// {/* <LoginRoute path="/vote-login" exact component={VoteLogin} />  */}
