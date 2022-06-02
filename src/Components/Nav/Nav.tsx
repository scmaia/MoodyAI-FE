import { useContext } from "react";
import { UserContext } from "../../contexts/user-context";
import { Link, useLocation } from "react-router-dom";
import "./Nav.scss";
import Eye from '../Eye/Eye'

const Nav: React.FC = () => {
  const user = useContext(UserContext);
  
  return (
    <nav className="nav">
      <Link to='/'> <Eye /> </Link>
      {user.username
        ? <p className='nav__greeting'>Hello, {user.username}</p>
        : <Link to="/login" className='nav__link'> Log In </Link>
      }
    </nav>
  );
};

export default Nav;
