import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../store';
import { removeUserToken } from '../utils';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <h1>Stackathon hehehe</h1>
      <nav>
        <div className='apart'>
          <Link to='/'>Home</Link>
          <Link to='/main'>Browse</Link>
        </div>
        <div className='apart'>
          {user ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to={`/users/${user.id}`}>My Account</Link>
              <a
                onClick={() => {
                  dispatch(setUser(null));
                  removeUserToken();
                  navigate('/');
                }}
              >
                Logout
              </a>
            </div>
          ) : (
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign Up</Link>
            </div>
          )}
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
