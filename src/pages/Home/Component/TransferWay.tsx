
import React from 'react';
import { observer } from 'mobx-react'
import { MapState }  from  '../../../states/map.state'
import { appInject } from  '../../../utils/app/app.container';
import { toJS } from 'mobx';
import { Drawer } from 'antd';

@observer
export default class TransferWay extends React.Component<{}> {
    @appInject.lazyInject(MapState) mapState: MapState;
    state = { visible: false };
    constructor(props){
        super(props)
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
        if(window.AMap && this.mapState.markerLocation && this.mapState.lastMakerLocation) {
            let _this = this;
            let transfer: any;
            window.AMap.plugin(["AMap.Transfer"],() => {
                transfer = new AMap.Transfer({
                    city: '上海市',
                    map: this.props.__map__,
                    panel: 'panel'
                })
                let pointA = [toJS(this.mapState.lastMakerLocation).longitude,toJS(this.mapState.lastMakerLocation).latitude];
                console.log('point',pointA)
                let pointB = [toJS(this.mapState.markerLocation).longitude,toJS(this.mapState.markerLocation).latitude];
        
                transfer.search(pointA, pointB, (status: any,  result: any) => {
                    console.log(status)
                    console.log(result)
                    if(status === 'complete'){
                        this.showDrawer();
                    }
                })
            });
        }
        return (
            <Drawer
                title="推荐路线"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
                zIndex={3}
                width={'400px'}
            >
                <div id="panel" style={{width: '100%'}}/>;
            </Drawer>
        )
    }
}