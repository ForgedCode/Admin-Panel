import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, ruRU } from "@mui/x-data-grid";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import ru from "javascript-time-ago/locale/ru";
import Toolbar from "./Toolbar";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

TimeAgo.addLocale(ru);
const timeAgo = new TimeAgo("ru-RU");

const DataTable = () => {
	const [userData, setUserData] = useState([]);
	const [selectedData, setSelectedData] = useState([]);
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const getUserData = () => {
		axios
			.get("/api/users")
			.then((res) => {
				const data = res.data;
				setUserData(data);
			})
			.catch(() => toast("Что-то пошло не так"));
	};

	useEffect(() => {
		getUserData();
	}, []);

	const data = JSON.parse(localStorage.getItem("userData"));
	const onDelete = async () => {
		if (selectedData.length > 0) {
			const res = await axios.post("/api/users/delete", { id: selectedData });
			toast.success(res.data.message);
			getUserData();
		}
		if (selectedData.includes(data.userId)) {
			auth.logout();
			toast.error("Вы удалили себя!");
			navigate("/");
		}
	};
	const onBlock = async () => {
		if (selectedData.length > 0) {
			const res = await axios.post("/api/users/block", { id: selectedData });
			toast.success(res.data.message);
			getUserData();
		}
		if (selectedData.includes(data.userId)) {
			auth.logout();
			toast.error("Вы заблокировали себя!");
			navigate("/");
		}
	};
	const onUnblock = async () => {
		if (selectedData.length > 0) {
			const res = await axios.post("/api/users/unblock", { id: selectedData });
			toast.success(res.data.message);
			getUserData();
		}
	};

	const rows = userData?.map((data) => ({
		id: data._id,
		username: data.username,
		email: data.email,
		createdAt: new Date(data.createdAt),
		lastLogin: timeAgo.format(new Date(data.lastLogin)),
		isBlocked: data.isBlocked ? "Заблокирован" : "Доступен",
	}));

	const columns = [
		{ field: "id", headerName: "ID", width: 250 },
		{
			field: "username",
			headerName: "Имя пользователя",
			width: 250,
		},
		{
			field: "email",
			headerName: "Email",
			width: 250,
		},
		{
			field: "createdAt",
			headerName: "Дата создания",
			type: "date",
			width: 220,
		},
		{
			field: "lastLogin",
			headerName: "Последний логин",
			type: "date",
			width: 220,
		},
		{
			field: "isBlocked",
			headerName: "Статус",
			width: 260,
			cellClassName: (params) => {
				if (params.value === "Заблокирован") {
					return "text-red-700";
				} else {
					return "text-green-700";
				}
			},
		},
	];
	return (
		<Box sx={{ height: 700, width: "100%" }}>
			<Toolbar onDelete={onDelete} onBlock={onBlock} onUnblock={onUnblock} />
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[10]}
				checkboxSelection
				onSelectionModelChange={setSelectedData}
				disableSelectionOnClick
				localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
			/>
		</Box>
	);
};

export default DataTable;
