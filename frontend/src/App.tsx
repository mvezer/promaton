import React from "react";
import "./App.css";
import { AuthEntry, UserData } from "./Auth";
import { Assignment, AssignmentPicker, AssignmentViewer } from "./Assignments";

function App() {
	const [user, setUser] = React.useState<UserData | undefined>(undefined);
	const [assignment, setAssignment] = React.useState<Assignment | undefined>(
		undefined
	);
	return (
		<div className="App">
			<header className="App-header">
				<AuthEntry onLogin={setUser} loggedInUser={user} />
				{user ? (
					<div>
						<hr />
						<AssignmentPicker userData={user} onChoice={setAssignment} />
					</div>
				) : (
					<></>
				)}
				{assignment && user ? (
					<div>
						<AssignmentViewer userData={user} assignment={assignment} />
					</div>
				) : (
					<></>
				)}
			</header>
		</div>
	);
}

export default App;
