import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import Loader from "./components/Loader";

function App() {
	const { token, login, logout, userId, loading, username } = useAuth();
	const isLogin = !!token;

	if (!loading) {
		return <Loader />;
	}
	return (
		<AuthContext.Provider
			value={{ token, login, logout, userId, isLogin, username }}
		>
			<Router>
				<div className='App'>
					<Toaster
						toastOptions={{ style: { minWidth: "300px" } }}
						containerClassName='text-center'
					/>
					{isLogin ? (
						<>
							<Navbar />
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/register' element={<Register />} />
								<Route path='/login' element={<Login />} />
							</Routes>
						</>
					) : (
						<Routes>
							<Route path='/' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='*' element={<Navigate to='/' replace />} />
						</Routes>
					)}
				</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
