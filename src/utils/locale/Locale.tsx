import { observer } from 'mobx-react';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { ls } from './locale.state';

@observer
export default class Locale extends React.Component {
    render() {
        return (
            <IntlProvider locale={ls.locale} messages={ls.messages}>
                {this.props.children}
            </IntlProvider>
        );
    }
}