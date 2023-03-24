import React, { useContext } from "react";
import DataTable from "../components/DataTable";
import { StyledEngineProvider } from "@mui/material/styles";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
	const { username } = useContext(AuthContext);
	return (
		<div className='h-[100vh - 80px] container m-auto px-4 pt-8'>
			<div>
				<h2 className='text-2xl font-bold'>Добро пожаловать, {username}</h2>
			</div>
			<StyledEngineProvider injectFirst>
				<DataTable />
			</StyledEngineProvider>
		</div>
	);
};

export default Home;
