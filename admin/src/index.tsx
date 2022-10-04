import React from 'react';
import { prefixPluginTranslations } from '@strapi/helper-plugin';

import getTrad from './utils/getTrad';
import Icon from './components/PointListIcon';
import pluginId from './pluginId';

interface IntlString {
  id: string;
  defaultMessage: string;
}

interface StrapiApp {
  customFields: {
    register(options: {
      name: string;
      pluginId: string;
      type: string;
      icon: React.FunctionComponent;
      intlLabel: IntlString;
      intlDescription: IntlString;
      components: {
        Input: () => Promise<any>;
      };
      options: {
        advanced: {
          sectionTitle: IntlString;
          items: {
            name: string;
            type: 'checkbox';
            intlLabel: IntlString;
            description: IntlString;
          }[];
        }[];
      }
    }): void;
  }
}

export default {
  register(app: StrapiApp) {
    app.customFields.register({
      name: 'point-list',
      pluginId,
      type: 'string',
      icon: Icon,
      intlLabel: {
        id: getTrad('point-list.label'),
        defaultMessage: 'Point List',
      },
      intlDescription: {
        id: getTrad('point-list.description'),
        defaultMessage: 'Select shape / area on image',
      },
      components: {
        Input: async () => import(
          /* webpackChunkName: "point-list-input-component" */ './components/PointListInput'
        ),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: getTrad('point-list.options.advanced.requiredField'),
                  defaultMessage: 'Required field',
                },
                description: {
                  id: getTrad('point-list.options.advanced.requiredField.description'),
                  defaultMessage: 'You won\'t be able to create an entry if this field is empty',
                },
              },
            ],
          },
        ],
      },
    });
  },
  async registerTrads(app: { locales: string[] }) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      locales.map(async locale => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          return {
            data: prefixPluginTranslations(data, pluginId),
            locale,
          };
        } catch {
          return {
            data: {},
            locale,
          };
        }
      })
    );
    return Promise.resolve(importedTrads);
  },
};
