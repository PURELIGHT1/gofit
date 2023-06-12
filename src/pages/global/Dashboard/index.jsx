// import MemberPage from '../../kasir/index'
import React from 'react'
import useAuthStore from '../../../utils/setup/useAuthStore'
import Dashboard from './Dashboard'

const DashboardPage = () => {
    const user = useAuthStore((state) => state.user);

    return <Dashboard />
};

export default DashboardPage;
