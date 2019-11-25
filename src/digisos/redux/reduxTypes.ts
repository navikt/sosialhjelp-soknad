export * from "./validering/valideringActionTypes";

export type Dispatch = (action: any) => Promise<any>;
export type Reducer<S, AT> = (state: S, action: AT) => S;

export interface DispatchProps {
    dispatch: Dispatch;
}

export type DispatchAction = (action: any) => void;

