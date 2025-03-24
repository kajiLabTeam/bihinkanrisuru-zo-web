import type { Navigation } from '@/components/Header';
import Header from '@/components/Header';
import { Box } from '@radix-ui/themes';
import { Outlet } from 'react-router';

const navigation = [

] satisfies Navigation[];

export default function ClientLayout() {
  return (
    <>
      <Header navigations={navigation} />
      <Box pt="9">
        <Outlet />
      </Box>
    </>
  );
}
