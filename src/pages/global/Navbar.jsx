import React, { useRef, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { AiOutlineMail } from 'react-icons/ai'
import Avatar from '../../assets/img/avatar.jpg'
import useAuthStore from '../../utils/setup/useAuthStore'
import useLogout from '../../common/useLogout'
import useOnClickOutside from '../../common/useOnClickOutside'
import { formatName } from '../../utils/helper/formatName'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/helper/routes'

const Navbar = ({ onToggleSidebar, showSidebar }) => {
    const user = useAuthStore((state) => state.user);
    const { handleLogout } = useLogout();
    const [showPopover, setShowPopover] = useState(false);

    const accountInfoRef = useRef();

    useOnClickOutside(accountInfoRef, () => setShowPopover(false));

    const handleTogglePopover = () => {
        setShowPopover((prev) => !prev);
    };

    if(!user) return;
    return (
        
        <div
            className={`fixed flex items-center bg-white justify-between max-h-[60px] w-full duration-300 px-8 py-4 shadow-sm z-10 border-b-[1px] ${
                showSidebar && 'max-w-dashboard-content'
            }`}
        >
            <div>
                <FaBars onClick={onToggleSidebar} className="cursor-pointer" />
            </div>
            <div className="flex gap-4">
                <IoMdNotificationsOutline className="icon" />
                <AiOutlineMail className="icon" />
                <div
                    className="flex gap-2 items-center relative"
                    ref={accountInfoRef}
                >
                    <div
                        className="w-6 h-6 rounded-full"
                        onClick={handleTogglePopover}
                    >
                        <img
                            src={Avatar}
                            alt="avatar"
                            className="object-cover"
                        />
                    </div>
                    <span
                        className="text-xs font-semibold cursor-pointer select-none"
                        onClick={handleTogglePopover}
                    >
                        Hi, {user.role === "ADMIN" ? "ADMIN GOFIT" : user?.pegawai.nama}
                    </span>
                    {showPopover && (
                        <div className="absolute top-10 right-0 w-48 bg-white rounded-md shadow-lg z-50">
                            <div className="flex flex-col px-4 py-2">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={Avatar}
                                        alt="avatar"
                                        className="w-8 h-8"
                                    />
                                    <div>
                                        {/* <p className="text-sm font-semibold">
                                            {user
                                                ? formatName(user?.username)
                                                : 'User'}
                                        </p> */}
                                        <p className="text-xs text-gray-500">
                                            {user?.role}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <Link
                                        to={ROUTES.PROFILE}
                                        className="text-sm text-gray-800 cursor-pointer hover:text-blue-500"
                                    >
                                        Ubah Profile
                                    </Link>
                                    <Link
                                        to={ROUTES.CHANGE_PASSWORD}
                                        className="text-sm text-gray-800 cursor-pointer hover:text-blue-500 inline-block"
                                    >
                                        Ubah Password
                                    </Link>
                                    <p
                                        className="text-sm text-gray-800 cursor-pointer hover:text-blue-500"
                                        onClick={handleLogout}
                                    >
                                        Sign Out
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
