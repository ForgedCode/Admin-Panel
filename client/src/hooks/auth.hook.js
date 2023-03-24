import { useState, useCallback, useEffect } from "react";

export const useAuth = () => {
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);
	const [username, setUsername] = useState("");

	const login = useCallback((jwtToken, id, user) => {
		setToken(jwtToken);
		setUserId(id);
		setUsername(user);
		localStorage.setItem(
			"userData",
			JSON.stringify({
				userId: id,
				token: jwtToken,
				username: user,
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		setUsername("");
		localStorage.removeItem("userData");
	}, []);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("userData"));

		if (data && data.token) {
			login(data.token, data.userId, data.username);
		}
		setLoading(true);
	}, [login]);

	return { login, logout, token, userId, loading, username };
};
