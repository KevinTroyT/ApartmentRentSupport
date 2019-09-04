import { types } from 'mobx-state-tree';

const LoadingState = types.model('LoadingState', {
    state: types.optional(
        types.enumeration('loading', ['loading', 'empty', 'complete', 'waiting', 'reloading']),
        'waiting')
}).views(self => ({
    get isComplete() {
        return self.state === 'empty' || self.state === 'complete';
    },
    get isFirstLoading() {
        return self.state === 'loading';
    },
    get isReloading() {
        return self.state === 'reloading';
    },
    get isLoading() {
        return self.state === 'reloading' || self.state === 'loading';
    },
    get isEmpty() {
        return self.state === 'empty';
    },
    get isReady() {
        return self.state === 'reloading' || self.state === 'complete' || self.state === 'empty';
    },
    get isWaiting() {
        return self.state === 'waiting';
    }
}))
    .actions(self => ({
        finish(data?: any) {
            if (Array.isArray(data) && data.length === 0) {
                self.state = 'empty';
            } else {
                self.state = 'complete';
            }
        },
        start() {
            if (self.isComplete || self.isReloading) {
                self.state = 'reloading';
            } else {
                self.state = 'loading';
            }
        },
        reset() {
            self.state = 'waiting';
        }
    }));
export default LoadingState;
export type LoadingStateType = typeof LoadingState.Type;