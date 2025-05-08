import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSessionToken } from '@/app/api/session';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getSessionToken();
    if (!token) {
      router.push('/');
    }
  }, [router]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <a href="/admin/guests">New Guest</a>
        </li>
        <li>
          <a href="/admin/new-gift">New Gift</a>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;