import React from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import { IntlContextProvider } from "./intl-context";

const getLocaleData = locale => {
  try {
    const localeData = require(`react-intl/locale-data/${locale}`); // eslint-disable-line import/no-dynamic-require

    return localeData;
  } catch (e) {
    return false;
  }
};

const addLocaleForPage = language => {
  let localeData = null;
  localeData = getLocaleData(language);
  if (!localeData && language.length > 2) {
    const locale = language.substring(0, 2);
    localeData = getLocaleData(locale);
  }

  if (!localeData) {
    throw new Error(`Cannot find react-intl/locale-data/${language}`);
  }

  addLocaleData(...localeData);
};

const WrapPage = ({ element, props }) => {
  if (!props) {
    return false;
  }
  const { intl } = props.pageContext;
  if (intl) {
    const { language, languages, defaultLanguage, messages, path } = intl;

    addLocaleForPage(language);

    return (
      <IntlProvider
        locale={language}
        messages={messages}
        languages={languages}
        path={path}
        defaultLanguage={defaultLanguage}
      >
        <IntlContextProvider value={intl}>{element}</IntlContextProvider>
      </IntlProvider>
    );
  }
  return element;
};

export default WrapPage;
