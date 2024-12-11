import type { Navigation } from '@/components/Header';
import Header from '@/components/Header';
import { Box } from '@radix-ui/themes';
import { Outlet } from 'react-router';

const navigations = [
  {
    name: '備品一覧',
    path: '/user/equipments',
  },
] satisfies Navigation[];

export default function UserLayout() {
  return (
    <>
      <Header navigations={navigations} />
      <Box pt="9">
        <Outlet />
      </Box>
    </>
  );
}
