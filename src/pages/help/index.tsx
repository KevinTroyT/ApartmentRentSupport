import React from 'react';
import { Drawer, Button } from 'antd';
import { ls } from '../../utils/locale/locale.state';
export default class HelpDocument extends React.Component {
    state = {
        lang: localStorage.getItem('locale')
    }
    constructor(props: any){
        super(props);
    }
    languageChange(){
        if(localStorage.getItem('locale') === 'en'){
            ls.setLocale('zh')
        } else {
            ls.setLocale('en')
        }
        this.setState({
            lang: localStorage.getItem('locale')
        });
    }
    render() {
        return (
            <div>
                <h1>{ls.fm('help.document.msg')}</h1>
                <Button onClick={this.languageChange}>
                    {this.state.lang}
                </Button>
            </div>
        )
    }
}