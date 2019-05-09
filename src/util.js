import { getLangs, getUrlForLang } from "ptz-i18n";

/**
 *
 * Taken from main layout from gatsby-i18n-example
 *
 * @param {*} languages
 * @param {*} currentLanguage
 * @param {*} homeLink
 * @param {*} currentUrl
 */
const getLanguageMenu = (
  currentLanguage,
  currentUrl,
  languages,
  defaultLanguage
) => {
  const homeLink = `/${currentLanguage}/`.replace(`/${defaultLanguage}/`, "/"); // removes default language key because home url in default language is only /
  return getLangs(
    languages,
    currentLanguage,
    langKey => getUrlForLang(homeLink, currentUrl, langKey) // get's called inside map in getLangs
  ).map(item => ({
    ...item,
    link: item.link.replace(`/${defaultLanguage}`, `/`)
  }));
};
export { getLanguageMenu };
