import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';

import Initializer from './components/Initializer';
import PointList from './components/PointList';

/*
  Since strapi doesn't support custom fields in v4, we have to overwrite the current implementation
*/
import { intercept } from './utils/intercept';
import * as helperPlugin from '@strapi/helper-plugin';
intercept(helperPlugin, 'GenericInput', ({ args: [props], resolve }) => {
  const type = props.attribute.fieldRenderer || props.type;
  return resolve({
    ...props,
    type,
  });
});

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addFields([{
      type: 'pointlist',
      Component: PointList,
    }]);

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {
    // const ctb = app.getPlugin('content-type-builder');
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );
    return Promise.resolve(importedTrads);
  },
};
