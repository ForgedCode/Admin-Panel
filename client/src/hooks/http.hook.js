import { useCallback } from "react";
import toast from "react-hot-toast";

export const useHttp = () => {
	const request = useCallback(
		async (url, method = "GET", body = null, headers = {}) => {
			try {
				if (body) {
					body = JSON.stringify(body);
					headers["Content-type"] = "application/json";
				}
				const response = await fetch(url, {
					method,
					body,
					headers,
				});
				const data = await response.json();
				if (!response.ok) {
					toast.error(
						data.message ||
							data.email ||
							data.username ||
							data.password ||
							data.password2 ||
							"Что-то пошло не так"
					);
				}
				return data;
			} catch (err) {
				toast(err.message);
				throw err;
			}
		},
		[]
	);

	return { request };
};
