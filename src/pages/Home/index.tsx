import React from 'react';
import {config} from './config';
export default class Home extends React.Component {

    constructor(props){
        super(props)
    }
    componentDidMount(){
        let  styleConfig = config;
        const { BMap, BMAP_STATUS_SUCCESS } = window
        let map = new BMap.Map("allmap"); // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);
        map.setMapStyleV2({styleJson:styleConfig});
    }
    render() {
        return (
            <div id="allmap" style={{ position: "absolute", top: 0, left: 0, width: '100vw', height: '100vh' }}></div>
        )
    }
}