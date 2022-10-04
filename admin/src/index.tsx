import React from 'react';
import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';

import Input from './components/PointListInput';
import Icon from './components/PointListIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    // app
  },
  async registerTrads(app) {
    const { locales } = app;

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
