declare const frontConfig: string;
declare const copyright: string;
declare const sessionId: string;
declare const apiServiceHost: string;
declare const platform: string;
declare var loginUser: any;
declare var serviceHost: any;
declare const dateTimeFormat: any;
declare var translations: { [index: string]: string };

declare module 'react-router-transition';
declare module 'yup';
declare module 'react-date-range';
declare module 'react-treeview';
declare module 'waves';
declare module 'qs';
declare const lan: { [index: string]: string };
declare const app_langs: { [index: string]: { [index: string]: string } };
declare module 'intl-locales-supported';
declare module 'pingpp-js';
declare module 'wangeditor';
declare module 'rc-form';
declare module 'zepto';
declare module 'zepto.touch';
declare module 'react-amap-plugin-autocomplet';
declare var _MEIQIA: any;
declare var sentryId: string;
declare var sentryCode: string;
declare var arr: Array<string>;
declare var logoUrl: string;
declare var contextPath: string;
declare var appName: string;
declare var baseUrl: string;
declare var baseDomain: string;
declare var AMap: any;

declare module 'axios-mock-adapter';
declare module 'axios-progress-bar' {
    export function loadProgressBar(): any;
}

// cSpell:ignore weui
// cSpell:ignore notie
declare module 'react-weui' {
    export function LoadMore(): any;
    export function InfiniteLoader(): any;
    export function Footer(): any;
    export function FooterLinks(): any;
    export function FooterLink(): any;
    export function FooterText(): any;
    export function Popup(): any;
    export function Article(): any;
    export function Button(): any;
    export function SearchBar(): any;
    export function Checkbox(): any;
    export function PopupHeader(): any;
    export function CityPicker(): any;
    export function NavBarItem(): any;
    export function NavBar(): any;
    export function TabBody(): any;
    export function Tab(): any;
    export function Dialog(): any;
    export function Switch(): any;
    export function CityPicker(): any;
    export function Form(): any;
    export function Radio(): any;
    export function CellFooter(): any;
    export function CellBody(): any;
    export function FormCell(): any;
    export function Grids(): any;
    export function Select(): any;
    export function ActionSheet(): any;
    export function CellsTitle(): any;
    export function ButtonArea(): any;
    export function Page(): any;
    export function Cells(): any;
    export function Cell(): any;
    export function CellBody(): any;
    export function CellFooter(): any;
    export function CellHeader(): any;
    export function Panel(): any;
    export function PreviewButton(): any;
    export function PreviewFooter(): any;
    export function PreviewBody(): any;
    export function PreviewItem(): any;
    export function PreviewHeader(): any;
    export function Preview(): any;
    export function PanelHeader(): any;
    export function PanelBody(): any;
    export function MediaBox(): any;
    export function MediaBoxTitle(): any;
    export function MediaBoxDescription(): any
}
declare module 'react-touch';
declare module 'react-infinite-calendar';
declare module 'react-lazyload';
interface LoginUser {
    id: string;
    corp: {
        id: string,
        name: string,
        meetingRoomCount: number,
        func: string[]
    };
    status: string;
    name: string;
    email: string;
    lang: string;
    deptName: string;
    subscribeWeixin: boolean;
    weixinName: string;
    weixinSubscribeUrl: string;
    roles: Array<string>;
    meetingRoomCount: number;
    currentMeetingRoomId: string;
}
declare module 'notie';

declare var pageCookie: string;
declare var _hmt: {
    push: Function;
}


interface Resource {
    name: string;
    inviteAble: boolean;
    roomFields?: {
        capacity?: {
            show: boolean
        }
    }
}
declare var resource: Resource;
declare namespace wx {
    function invoke(jsApi: string, config: {
        fromDepartmentId: number | string;
        mode: "single"| "multi";
        type: Array<"department" | "user">;
        selectedDepartmentIds: Array<string>;
        selectedUserIds: Array<string>;
    }, callback: (
        res: {
            err_msg: string;
            result: string | any;
        }
    )=>void, fallCallback: Function): void;
}

declare const customerMessage: any;
