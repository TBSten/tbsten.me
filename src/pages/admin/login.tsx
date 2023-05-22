import { signInAdmin, signOutAdmin, useAdmin } from '@/auth/client';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
}
const AdminLoginPage: NextPage<Props> = ({ }) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })
    const handleLogin = async () => {
        await signInAdmin(credentials.username, credentials.password)
    }
    const handleLogout = async () => {
        await signOutAdmin()
    }
    const { status } = useAdmin()
    return (
        <BasicLayout>
            <LayoutContent>
                <form className='text-center' onSubmit={e => { e.preventDefault(); handleLogin() }}>
                    <span>
                        {status}
                    </span>
                    <input
                        type="text"
                        className="input "
                        value={credentials.username}
                        onChange={e => setCredentials(p => ({ ...p, username: e.target.value }))}
                    />
                    <input
                        type="password"
                        className="input "
                        value={credentials.password}
                        onChange={e => setCredentials(p => ({ ...p, password: e.target.value }))}
                    />
                    <button type="submit" className="btn btn-ghost">
                        log in
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={handleLogout}>
                        log out
                    </button>
                </form>
                <div className="">
                    {status === "admin" &&
                        <Link href="/admin" className='link'>
                            admin top
                        </Link>
                    }
                </div>
            </LayoutContent>
        </BasicLayout>
    );
}
export default AdminLoginPage;
