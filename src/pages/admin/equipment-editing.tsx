import type { EquipmentsRequest } from '@/types';
import type { SubmitHandler } from 'react-hook-form';
import { Box, Button, Container, Flex, Grid, Heading, Link, TextField } from '@radix-ui/themes';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

interface EquipmentEditedData extends Omit<EquipmentsRequest, 'tag'> {
  tag: string;
}

export default function EquipmentEditPage() {
  const equipmentId = useParams<{ id: string }>();
  const router = useNavigate();
  const { handleSubmit, register, setValue, watch } = useForm<EquipmentEditedData>();
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    // eslint-disable-next-line ts/strict-boolean-expressions
    if (typeof apiUrl !== 'string' || !equipmentId) {
      // 一覧画面に戻したい
      void router('/admin/equipments');
      return;
    }
    fetch(`${apiUrl}/admin/equipments/${equipmentId}`)
      .then((response) => response.json())
      .then((data: EquipmentsRequest) => {
        setValue('asset_id', data.asset_id);
        setValue('name', data.name);
        setValue('purchase_date', data.purchase_date);
        setValue('place', data.place);
        setValue('tag', data.tag ? data.tag.join(',') : '');
      })
      .catch((error) => {
        console.error('データの取得に失敗しました', error);
        // eslint-disable-next-line no-alert
        alert('データの取得に失敗しました');
      });
  }, [equipmentId, router, setValue]);

  const onSubmit: SubmitHandler<EquipmentEditedData> = (data) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (typeof apiUrl !== 'string') {
      return;
    }
    const body = {
      asset_id: data.asset_id,
      name: data.name,
      purchase_date: data.purchase_date,
      place: data.place,
      tag: data.tag.split(','),
    };
    fetch(`${apiUrl}/admin/equipments/${equipmentId}/edit`, { method: 'put', body: JSON.stringify(body) })
      .then((responce) => {
        if (responce.ok) {
          void router('/admin/equipments');
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
    if (typeof apiUrl !== 'string' || !equipmentId)
      return;

    try {
      const response = await fetch(`${apiUrl}/admin/equipments/${equipmentId}`, { method: 'DELETE' });
      if (response.ok) {
        // eslint-disable-next-line no-alert
        alert('削除しました');
        void router('/admin/equipments'); // 削除後は一覧へ
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

  const rawDate = (watch('purchase_date'));
  const formattedDate = (rawDate != null) ? new Date(rawDate * 1000).toISOString().split('T')[0] : '';

  return (
    <Container align="center" maxWidth="800px" px="3" py="3">
      <Heading align="center" as="h1">管理者用備品編集</Heading>
      <Box py="150px">
        <form onSubmit={() => handleSubmit(onSubmit)}>
          <Grid columns="150px 1fr" gap="5">
            <label htmlFor="asset_id">備品管理番号:</label>
            <TextField.Root id="asset_id" {...register('asset_id')} />
            <label htmlFor="name">備品名:</label>
            <TextField.Root id="name" {...register('name', { required: '備品名は必須です。' })} />
            <label htmlFor="purchase_date">購入日:</label>
            <TextField.Root id="purchase_date" type="date"{...register('purchase_date')} value={formattedDate} />
            <label htmlFor="place">保管場所:</label>
            <TextField.Root id="place" {...register('place')} />
            <label htmlFor="tag">タグ</label>
            <TextField.Root id="tag" {...register('tag')} />
          </Grid>
          <Flex align="center" justify="between" py="9">
            <Link href="/equipments">戻る</Link>
            <Button onClick={() => (handleDelete)}>消す</Button>
            <Button type="submit">登録</Button>
          </Flex>
        </form>
      </Box>
    </Container>
  );
}
