import { Flex, Link } from "@radix-ui/themes";

export interface Navigation {
  name: string;
  path: string;
}

interface Props {
  navigations: Navigation[];
}

export default function Header({ navigations }: Props) {
  return (
    <Flex
      px="5"
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="60px"
      justify="end"
      direction="row"
      align="center"
      gap="5"
    >
      {navigations.map((navigation) => (
        <Link key={navigation.path} href={navigation.path}>
          {navigation.name}
        </Link>
      ))}
    </Flex>
  );
}
