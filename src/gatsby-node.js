/* eslint-disable import/no-dynamic-require */
const generatePageContext = (page, pluginOptions) => {
  if (page.context.intl) {
    console.log("Skipping page, already has intl context");
    return false;
  }

  if (!page.context.langKey) {
    console.log("Skipping page, has no lang key");
    return false;
  }

  const { ...newPage } = page;
  const { langKey } = page.context;
  const intl = {
    language: langKey,
    languages: pluginOptions.languages,
    path: page.context.slug,
    defaultLanguage: pluginOptions.langKeyDefault
  };
  const messages = require(`${pluginOptions.path}${langKey}.json`);
  if (messages) {
    intl.messages = messages;
  }

  newPage.context.intl = intl;
  return newPage;
};

exports.onCreatePage = async ({ page, actions }, pluginOptions) => {
  const { createPage, deletePage } = actions;

  if (page.path.match(/^\/404\.[a-z]{2}\/$/)) {
    // Create multilingual 404 Routes
    const langKey = page.path.split(".")[1];

    const tmpPage = {
      matchPath: `/${langKey}/*`,
      context: {
        ...page.context,
        langKey
      },
      ...page
    };
    const newPage = generatePageContext(tmpPage, pluginOptions);
    if (newPage) {
      deletePage(page);
      createPage(newPage);
    }
  } else {
    // Context Generation for all other pages
    const newPage = generatePageContext(page, pluginOptions);
    if (newPage) {
      deletePage(page);
      createPage(newPage);
    }
  }
};
