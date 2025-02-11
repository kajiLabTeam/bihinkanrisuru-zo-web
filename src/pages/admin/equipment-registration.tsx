import type { EquipmentsRequest } from '@/types';
import type { SubmitHandler } from 'react-hook-form';
import { Box, Button, Container, Flex, Grid, Heading, Link, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

interface EquipmentFormData extends Omit<EquipmentsRequest, 'tag'> {
  tag: string;
}

export default function EquipmentRegistrationPage() {
  const router = useNavigate();

  const { handleSubmit, register } = useForm<EquipmentFormData>();
  const onSubmit: SubmitHandler<EquipmentFormData> = (data) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (typeof apiUrl !== 'string') {
      return;
    }

    const body = {
      asset_id: data.asset_id,
      name: data.name,
      purchase_date: data.purchase_date,
      place: data.place,
      tag: data.tag.split(','), // ,区切りで分割
    };
    const url = new URL('/equipments', apiUrl);
    fetch(url.toString(), { method: 'post', body: JSON.stringify(body) })
      .then((responce) => {
        if (responce.ok) {
          void router('/equipments');
        }
        else {
          // eslint-disable-next-line no-alert
          alert('登録に失敗しました');
          console.error(responce);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert('登録に失敗しました');
        console.error(error);
      },
      );
  };
  return (
    <Container align="center" maxWidth="800px" px="3" py="3">
      <Heading align="center" as="h1">管理者用備品登録</Heading>
      <Box py="150px">
        <form onSubmit={() => handleSubmit(onSubmit)}>
          <Grid columns="150px 1fr" gap="5">
            <label htmlFor="asset_id">備品管理番号:</label>
            <TextField.Root id="asset_id" {...register('asset_id')} />
            <label htmlFor="name">備品名:</label>
            <TextField.Root id="name" {...register('name', { required: '備品名は必須です。' })} />
            <label htmlFor="purchase_date">購入日:</label>
            <TextField.Root id="purchase_date" type="date"{...register('purchase_date')} />
            <label htmlFor="place">保管場所:</label>
            <TextField.Root id="place" {...register('place')} />
            <label htmlFor="tag">タグ</label>
            <TextField.Root id="tag" {...register('tag')} />
          </Grid>
          <Flex align="center" justify="between" py="9">
            <Link href="/equipments">戻る</Link>
            <Button type="submit">登録</Button>
          </Flex>
        </form>
      </Box>
    </Container>
  );
}
