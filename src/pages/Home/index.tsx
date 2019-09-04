import React from 'react';
import Search from 'antd/lib/input/Search';
import  { Map }  from  'react-amap';
export default class Home extends React.Component {
    amapEvents: { created: (mapInstance: any) => void; };
    constructor(props){
        super(props);
        this.amapEvents = {
            created: (mapInstance) => {
                mapInstance.setMapStyle('amap://styles/dark');
                
            }
        }
    }
    
    componentDidMount(){
        
    }
    render() {
        return (
            <React.Fragment>
                <Search 
                    enterButton
                    className="searchBox"
                />
                <Map 
                    amapkey={'c6d6cc24ae396c1966e4f38f65d0e388'} 
                    version={'1.4.15'} 
                    events={this.amapEvents}
                />
            </React.Fragment>
        )
    }
}