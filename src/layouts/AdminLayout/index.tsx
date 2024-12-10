import Header from "@/components/Header";
import { Box } from "@radix-ui/themes";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <>
      <Header />
      <Box pt="9">
        <Outlet />
      </Box>
    </>
  );
}
