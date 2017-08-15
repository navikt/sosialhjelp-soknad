export interface Action<T> {
	type: string;
	payload: T;
	meta?: any;
}

export type Dispatch = (action: Action<any>) => void;

export type Reducer<S> = (state: S, action: Action<any>) => S;

export interface DispatchProps {
	dispatch: Dispatch;
}
