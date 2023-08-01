// LoginPopup.js
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { getLogin } from '../services/API'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

interface LoginPopupProps {
		open: boolean;
		onClose: () => void;
		logged_in: boolean;
		onLoginSuccess: () => void;
	}

const LoginPopup: React.FC<LoginPopupProps> = ({ open, onClose, onLoginSuccess }) =>{

		async function Check_login(): Promise<void> {
				console.log("login button clicked...");
				const username = document.getElementById("username") as HTMLInputElement;
				const password = document.getElementById("password") as HTMLInputElement;
				const LoginResponse = await getLogin(username.value, password.value);

				if (LoginResponse.isLoggedIn) {
					console.log("login success");
					// Save the JWT in a cookie with a 7-day expiration (adjust as needed)
					Cookies.set('jwt', LoginResponse.jwt, { expires: 7 });
					onLoginSuccess();
					onClose();
				} else {
					console.log("login failed");
				}
		}

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				onClose={onClose}
			>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
							{/* Add your login form and logic here */}
							{/* For simplicity, I'll just show a basic form */}
							<div className="sm:flex sm:items-start">
								<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<Dialog.Title
										as="h3"
										className="text-lg leading-6 font-medium text-gray-900"
									>
										Login
									</Dialog.Title>
									<div className="mt-2">
										<form>
											<div>
												<label htmlFor="username">Username</label>
												<input
													type="text"
													id="username"
													name="username"
													className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
													placeholder="Enter your username"
												/>
											</div>
											<div className="mt-2">
												<label htmlFor="password">Password</label>
												<input
													type="password"
													id="password"
													name="password"
													className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
													placeholder="Enter your password"
												/>
											</div>
											<div className="mt-4">
												<button
													type="submit"
													className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
													onClick={Check_login}
												>
													Sign In
												</button>
												
												<div className="text-center">
													<Link to="/Register">Can't login?</Link> --- <Link onClick={onClose} to="/Register">register</Link>
												</div>

											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default LoginPopup;