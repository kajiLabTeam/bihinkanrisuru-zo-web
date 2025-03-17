import type { EditEquipmentForm } from '@/types/form';
import EquipmentStatusInput from '@/components/EquipmentStatusInput';
import TagInput from '@/components/TagInput';
import { usePutEquipment } from '@/hooks/usePutEquipment';
import { Box, Button, Container, Flex, Grid, Heading, Link, Spinner, TextField } from '@radix-ui/themes';
import { FormProvider, useForm } from 'react-hook-form';

export default function EquipmentEditPage() {
  const { equipment, error, loading, onSubmit } = usePutEquipment();
  const methods = useForm<EditEquipmentForm>();
  const { handleSubmit, register } = methods;

  return (
    <Container align="center" maxWidth="800px" px="3" py="3">
      <Heading align="center" as="h1">管理者用備品編集</Heading>
      <Box py="150px">
        {loading
          ? (
              <Flex align="center" height="200px" justify="center">
                <Spinner />
              </Flex>
            )
          : (error != null)
              ? (
                  <Box>
                    <p>{error}</p>
                    <Link href="/equipments">戻る</Link>
                  </Box>
                )
              : !equipment
                  ? (
                      <Box>
                        <p>指定された備品が見つかりませんでした。</p>
                        <Link href="/equipments">戻る</Link>
                      </Box>
                    )
                  : (
                      <FormProvider {...methods}>
                        <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
                          <Grid columns="150px 1fr" gap="5">
                            <label htmlFor="assetId">備品管理番号:</label>
                            <TextField.Root
                              id="assetId"
                              {...register('assetId')}
                              defaultValue={equipment.asset_id}
                            />
                            <label htmlFor="name">備品名:</label>
                            <TextField.Root id="name" {...register('name', { required: '備品名は必須です。' })} defaultValue={equipment.name} />
                            <label htmlFor="purchaseAt">購入日:</label>
                            <TextField.Root
                              id="purchaseAt"
                              type="date"
                              {...register('purchaseAt', {
                                setValueAs: (value: string) => value ? new Date(value).getTime() : null,
                              })}
                              defaultValue={equipment.purchase_at ? new Date(equipment.purchase_at).toISOString().split('T')[0] : ''}
                            />
                            <label htmlFor="place">保管場所:</label>
                            <TextField.Root id="place" {...register('place')} defaultValue={equipment.place} />
                            <label htmlFor="place">状態:</label>
                            <EquipmentStatusInput initialStatus={equipment.status} register={register} />
                            <label htmlFor="tagIds">タグ</label>
                            <TagInput initialTags={equipment.tags} />
                          </Grid>
                          <Flex align="center" justify="between" py="9">
                            <Link href="/equipments">戻る</Link>
                            <Button>登録</Button>
                          </Flex>
                        </form>
                      </FormProvider>
                    )}
      </Box>
    </Container>
  );
}
