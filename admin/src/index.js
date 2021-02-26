import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './containers/Initializer';
import lifecycles from './lifecycles';
import trads from './translations';
import PointList from './components/PointList/index';

export default strapi => {
  const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;
  const icon = pluginPkg.strapi.icon;
  const name = pluginPkg.strapi.name;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon,
    id: pluginId,
    initializer: Initializer,
    injectedComponents: [],
    isReady: false,
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles,
    name,
    preventComponentRendering: false,
    trads
  };

  strapi.registerField({ type: 'pointlist', Component: PointList });
  return strapi.registerPlugin(plugin);
};
