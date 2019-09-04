
export enum GlobalEvents {
    ReloadResource = 'ReloadResource',
    SideBarTopButtonClick = 'SideBarTopButtonClick',
    ReloadEmployees = 'ReloadEmployees',
    HideDrawer = 'HideDrawer',
    EditArea = 'EditArea',
    EditDepartment = 'EditDepartment',
    LoadTags = 'LoadTags',
    EditMeeting = 'EditMeeting',
    FixedMeeting = 'FixedMeeting',
    EditDevice = 'EditDevice',
    MouseUp = 'MouseUp',
    CancelMeeting = 'CancelMeeting',
    ApprovalMeeting = 'ApprovalMeeting',
    CreateMeeting = 'CreateMeeting',
    BillRecord = 'BillRecord',
    AuthFail = 'Reload',
    NoticeMessage = 'NoticeMessage',
    WarnMessage = 'WarnMessage',
    Login = 'Login',
    ShowDrawer = 'ShowDawer',
    UpdateRole = 'UpdateRole',
    SetNav = 'SetTitle',
    MeetingSettingReset = 'MeetingSettingReset',
    ResizeWindow = 'ResizeWindow',
    ReloadGroup = 'ReloadGroup',
    EditFacility = 'EditFacility',
    HideBlurCover = 'HideBlurCover',
    changeBookingDate = 'changeBookingDate',
    BatchEntry = 'BacthEntry',
    BacthSeparation = 'BacthSeparation',
    ServiceMeetingManager = 'ServiceMeetingManager',
    ServiceMeetingManagerItem = 'ServiceMeetingManagerItem',
    ServiceItemPrice = 'ServiceItemPrice',
    ServiceManagerItemDel = 'ServiceManagerItemDel',
    ServiceItemPriceDel = 'ServiceItemPrice',
    ReloadDeptPrice = 'ReloadDeptPrice',
    RewardsPunishmentList = 'RewardsPunishmentList',
    ViolationLevel = 'ViolationLevel',
    filterStartTime = 'filterStartTime',
    filterEndTime = 'filterEndTime',
}

var eventList: { [index: string]: Array<Function> } = {};

export interface IDispatcherEvent {
    index: number;
    name: string;
}

export class Dispatcher {
    events = GlobalEvents;
    subscribe(eventName: GlobalEvents | string, eventHandler: Function, only?: boolean) {
        if (eventList[eventName] === undefined) {
            eventList[eventName] = [];
        }
        if (only === true) {
            eventList[eventName] = [eventHandler];
        } else {
            eventList[eventName].push(eventHandler);
        }
        const result: IDispatcherEvent = {
            name: eventName,
            index: eventList[eventName].length - 1
        };
        return result;
    }

    unSubscribe(event: IDispatcherEvent) {
        if (event && eventList[event.name]) {
            eventList[event.name].splice(event.index, 1);
        }
    }

    dispatch(eventName: GlobalEvents | string, ...args: any[]) {
        var myEventList = eventList[eventName];
        if (myEventList !== undefined) {
            for (let i of myEventList) {
                i.apply(this, args);
            }
        }
    }
    reset() {
        for (let k in eventList) {
            if (k) {
                eventList[k] = [];
            }
        }
    }
    get eventList() {
        return eventList;
    }
}

class EventHelper {
    event = GlobalEvents;
    private dispatcher = new Dispatcher();
    subscribe(eventName: GlobalEvents | string, eventHandler: Function, only?: boolean) {
        return this.dispatcher.subscribe(eventName, eventHandler, only);
    }

    unSubscribe(event: IDispatcherEvent) {
        this.dispatcher.unSubscribe(event);
    }

    dispatch(eventName: GlobalEvents | string, ...args: any[]) {
        this.dispatcher.dispatch(eventName, ...args);
    }

}

export const eventHelper = new EventHelper(); 