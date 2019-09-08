import React from 'react';
import Search from 'antd/lib/input/Search';
import  { Map, Marker, Markers }  from  'react-amap';
import { observer } from 'mobx-react'
import { MapState }  from  '../../states/map.state'
import { appInject } from  '../../utils/app/app.container';
import { toJS } from 'mobx';
import TransferWay from './Component/TransferWay'

@observer
export default class Home extends React.Component<{}> {
    @appInject.lazyInject(MapState) mapState: MapState;
    // @appInject
    amapEvents: any;
    markerPosition: any;
    markerEvents: { created: (markerInstance: any) => void; };
    

    constructor(props: Readonly<{}>){
        super(props);
        this.amapEvents = {
            created:(e: any) => {
                e.setMapStyle('amap://styles/dark');
                let auto: any;
                let geocoder: any
                window.AMap.plugin('AMap.Autocomplete',() => {
                    auto = new window.AMap.Autocomplete({input:'tipinput'});
                })

                window.AMap.plugin(["AMap.Geocoder"],function(){
                    geocoder= new AMap.Geocoder({
                        radius:1000, //以已知坐标为中心点，radius为半径，返回范围内兴趣点和道路信息
                        extensions: "all"//返回地址描述以及附近兴趣点和道路信息，默认"base"
                    });
                });

                window.AMap.plugin('AMap.PlaceSearch',() => {
                    let place = new window.AMap.PlaceSearch({})
                    let _this = this
                    window.AMap.event.addListener(auto,"select",(e: any) => {
                        place.search(e.poi.name)
                        geocoder.getAddress(e.poi.location,(status: any,result: any) =>{
                            if (status === 'complete'&&result.regeocode) {
                                _this.mapState.setNewLocation({longitude: e.poi.location.lng,latitude: e.poi.location.lat})
                            }
                        })
                    })
                })
            },
            click:(e: any) => {
                const _this = this
                var geocoder;
                window.AMap.plugin(["AMap.Geocoder"],function(){
                    geocoder= new AMap.Geocoder({
                        radius:1000, //以已知坐标为中心点，radius为半径，返回范围内兴趣点和道路信息
                        extensions: "all"//返回地址描述以及附近兴趣点和道路信息，默认"base"
                    });
                    geocoder.getAddress(e.lnglat,(status: any,result: any) => {
                        if (status === 'complete'&&result.regeocode) {
                            _this.mapState.setNewLocation({longitude: e.lnglat.lng,latitude: e.lnglat.lat})
                        }
                    })
                });
                
            }
        }
    
    
    }
    render() {
        
        return (
            <React.Fragment>
                <div className="inputbox"   style={{position:'absolute',top:'20px',left:'80px',zIndex:2}}>
                    <Search         
                        id="tipinput"
                        enterButton
                    />
                </div>
                
                <Map 
                    amapkey={'c6d6cc24ae396c1966e4f38f65d0e388'} 
                    version={'1.4.15'} 
                    plugins={['ToolBar']}
                    events={this.amapEvents}
                    zoom={12}
                    center={this.mapState.mapCenter}
                >
                    <TransferWay />
                    <Markers markers={toJS(this.mapState.markers)} />
                </Map>
            </React.Fragment>
        )
    }
}