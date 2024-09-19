import DRangePicker from "./date-range-picker/DRangePicker.jsx";
import SearchBar from "./search-bar/SearchBar.jsx";
import DropDownButton from "./drop-down-button/DropDownButton.jsx";
import SearchBtn from "./searchbtn/SearchBtn.jsx";


export default function Header() {
    return (
            <div className="header flex items-center justify-center gap-[14rem] h-[20vh] pt-[2rem]">
                <div>
                    <a className="btn btn-ghost text-xl">Logo</a>
                </div>
                <div className={"navbar-container flex items-center gap-3"}>
                    <div className={"navbar"}>
                        <SearchBar/>
                        <DRangePicker/>
                        <DropDownButton/>
                    </div>
                    <div className={"search-btn"}>
                        <SearchBtn/>
                    </div>
                </div>
                <div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
    )
}