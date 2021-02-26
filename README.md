# Strapi plugin point-list

A plugin for [Strapi CMS](https://github.com/strapi/strapi) that provides point list field.

![Preview-field](preview-field.png)

![Preview](preview.png)

## Installation

```bash
# npm
npm install strapi-plugin-point-list
```

## Usage

Component by default is not going to appear in the UI. You need to enable it manually. To enable the component in any content type you've to add the attribute in a configuration model json file (*.settings.json) at `api/example/models/example.settings.json`:

```diff
{
  "attributes": {
    "path": {
-      "type": "string",
+      "type": "pointlist",
+      "columnType": "text"
    }
  }
}
```

* Consider setting the "columnType" parameter to "longtext" or some other data type supported by your database.

## Before start

After successful installation you need to rebuild the strapi admin panel. Just use:

```js
# npm
npm run build && npm run develop
```

## Contributing / Developing

Feel free to post any PR or issues.
