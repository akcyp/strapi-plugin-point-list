import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'point-list',
    plugin: 'strapi-plugin-point-list',
    type: 'string',
  });
};
