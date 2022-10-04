import { Strapi } from '@strapi/strapi';
import pluginPkg from '../package.json';

export default ({ strapi }: { strapi: Strapi }) => {

  strapi.customFields.register({
    name: 'point-list',
    plugin: pluginPkg.strapi.name,
    type: 'string',
  });
};
