import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, StarIcon } from '@heroicons/react/24/outline';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getJwtForUser } from '../services/API';
import photo from '../img/elysium-logo.png';
import userLogo from '../img/user.png';
import LoginPopup from './loginPopup';
import Cookies from 'js-cookie';
import '../App.css';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}


export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false); // Set the initial login state here
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const navigate = useNavigate();

  const location = useLocation(); // Corrected hook name

  const handleLogout = () => {
    // Implement your logout logic here
    Cookies.set('jwt', '', { expires: 0 });
    Cookies.set('username', '', { expires: 0 });
    setLoggedIn(false);
    navigate("/");
  };

  const handleLogin = () => {
    // Implement your login logic here
    // login popup here...
    console.log('login popup');
    setLoginPopupOpen(true);
  };

  useEffect(() => {
    // Check for a valid JWT when the app starts
    checkJwtForUser().then((result) => {
      setLoggedIn(result);
    });

  }, []);

  async function checkJwtForUser() {
    if (Cookies.get('username') === "" || Cookies.get('username') === undefined){
      return false;
    }
    const jwtFromCookie = Cookies.get('jwt');
    const jwtForUser = await getJwtForUser(Cookies.get('username') ?? '');

    console.log(jwtFromCookie);
    console.log(jwtForUser);
  
    if (Cookies.get('username') === '' || Cookies.get('username') === undefined) {
      return false;
    }
    if (jwtFromCookie === jwtForUser) {
      return true;
    } else {
      return false;
    }
  }

  // Move navigation array inside the component
  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Compare', href: '/Compare', current: false },
    { name: 'Help', href: '/Help', current: false },
  ];

  // Update the current property in the navigation array based on the current path
  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: item.href === location.pathname,
  }));

  const handleSuccessfulLogin = () => {
    // This function will be passed to the LoginPopup
    // and called when login is successful
    setLoggedIn(true);
    setLoginPopupOpen(false); // Close the login popup after successful login
  };

  return (
    <Disclosure as="nav" className="navbar-background">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto header-logo" src={photo} alt="elysium" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {updatedNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <LoginPopup
                logged_in={loggedIn}
                open={isLoginPopupOpen}
                onClose={() => setLoginPopupOpen(false)}
                onLoginSuccess={handleSuccessfulLogin} // Pass the function as a prop
              />
               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {loggedIn ? ( // Render profile dropdown or login button based on the login state
                  <>
                  <Link to="/Compare">
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View Favorites</span>
                        <StarIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </Link>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={userLogo}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/Profile"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Hi {Cookies.get('username')}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/Settings"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                onClick={handleLogout}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <button
                    type="button"
                    className="rounded-md bg-blue-600 text-sm px-4 py-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}