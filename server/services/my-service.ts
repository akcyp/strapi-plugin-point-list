import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    return 'This app is using strapi-plugin-point-list 🚀';
  },
});
