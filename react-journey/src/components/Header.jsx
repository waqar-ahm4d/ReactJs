import { NavLink } from "react-router-dom";

function Header() {
return <>
<header>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/all-products">Products</NavLink>
    <NavLink to="/practice">Practice</NavLink>
</header>
</>
}

export default Header;