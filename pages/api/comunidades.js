import { SiteClient } from 'datocms-client';

export default async function handler(request, response) {
  const TOKEN = 'put token here';
  const client = new SiteClient(TOKEN);

  const comunidade = {
    itemType: '975662',
    ...request.body,
  };

  const comunidadeCriada = await client.items.create(comunidade);

  response.status(201).json({
    comunidade: comunidadeCriada
  });

  return;
}
