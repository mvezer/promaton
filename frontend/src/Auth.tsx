import React from "react";
import axios from 'axios';

// TODO(task): adjust (or keep :)) the types as needed
// IDEA: you can extend the types with any fields you consider necessary
export type UserData = Readonly<{ token: string; userName: string }>;
export type AuthProps = Readonly<{
	onLogin: (userData: UserData) => void;
	loggedInUser?: UserData;
}>;
type LoginResult = { token?: UserData; error?: string };

const DEFAULT_LOGIN_ERROR = "Unknown auth error happend! 👀";


/**
 * // TODO(task: implement-here): make sure that the `auth` service is used to login
 * This function gets the user authentication details.
 *
 * @param userName user name used to authenticate
 * @param password trial password of the user
 * @returns result of the login containing the user info or an error
 */
const authCall = async (
	userName: string,
	password: string
): Promise<LoginResult> => {
	// console.warn("Don't forget to implement `authCall` 👾");

	// IDEA: this should come from the `auth` service
	let token
	let error
	try {
		const { data } = await axios.post('http://localhost:5000/users/token', { name: userName, password: password })
		token = data.token
	} catch (e) {
		error = (e as Error).message
	}
	// // IDEA: change this value if you'd like to provide an error message
	return { token, error };
};

/**
 * A basic form responsible for the login.
 *
 * @param props component props
 * @returns a react component
 */
const BasicLogin = ({ onLogin }: AuthProps) => {
	/**
	 * // TODO(task): please update once the auth service is ready
	 * @deprecated please remove this once you complete your auth solution :)
	 */
	const testing = true;

	const [userName, setUserName] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState("");
	const attemptLogin = async (submitEvent: React.FormEvent) => {
		submitEvent.preventDefault();
		const result = await authCall(userName, password);
		if (result.token) {
			setError("");
			onLogin(result.token);
		} else {
			setError(result.error ?? DEFAULT_LOGIN_ERROR);
		}
	};

	return (
		<div>
			<h2>Please Log In 🙈</h2>
			{error ? <h3 className="error">{error}</h3> : <></>}
			{testing ? <h4>If you are just testing, anything is valid 🤫</h4> : <></>}
			<form onSubmit={attemptLogin}>
				<label>
					<p>
						Username{" "}
						<input
							type="text"
							required={true}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</p>
				</label>
				<label>
					<p>
						Password{" "}
						<input
							type="password"
							required={true}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</p>
				</label>
				<div>
					<input type="submit" value="Login" />
				</div>
			</form>
		</div>
	);
};

/**
 * An entry component of the authentication
 *
 * @param props authentication component props
 * @returns a welcome block if authenticated or a login form otherwise
 */
export const AuthEntry = ({ onLogin, loggedInUser }: AuthProps) => (
	<div>
		<h1>Hello 👋</h1>
		{loggedInUser ? (
			<div>
				<h2>
					<code>{loggedInUser.userName}</code>
				</h2>
			</div>
		) : (
			<BasicLogin onLogin={onLogin} />
		)}
	</div>
);
