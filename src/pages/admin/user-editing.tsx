import type { EditUserForm } from '@/types/form';
import UserStatusInput from '@/components/UserStatusInput';
import { useUserForm } from '@/hooks/useUserForm';
import { Box, Button, Container, Flex, Grid, Heading, Link, Spinner, TextField } from '@radix-ui/themes';
import { FormProvider, useForm } from 'react-hook-form';

export default function UserEditingPage() {
  const { user, error, isLoading, onSubmit } = useUserForm();
  const methods = useForm<EditUserForm>();
  const { handleSubmit, register } = methods;

  return (
    <Container align="center" maxWidth="800px" px="3" py="3">
      <Heading align="center" as="h1">ユーザ情報編集</Heading>
      <Box py="150px">
        {isLoading
          ? (
              <Flex align="center" height="200px" justify="center">
                <Spinner />
              </Flex>
            )
          : (error != null)
              ? (
                  <Box>
                    <p>{error}</p>
                    <Link href="/admin/users">戻る</Link>
                  </Box>
                )
              : !user
                  ? (
                      <Box>
                        <p>指定されたユーザが見つかりませんでした。</p>
                        <Link href="/admin/users">戻る</Link>
                      </Box>
                    )
                  : (
                      <FormProvider {...methods}>
                        <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
                          <Grid columns="150px 1fr" gap="5">
                            <label htmlFor="user_id">ユーザID:</label>
                            <TextField.Root disabled id="user_id" value={user.id} />
                            <label htmlFor="name">ユーザ名:</label>
                            <TextField.Root defaultValue={user.name} id="name" {...register('name', { required: 'ユーザ名は必須です。' })} />
                            <label htmlFor="name">ステータス:</label>
                            <UserStatusInput initialStatus={user.status} register={register} />
                          </Grid>
                          <Flex align="center" justify="between" py="9">
                            <Link href="/admin/users">戻る</Link>
                            <Button type="submit">登録</Button>
                          </Flex>
                        </form>
                      </FormProvider>
                    )}
      </Box>
    </Container>
  );
}
