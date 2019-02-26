import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Homepage from '../../features/home/Homepage';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';
import Navbar from '../../features/nav/Navbar/Navbar';
import TestComponent from '../../features/testarea/TestComponent';

class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={Homepage} />
				</Switch>
				<Route
					path="/(.+)"
					render={() => (
						<div>
							<Navbar />
							<Container className="main">
								<Switch>
									<Route
										path="/test"
										component={TestComponent}
									/>
									<Route
										path="/events"
										component={EventDashboard}
									/>
									<Route
										path="/event/:id"
										component={EventDetailedPage}
									/>
									<Route
										path="/manage/:id"
										component={EventForm}
									/>
									<Route
										path="/people"
										component={PeopleDashboard}
									/>
									<Route
										path="/profile/:id"
										component={UserDetailedPage}
									/>
									<Route
										path="/settings"
										component={SettingsDashboard}
									/>
									<Route
										path="/createEvent"
										component={EventForm}
									/>
								</Switch>
							</Container>
						</div>
					)}
				/>
			</div>
		);
	}
}

export default App;
