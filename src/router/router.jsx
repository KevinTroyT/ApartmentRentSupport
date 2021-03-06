import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { Drawer, Button, Input } from 'antd';
import Home from '../pages/Home/index';
import HelpDocument from '../pages/help/index';
import Locale from 'utils/locale/Locale';
import { ls } from 'utils/locale/locale.state';
class MenuButton extends React.Component {

    state = {
        visible: false
    }
    
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render(){
        ls.setLocale('zh');
        return (
            <div>
                <div className="topbar">
                    <Button 
                        onClick={this.showDrawer}
                        icon="menu"
                        className="menuButton"
                    />
                </div>
                <Drawer
                    title="Menu"
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    width={300}
                >   
                        <div>
                            <ul>
                                <li><Link to="/index">首页</Link></li>
                                <li><Link to="/help">帮助</Link></li>
                            </ul>
                        </div>
                </Drawer>
            </div>
        )
    }
}
const getRouter = () => {
    
    return (
        <React.Fragment>
        <Router>
            <MenuButton />
            <Locale>
                <Switch>
                    <Route exact path="/help" component={HelpDocument}/>
                    <Route exact path="/index" component={Home}/>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </Locale>
        </Router>
    </React.Fragment>
    )
}
export default getRouter;