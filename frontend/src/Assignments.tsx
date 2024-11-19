import React from "react";
import { UserData } from "./Auth";
import axios from 'axios';

// TODO(task): adjust (or keep :)) the types as needed
// IDEA: you can extend the types with any fields you consider necessary.
export type Assignment = {
	id: string;
	description?: string;
	accessLevel?: string;
};
export type AssignmentPickerProps = Readonly<{
	userData: UserData;
	onChoice: (assignment?: Assignment) => void;
}>;
export type AssignmentViewerProps = Readonly<{
	userData: UserData;
	assignment: Assignment;
}>;
type AssignmentsResult = { assignments?: Assignment[]; error?: string };

// TODO(task): adjust the backend service details as necessary
const DEFAULT_ASSIGNEMENT_SERVICE_PORT = 3000;
const DEFAULT_ASSIGNEMENT_HOST = `http://localhost:${DEFAULT_ASSIGNEMENT_SERVICE_PORT}/assignments`;
const DEFAULT_ASSIGNMENT_ERROR = "Unknown assignment error happend! 👀";

/**
 * Some assignments for testing purposes.
 */
const TEST_ASSIGNMENTS: Assignment[] = [
	{
		id: "1",
		description: "first assignment ever 🐿️",
		accessLevel: "read/write",
	},
	{ id: "2", description: "you can do this one later 🦦", accessLevel: "read" },
];

/**
 * // TODO(task: implement-here): make sure that the right backend service(s) are used to retrieve the assignments
 * This function gets the user's assinments.
 *
 * @param userData data of the user to retrieve the assignments for
 * @returns result of the assignments or an error
 */
const assignmentCall = async (
	userData: UserData
): Promise<AssignmentsResult> => {
	// console.warn("Don't forget to implement `assignmentCall` 👽");
	let images
	let error
	console.log(userData.token)
	try {
		images = await axios.get('http://localhost:5000/images', {
			headers: { Authorization: `Bearer ${userData.token}` }
		})
		console.log(images)
	} catch (e) {
		error = (e as Error).message
	}
	const assignments: Assignment[] = TEST_ASSIGNMENTS;
	return { assignments, error };
};

/**
 * A component to display all assignments available for a user.
 *
 * @param param0 props to configure the assignment picker
 * @returns a component to retrieve and list all user assignments
 */
export const AssignmentPicker = ({
	userData,
	onChoice,
}: AssignmentPickerProps) => {
	const [assignments, setAssignments] = React.useState<Assignment[]>([]);
	const [error, setError] = React.useState("");

	const attemptLoad = async () => {
		onChoice(undefined);
		const result = await assignmentCall(userData);
		if (Array.isArray(result.assignments)) {
			setError("");
			setAssignments(result.assignments);
		} else {
			setError(result.error ?? DEFAULT_ASSIGNMENT_ERROR);
		}
	};

	const chooseAssignment = (assignment: Assignment) => {
		console.info("selected assignment:", assignment);
		onChoice(assignment);
	};

	return (
		<div>
			<div>
				<h2>Please check out your assignments:</h2>
				{error ? <h3 className="error">{error}</h3> : <></>}
				<button onClick={attemptLoad}>Load assignments!</button>
			</div>
			<div>
				<br />
				<div className="AssignmentPicker">
					{assignments.map((a) => (
						<div key={a.id}>
							<h4>
								<code>Assignment: {a.id}</code>
							</h4>
							{a.description ? <p>ℹ️ {a.description}</p> : <></>}
							{a.accessLevel ? <p>#️⃣ {a.accessLevel}</p> : <></>}
							<hr />
							<button onClick={() => chooseAssignment(a)}>View</button>
							<hr />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

/**
 * A component to view a single assignment.
 *
 * @param props viewer properties
 * @returns a display of a single assignment
 */
export const AssignmentViewer = ({ assignment }: AssignmentViewerProps) => {
	const accessLevelIcon = assignment.accessLevel?.includes("write")
		? "🪄"
		: "👀";
	return (
		<div>
			<h2>
				This is <code>Assignment {assignment.id}</code>:
			</h2>
			<h3>{accessLevelIcon}</h3>
			<div className="AssignmentDisplay">
				<img
					src={`${DEFAULT_ASSIGNEMENT_HOST}/${assignment.id}/image`}
					alt={`Assignment ${assignment.id}`}
				/>
			</div>
		</div>
	);
};
