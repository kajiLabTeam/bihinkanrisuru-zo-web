import type { Users } from '@/types';
import type { SubmitHandler } from 'react-hook-form';
import { Box, Button, Container, Flex, Grid, Heading, Link, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

export default function UserEditPage() {
  // eslint-disable-next-line ts/naming-convention
  const { user_id } = useParams();
  const router = useNavigate();
  const { handleSubmit, register } = useForm<Users>();

  const onSubmit: SubmitHandler<Users> = (data) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (typeof apiUrl !== 'string') {
      return;
    }
    const body = {
      userId: data.id,
      name: data.name,
    };
    fetch(`${apiUrl}/admin/users/${user_id}/edit`, { method: 'put', body: JSON.stringify(body) })
      .then((responce) => {
        if (responce.ok) {
          void router('/admin/users');
        }
        else {
          // eslint-disable-next-line no-alert
          alert('更新に失敗しました');
          console.error(responce);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert('更新に失敗しました');
        console.error(error);
      });
  };

  const handleDelete = async () => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('消去していいですか？'))
      return;

    const apiUrl = import.meta.env.VITE_API_URL;
    // eslint-disable-next-line ts/strict-boolean-expressions
    if (typeof apiUrl !== 'string' || !user_id)
      return;

    try {
      const response = await fetch(`${apiUrl}/admin/users/${user_id}`, { method: 'DELETE' });
      if (response.ok) {
        // eslint-disable-next-line no-alert
        alert('削除しました');
        void router('/admin/users'); // 削除後は一覧へ
      }
      else {
        // eslint-disable-next-line no-alert
        alert('削除に失敗しました');
      }
    }
    catch (error) {
      // eslint-disable-next-line no-alert
      alert('削除に失敗しました');
      console.error(error);
    }
  };

  return (
    <Container align="center" maxWidth="800px" px="3" py="3">
      <Heading align="center" as="h1">ユーザ情報編集</Heading>
      <Box py="150px">
        <form onSubmit={() => handleSubmit(onSubmit)}>
          <Grid columns="150px 1fr" gap="5">
            <label htmlFor="user_id">ユーザID:</label>
            <TextField.Root disabled id="user_id" value={user_id} />
            <label htmlFor="name">ユーザ名:</label>
            <TextField.Root id="name" {...register('name', { required: 'ユーザ名は必須です。' })} />
          </Grid>
          <Flex align="center" justify="between" py="9">
            <Link href="/admin/users">戻る</Link>
            <Button onClick={() => (handleDelete)}>消す</Button>
            <Button type="submit">登録</Button>
          </Flex>
        </form>
      </Box>
    </Container>
  );
}
