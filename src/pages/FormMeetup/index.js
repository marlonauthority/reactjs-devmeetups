import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';

import { toast } from 'react-toastify';

import DatePicker from './components/DatePicker';
import BannerInput from './components/BannerInput';

import { MdAddCircleOutline } from 'react-icons/md';
import { Container, Content } from './styles';

import { createMeetupRequest } from '~/store/modules/meetup/actions';

const schema = Yup.object().shape({
  banner_id: Yup.number().required(() => toast.error('Imagem obrigatória!')),
  title: Yup.string().required('Título obrigatório'),
  description: Yup.string().required('Descrição obrigatória.'),
  date_hour: Yup.date().required('Data e hora são obrigatórios'),
  location: Yup.string().required('Localização obrigatório'),
});

export default function FormMeetup() {
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    dispatch(createMeetupRequest(data));
  }
  return (
    <Container>
      <Content>
        <Form schema={schema} onSubmit={handleSubmit}>
          <BannerInput name="banner_id" />

          <Input name="title" placeholder="Título do Meetup" />
          <Input
            name="description"
            multiline
            placeholder="Descrição Completa"
          />

          <DatePicker name="date_hour" placeholder="Data do Meetup" />
          <Input name="location" placeholder="Localização" />

          <section>
            <button type="submit">
              <MdAddCircleOutline size={22} color="#fff" /> Salvar meetup
            </button>
          </section>
        </Form>
      </Content>
    </Container>
  );
}