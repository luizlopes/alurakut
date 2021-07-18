import { config } from 'dotenv';
import { SiteClient } from 'datocms-client';

export default async function handler(request, response) {
  if (request.method != 'POST') {
    response.status(404).json({
      message: 'Method not allowed'
    });
    return;
  }

  const TOKEN = process.env.DATO_CMS_TOKEN;
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
