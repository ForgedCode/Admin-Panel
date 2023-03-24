import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);
	const logoutHandler = (e) => {
		e.preventDefault();
		auth.logout();
		navigate("/");
	};
	return (
		<nav className='container m-auto flex bg-white flex-wrap items-center justify-between p-4'>
			<div className='w-auto text-center'>
				<Link
					className='text-xl text-gray-800 font-semibold font-heading'
					to='/'
				>
					Admin Panel
				</Link>
			</div>
			<div className='navbar-menu w-auto'>
				<a
					className='h-12 flex items-center justify-center uppercase font-semibold px-8 border border-black hover:bg-black hover:text-white transition duration-500 ease-in-out'
					href='/'
					onClick={logoutHandler}
				>
					<i className='material-icons'>logout</i>
				</a>
			</div>
		</nav>
	);
};

export default Navbar;
