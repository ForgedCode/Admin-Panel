import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = () => {
	return (
		<div className='flex justify-center pt-40'>
			<CircularProgress size='5rem' />
		</div>
	);
};

export default Loader;
