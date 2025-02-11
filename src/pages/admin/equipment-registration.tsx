import { EquipmentsRequest } from '@/types';
import { Box, Button, Container, Flex, Grid, Heading, Link, TextField } from '@radix-ui/themes';
import { SubmitHandler, useForm } from "react-hook-form";


export default function EquipmentRegistrationPage() {

  const { handleSubmit, register, formState: { errors } } = useForm<EquipmentsRequest>();
  const onSubmit: SubmitHandler<EquipmentsRequest> = (data) => {
    console.log(data);
  }
  return (
    <Container align="center" maxWidth="800px" px="3" py="3">
      <Heading as="h1" align="center">管理者用備品登録</Heading>
      <Box py="150px">
        <form onSubmit={handleSubmit(onSubmit)} method='GET' action='equipments'>
          <Grid columns="150px 1fr" gap="5">
            <label htmlFor="equipment_id">備品管理番号:</label>
            <TextField.Root id='equipment_id' {...register('equipment_id')} />
            <label htmlFor="name">備品名:</label>
            <TextField.Root id='name' {...register('name', { required: "備品名は必須です。" })} />
            <label htmlFor="purchase_date">購入日:</label>
            <TextField.Root type='date' id='purchase_date' />
            <label htmlFor="place">保管場所:</label>
            <TextField.Root id='place' />
            <label htmlFor="tag">タグ</label>
            <TextField.Root id='tag' />
          </Grid>
          <Flex align="center" justify="between" py="9">
            <Link href='/equipments'>戻る</Link>
            <Button type='submit'>登録</Button>
          </Flex>
        </form>
      </Box>
    </Container>
  );
}