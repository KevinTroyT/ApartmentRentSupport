import React from 'react';
import { Drawer, Button } from 'antd';
export default class Page1 extends React.Component {
    state = { visible: false };
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
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>
                    Open
                </Button>
                <Drawer
                    title="Basic Drawer"
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
          </div>
        )
    }
}