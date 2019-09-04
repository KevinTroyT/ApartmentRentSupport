import { helper } from './Helper';
import { loginUserState } from 'app/state/login.user.state';
import { IMenu } from './MenuState';
import { observable, action } from 'mobx';
import { eventHelper } from 'app/helper/event.helper';
import { Menus } from 'layout/desktop/menu';
import { roleHelper } from 'app/helper/role.helper';
import { urlHelper } from 'app/helper/url.helper';
import { ls } from 'app/locale/locale.state';

export interface SidebarState {
    collapseMenu: number;
    subCollapseMenu: number;
}

export interface IMenu {
    link: string;
    name: string;
    icon?: string;
    subMenus?: IMenu[];
    roles?: any[] | Function;
    collapse?: boolean;
    resourceType?: string;
}

export class MenuState {
    @observable menus: SidebarState = {
        collapseMenu: -1,
        subCollapseMenu: -1
    };
    @observable baseMenus: IMenu[];
    addResourceTypesMenu(baseMenus: IMenu[]) {
        return baseMenus;
    }
    constructor() {
        let menus = Menus.slice();
        menus = menus.filter(m => {

            // 匿名用户隐藏全部其它菜单
            if (roleHelper.hasRole([roleHelper.roles.Anonymous])) {
                return false;
            }

            if (m.link === '/profile' && roleHelper.hasRole([roleHelper.roles.DASHBOARD_SIMPLE])) {
                return false;
            } else {
                return true;
            }
        });
        let meetingRoomTypes = loginUserState.loginUser.meetingRoomTypes.reverse();
        meetingRoomTypes.map(resource => {
            if(frontConfig['web.page.version'] === 'v3') {
                return resource;
            }
            let icon = 'mdi-book';
            switch (resource.key) {
                case 'CAR':
                    icon = 'mdi-car';
                    break;
                case 'LAB_EQU':
                    icon = 'mdi-dns';
                    break;
                default:
                    break;
            }
            let bookingResource: IMenu = {
                link: '/resource/' + resource.key + '/booking',
                name: 'reservation',
                icon: icon,
                collapse: roleHelper.hasRole(roleHelper.roles.DASHBOARD_SIMPLE) ? false : true,
                resourceType: resource.key,
                subMenus: [
                    {
                        link: '/resource/' + resource.key + '/blocks',
                        name: 'booking.resource.by.time',
                        resourceType: resource.key
                    },
                    {
                        link: '/resource/' + resource.key + '/calendars',
                        name: 'find.time',
                        resourceType: resource.key
                    }
                ]
            };
            if(frontConfig['web.page.version'] === 'v5' && resource.key === 'ROOM' && bookingResource.subMenus) {
                bookingResource.subMenus.push({
                    link: '/resource/' + resource.key + '/bookings',
                    name: '预订会议',
                    resourceType: resource.key
                });
            }
            if (roleHelper.hasRole(roleHelper.roles.VIDEO_CONFERENCING) && resource.key === 'ROOM' && bookingResource.subMenus) {
                bookingResource.subMenus.push({
                    link: '/resource/' + resource.key + '/video',
                    name: '预订视频会议',
                    resourceType: resource.key
                });
            }
            if (resource.supportMap === true) {
                if (bookingResource.subMenus) {
                    if (bookingResource.resourceType === 'SEAT') {
                        let link: string = '/resource/' + resource.key + '/map';
                        if(loginUserState.loginUser.corpName.match(/药明/g)) {
                            link += '/summary';
                        }
                        bookingResource.subMenus = [{
                            link: link,
                            name: 'find.seat.by.map',
                            resourceType: resource.key
                        }];
                    } else {
                        bookingResource.subMenus = [{
                            link: '/resource/' + resource.key + '/map',
                            name: 'find.station.by.map',
                            resourceType: resource.key
                        }];
                    }
                }
            }
            if (resource.key === 'PRIV_ROOM') {
                bookingResource = {
                    link: '/resource/' + resource.key + '/calendars',
                    name: 'reservation',
                    icon: icon,
                    collapse: roleHelper.hasRole(roleHelper.roles.DASHBOARD_SIMPLE) ? false : true,
                    resourceType: resource.key
                };
                bookingResource.subMenus = [
                    {
                        link: '/resource/' + resource.key + '/calendars',
                        name: ls.fm('PRIV_ROOM'),
                        resourceType: resource.key
                    }
                ];
            }
            menus.splice(1, 0, bookingResource);
        });
        if (meetingRoomTypes.length > 1) {
            menus.map(m => {
                if (m.name === 'resource.admin') {
                    m.name = 'resource.management';
                    m.link = 'admin/resource/' + meetingRoomTypes[meetingRoomTypes.length - 1].key;
                    if (m.subMenus) {
                        m.subMenus.shift();
                        meetingRoomTypes.map(resource => {
                            (m.subMenus as IMenu[]).unshift({
                                link: 'admin/resource/' + resource.key,
                                name: resource.key
                            });
                        });
                    }
                }
            });
        } else if (meetingRoomTypes.length === 1) {
            menus.map(m => {
                if (m.name === 'resource.admin') {
                    m.link = 'admin/resource/' + meetingRoomTypes[0].key;
                }
                if (m.subMenus) {
                    m.subMenus.map(subMenu => {
                        if (subMenu.name === 'meeting.room') {
                            subMenu.link = 'admin/resource/' + meetingRoomTypes[0].key;
                        }
                    });
                }
            });
        }
        this.baseMenus = this.addResourceTypesMenu(menus).filter(m => {
            if (m.roles) {
                if ((m.roles as any[]).slice) {
                    m.roles = (m.roles as any[]).slice();
                    if(frontConfig['web.page.version'] === 'v3') {
                        return m.roles.indexOf('Role_ADMIN') > -1;
                    }
                }
                if (Array.isArray(m.roles)) {
                    if(frontConfig['web.page.version'] === 'v3') {
                        return m.roles.indexOf('Role_ADMIN') > -1;
                    }
                    return roleHelper.hasRole(m.roles);
                } else if (m.roles) {
                    return m.roles();
                }
            } else {
                if(frontConfig['web.page.version'] === 'v3') {
                    return false;
                }
                return true;
            }
        });
        this.baseMenus.map(m => {
            if (m.subMenus) {
                m.subMenus = m.subMenus.filter(s => {
                    let roles = s.roles;
                    if (roles) {
                        if ((roles as any[]).slice) {
                            roles = (roles as any[]).slice();
                        }
                        if (Array.isArray(roles)) {
                            return roleHelper.hasRole(roles);
                        } else if (roles) {
                            return roles();
                        }
                    } else {
                        return true;
                    }
                });
            }
        });
        urlHelper.history.listen((r, v) => {
            this.init();
        });
        setTimeout(() => {
            this.init();
        }, 100);
    }

    @action setMenus(menus: SidebarState) {
        this.menus = menus;
    }

    @action init() {
        let navs: Array<IMenu> = [];
        this.baseMenus.map((menu, index) => {
            menu.link = urlHelper.getPath(menu.link);
            if (window.location.pathname.indexOf(menu.link) === 0) {
                if (navs.map(n => n.link).indexOf(menu.link) === -1) {
                    navs.splice(navs.map(n => n.link).indexOf(menu.link), 1);
                }
                navs.push(menu);
                this.setMenus({
                    collapseMenu: index,
                    subCollapseMenu: -1
                });
            }
            if (menu.subMenus) {
                menu.subMenus.map((m, i) => {
                    m.link = helper.getPath(m.link);
                    if (window.location.pathname.indexOf(m.link) === 0) {
                        if (navs.map(n => n.link).indexOf(m.link) === -1) {
                            navs.splice(navs.map(n => n.link).indexOf(m.link), 1);
                        }
                        navs.push(m);
                        this.setMenus({
                            collapseMenu: index,
                            subCollapseMenu: i
                        });
                    }
                });
            }
        });
        if (navs) {
            eventHelper.dispatch(eventHelper.event.SetNav, navs);
        }
        if ($) {
            $('.scroll-sidebar').slimScroll({
                position: 'left'
            , size: '5px'
            , height: '100%'
            , color: '#dcdcdc'
            });
            $('.scroll-sidebar, .slimScrollDiv')
                .css('overflow-x', 'visible').parent().css('overflow', 'visible');
        }
    }
}
