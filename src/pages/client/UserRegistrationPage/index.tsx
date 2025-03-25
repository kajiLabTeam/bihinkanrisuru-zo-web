import type { CreateUserForm } from '@/types/form';
import { Toast } from '@/components/Toast';
import { useRegisterUserForm } from '@/hooks/useRegisterUserForm';
import { Box, Button, Container, Flex, Grid, Heading, Link, Spinner, TextField } from '@radix-ui/themes';
import { FormProvider, useForm } from 'react-hook-form';

export default function UserRegistrationPage() {
  const methods = useForm<CreateUserForm>();
  const { userId, isOpen, color, message, isLoading, onClose, onSubmit } = useRegisterUserForm();
  const { handleSubmit, register } = methods;

  return (
    <Container align="center" maxWidth="800px" px="3" py="3">
      <Heading align="center" as="h1">ユーザ登録</Heading>
      <Box py="150px">
        {isLoading
          ? (
              <Flex align="center" height="200px" justify="center">
                <Spinner />
              </Flex>
            )
          : (
              <FormProvider {...methods}>
                <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
                  <Grid columns="150px 1fr" gap="5">
                    <label htmlFor="id">ユーザID:</label>
                    <TextField.Root defaultValue={userId} disabled id="user_id" />
                    <label htmlFor="name">ユーザ名:</label>
                    <TextField.Root defaultValue="" id="name" {...register('name', { required: 'ユーザ名は必須です。' })} />
                  </Grid>
                  <Flex align="center" justify="between" py="9">
                    <Link href="/admin/users">戻る</Link>
                    <Button type="submit">登録</Button>
                  </Flex>
                </form>
              </FormProvider>
            )}
      </Box>
      {
        isOpen && (color != null) && (message != null) && (
          <Toast color={color} message={message} onClose={onClose} />
        )
      }
    </Container>
  );
}
