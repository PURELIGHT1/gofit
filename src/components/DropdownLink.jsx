import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const DropdownLink = ({
    pathname,
    basepath,
    icon,
    title,
    dropdown,
    addstyle,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li
            className={`flex flex-col items-start navlink select-none cursor-pointer ${addstyle} ${
                pathname.includes(basepath) ? 'bg-blue-100' : ''
            }`}
        >
            <div className="flex w-full items-center" onClick={handleToggle}>
                {icon}
                <span className="ml-2">{title}</span>
                <span className="ml-auto">
                    <BiChevronRight
                        size={20}
                        className={isOpen ? 'rotate-90' : ''}
                    />
                </span>
            </div>
            <div>
                <ul
                    className={`mt-4 flex flex-col gap-y-4 w-full ${
                        isOpen ? 'block' : 'hidden'
                    }`}
                >
                    {dropdown.map((item) => {
                        const isActive = pathname.includes(item.path);
                        return (
                            <li
                                key={item.title}
                                className={`w-full text-sm font-medium flex items-center gap-x-4 ml-6 ${
                                    isActive ? 'text-blue-600' : ''
                                }`}
                            >
                                <span
                                    className={`rounded-full w-2 h-2 ${
                                        isActive ? 'bg-blue-700' : 'bg-gray-400'
                                    }`}
                                ></span>
                                <Link to={item.path}>{item.title}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </li>
    );
};

export default DropdownLink;
