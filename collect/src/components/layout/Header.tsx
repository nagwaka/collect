import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import UserMenu from '../user/UserMenu';

const Header = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to={isAuthenticated ? "/home" : "/"} className="text-xl font-bold">
            Collect
          </Link>

          <ul className="flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <li>
                  <Link to="/signin" className="text-gray-600 hover:text-gray-900">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <UserMenu />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;