import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import {
	TextField,
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	Button,
} from "@mui/material";
import toast from "react-hot-toast";

const Login = () => {
	const auth = useContext(AuthContext);
	const { request } = useHttp();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const onChange = (e) => {
		setForm({ ...form, [e.target.id]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
	};

	const loginHandler = async () => {
		try {
			const data = await request("/api/users/login", "POST", { ...form });
			auth.login(data.token, data.userId, data.username);
		} catch (err) {
			toast.error(err);
		}
	};

	return (
		<div className='relative flex flex-col md:justify-center md:items-center h-[90vh] overflow-hidden'>
			<div className='w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl'>
				<h2 className='text-xl font-semibold text-center text-blue-700'>
					Логин
				</h2>

				<form className='mt-6' onSubmit={onSubmit}>
					<div className='mb-6'>
						<TextField
							size='small'
							variant='outlined'
							className='w-full'
							id='email'
							label='Email'
							value={form.email}
							onChange={onChange}
						/>
					</div>
					<div className='mb-2'>
						<FormControl className='w-full' variant='outlined' size='small'>
							<InputLabel>Пароль</InputLabel>
							<OutlinedInput
								label='Пароль'
								type={showPassword ? "text" : "password"}
								value={form.password}
								id='password'
								onChange={onChange}
								endAdornment={
									<InputAdornment position='start'>
										<IconButton
											edge='end'
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<i className='material-icons'>visibility</i>
											) : (
												<i className='material-icons'>visibility_off</i>
											)}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
					</div>
					<p className='text-gray-600'>
						Нет аккаунта?{" "}
						<Link
							className='text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'
							to='/register'
						>
							Зарегистрироваться
						</Link>
					</p>
					<div className='mt-6'>
						<Button
							className='w-full'
							variant='contained'
							disabled={!form.email || !form.password}
							onClick={loginHandler}
						>
							Войти
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
