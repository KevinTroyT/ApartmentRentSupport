import React from  'react'
import { observable, action, computed } from 'mobx'
import { injectable, decorate } from 'inversify';
import "reflect-metadata";

export class MapState {
    @observable lastMakerLocation: any;
    @observable markerLocation: any;
    @observable markers: Array<any>;    
    @observable mapCenter: any;


    setNewLocation(location: any){
        this.lastMakerLocation = this.markerLocation  
        this.markerLocation = location;
        if(!this.markers){
            this.markers = [{position: location}]
        }else {
            this.markers.push({position: location});
        }
        console.log(this.markers)
        // AMap.add({position: location})
        this.mapCenter = location;
    }
}
decorate(injectable(),MapState);