
import LoadingState, { LoadingStateType } from './state/loading.state';
import { eventHelper, IDispatcherEvent, GlobalEvents } from './helper/eventHelper';
import { observable, action, isArrayLike } from 'mobx';

export class DataFlow<T> {
    @observable value: T;
    loadingState: LoadingStateType = LoadingState.create();
    private eventsListen: Array<IDispatcherEvent> = [];
    submiting: boolean;
    constructor(private _loadData: (...args: any[]) => Promise<T>, private callback?: (value: T) => void) { }
    @action private setValue(value: T) {
        this.value = value;
    }
    loadData = (...args: any[]) => {
        this.loadingState.start();
        return this._loadData(...args).then((res) => {
            this.setValue(res);
            this.loadingState.finish(res);
            if (this.callback) {
                this.callback(res);
            }
            return res;
        });
    }

    startListenEvent(events: Array<GlobalEvents>, callback?: () => void) {
        events.map(event => {
            this.eventsListen.push(eventHelper.subscribe(event, () => {
                if (callback) {
                    callback();
                } else {
                    this.loadData();
                }
            }));
        });
    }

    stopListenEvent() {
        this.eventsListen.map(event => {
            eventHelper.unSubscribe(event);
        });
    }

    clear() {
        this.stopListenEvent();
        this.value = undefined as any;
        this.loadingState.reset();
    }

    get formProps() {
        return {
            values: this.value
        };
    }

    resetValue(value: T) {
        this.value = value;
    }

    find(id: string) {
        if (Array.isArray(this.value) || isArrayLike(this.value)) {
            return this.value.find(v => v.id === id);
        }
        return undefined;
    }

    setSubmiting(state: boolean) {
        this.submiting = state;
    }
}