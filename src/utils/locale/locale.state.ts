import { observable, action } from 'mobx';
import { enMessages } from './en.messages';
import { zhMessages } from './zh.messages';
import * as en from 'react-intl/locale-data/en';
import * as zh from 'react-intl/locale-data/zh';
import { addLocaleData, IntlProvider, InjectedIntl } from 'react-intl';
class LocalState {
    @observable messages: any;
    @observable locale: string;
    @observable data: ReactIntl.Locale[];
    @observable _intl: InjectedIntl;

    @action setLocale(locale: string, langTheme?: string) {
        if (locale === 'zh') {
            addLocaleData(zh);
            let message = Object.assign(zhMessages);
            if (typeof (customerMessage) !== 'undefined') {
                message = Object.assign(zhMessages, customerMessage);
            }
            this.messages = message;
            this.data = zh;
            this.locale = 'zh-CN';
        } else {
            let message = Object.assign(enMessages);
            if (typeof (customerMessage) !== 'undefined') {
                message = Object.assign(enMessages, customerMessage);
            }
            this.messages = message;
            this.data = en;
            this.locale = 'en-US';
            addLocaleData(en);
        }
        this._intl = new IntlProvider({ messages: this.messages, locale: this.locale }).getChildContext().intl;
        localStorage.setItem('locale', locale);
    }

    get intl() {
        return this._intl;
    }

    fm(message: string, props?: any) {
        if (this.intl === undefined || !message) {
            return '';
        }
        return this.intl.formatMessage({ id: message }, {
            ...props,
        });
    }

}
export const ls = new LocalState();
