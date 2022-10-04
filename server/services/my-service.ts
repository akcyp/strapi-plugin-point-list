import { Strapi } from '@strapi/strapi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ strapi }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    return 'This app is using strapi-plugin-point-list 🚀';
  },
});
