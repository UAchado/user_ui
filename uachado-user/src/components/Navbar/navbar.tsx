import generalLogo from "../../../public/general-icon.png";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div className="rounded-lg navbar w- bg-primary">
            <div className="flex-1">
                <img className="w-32 -mr-8" src={generalLogo}></img>
                <Link to="/">
                    <a className="pl-0 text-xl normal-case btn btn-ghost">UAchado</a>
                </Link>
                <Link to="/newItem">
                    <a className="pl-0 text-xl normal-case btn btn-ghost">Adicionar Item</a>
                </Link>
            </div>
            <div className="flex-none">
                <Link to="/signIn">
                    <button className="btn btn-ghost">Staff Sign-In</button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
