import { ContextStateType } from "./types";

type ActionMap<M> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    }
};

export enum DispatchTypes {
    SET_STATE = 'SET_STATE',
}

type Payload = {
    [DispatchTypes.SET_STATE]: Partial<ContextStateType>
}

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

export const stateReducer = (state: ContextStateType, action: Action) => {

    switch (action.type) {
        case DispatchTypes.SET_STATE:

            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}
