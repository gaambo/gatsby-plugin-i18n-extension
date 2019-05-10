# gatsby-plugin-i18n-extend

An Extension for [gatsby-plugin-i18n](https://github.com/angeloocana/gatsby-plugin-i18n) with the following additional features: 
- ContextProvider component
- Page wrapper which inserts all intl props
- Util for generating a language switcher
- Creates multilingual pages from page components in $name.$lang.js format (eg: index.js + index.en.js, page-2.js page-2.en.js) - the langkey is taken from the filename and it inserts all intl props correctly

# Installation & Configuration
Install via npm like any other gatsby plugin and configure in `gatsby-config.js`:

```
{
  resolve: `gatsby-plugin-i18n-extension`,
  options: {
    path: `${__dirname}/src/data/language/`,
    langKeyDefault: config.defaultLanguage,
    languages: config.languages
  }
},
```

# Requirements
This is an extension to the awesome work of [gatsby-plugin-i18n](https://github.com/angeloocana/gatsby-plugin-i18n). It uses the [ptz-i18n](https://github.com/angeloocana/gatsby-plugin-i18n/tree/master/packages/ptz-i18n) package of the same guys. Some features are inspired by [gatsby-plugin-intl](https://github.com/wiziple/gatsby-plugin-intl) but I had some problems with the process/structure of this plugin.