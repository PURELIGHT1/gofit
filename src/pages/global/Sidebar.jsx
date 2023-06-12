import { sidebarlink } from '../../utils/helper/sidebarLinks'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import Logo from '../../assets/img/gofit.png'
import DropdownLink from '../..//components/DropdownLink'
import useAuthStore from '../../utils/setup/useAuthStore'

const Sidebar = ({ showSidebar }) => {
    const { pathname } = useLocation();
    // const { handleLogout } = useLogout();
    const user = useAuthStore((state) => state.user);
    return (
        <div
            className={`fixed h-screen overflow-y-scroll custom-scrollbar bg-white ${
                showSidebar
                    ? 'w-60 translate-x-0 border-r-[1px]'
                    : 'w-0 -translate-x-60'
            } duration-300`}
        >
            <div className="px-8 py-4 flex flex-col items-center gap-2">
                <img src={Logo} alt="logo" width={92} />
            </div>
            <div className="mt-2 flex flex-col h-full max-h-sidebar-content">
                {sidebarlink.map((link, index) => {
                    return (
                        <div
                            className={`${index !== 0 ? 'mt-4' : ''}`}
                            key={link.title}
                        >
                            {link.links.filter((item) => {
                                return item.roles.includes(user?.role);
                            }).length > 0 && (
                                <h6 className="text-gray-800 font-bold text-sm uppercase px-6 mb-2">
                                    {link.title}
                                </h6>
                            )}
                            {link.links
                                .filter((item) => {
                                    return item.roles.includes(user?.role);
                                })
                                .map((link) => {
                                    const isActive = pathname.startsWith(
                                        link.path
                                    );
                                    if (link.dropdown) {
                                        return (
                                            <DropdownLink
                                                key={link.title}
                                                pathname={pathname}
                                                basepath={link.basepath}
                                                icon={<link.icon size={20} />}
                                                title={link.title}
                                                dropdown={link.dropdown}
                                            />
                                        );
                                    } else {
                                        return (
                                            <Link
                                                to={link.path}
                                                key={link.path}
                                                className={`sidebarlink ${
                                                    isActive &&
                                                    'bg-blue-200 active'
                                                } hover:bg-blue-200 duration-300`}
                                            >
                                                {<link.icon size={20} />}
                                                <span className="font-medium text-sm ml-2">
                                                    {link.title}
                                                </span>
                                            </Link>
                                        );
                                    }
                                })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
