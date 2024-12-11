import { Flex, Link } from '@radix-ui/themes';

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
      align="center"
      direction="row"
      gap="5"
      height="60px"
      justify="end"
      left="0"
      position="fixed"
      px="5"
      top="0"
      width="100vw"
    >
      {navigations.map((navigation) => (
        <Link href={navigation.path} key={navigation.path}>
          {navigation.name}
        </Link>
      ))}
    </Flex>
  );
}
