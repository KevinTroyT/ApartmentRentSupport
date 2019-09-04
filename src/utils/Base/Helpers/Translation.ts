import { IntlProvider } from 'react-intl';

export class Translation {
    static translationWithResource = (
        translations: { [index: string]: string }, appLangs?: { [index: string]: { [index: string]: string } }
    ) => {
        if (translations === undefined || appLangs === undefined) {
            throw 'translation file load error';
        }
        if (appLangs.replaces) {
            for (let keyWord in appLangs.replaces as { [index: string]: string }) {
                if (appLangs.replaces[keyWord]) {
                    translations[keyWord] = appLangs.replaces[keyWord];
                }
            }
        }
        let result: { [index: string]: string } = JSON.parse(JSON.stringify(translations));
        for (let key in result) {
            if (result[key]) {
                if (typeof (result[key]) === 'string') {
                    let matches = result[key].match(/\$\{(.*?)\}/g);
                    if (matches) {
                        for (let match of matches) {
                            let r = match.replace('${', '');
                            r = r.replace('}', '');
                            let v = r.split('.')[0];
                            let k = r.split('.')[1];
                            result[key] = result[key].replace(match, appLangs[v][k]);
                        }
                    }
                } else {
                    if (typeof (result[key]) === 'object') {
                        Object.keys(result[key]).map(k => {
                            let k1 = result[key] as any;
                            result[k + '.' + key] = k1[k];
                        });
                        delete result[key];
                    }
                }
            }
        }
        return result;
    }
    // tslint:disable-next-line:member-ordering
    static translations = Translation.translationWithResource(
        typeof (lan) !== 'undefined' ? lan : {},
        typeof (app_langs) !== 'undefined' ? app_langs : {}
    );
}
export const intl = new IntlProvider({ messages: Translation.translations, locale: 'en' }).getChildContext().intl;