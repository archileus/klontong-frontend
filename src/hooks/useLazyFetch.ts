import { useEffect, useReducer, useRef } from 'react';


interface State<T> {
    loading: boolean,
    data?: T
    error?: Error
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
    | { type: 'loading' }
    | { type: 'fetched'; payload: T }
    | { type: 'error'; payload: Error }


export function useLazyFetch<T = unknown>(
    url?: string,
    options?: RequestInit,

): [
        runFetch: (addOnOptions?: RequestInit, urlLazy?: string) => Promise<State<T>>,
        State<T>
    ] {
    const cache = useRef<Cache<T>>({})

    // Used to prevent state update if the component is unmounted
    const cancelRequest = useRef<boolean>(false)

    const initialState: State<T> = {
        loading: false,
        error: undefined,
        data: undefined,
    }

    // Keep state logic separated
    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case 'loading':
                return { ...initialState, loading: true }
            case 'fetched':
                return { ...initialState, data: action.payload, }
            case 'error':
                return { ...initialState, error: action.payload }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState)

    useEffect(() => {
        // Use the cleanup function for avoiding a possibly...
        // ...state update after the component was unmounted
        return () => {
            cancelRequest.current = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const fetchData = async (addOnOptions?: RequestInit, urlLazy?: string) => {
        // Do nothing if the url is not given
        if (!url && !urlLazy) return { ...initialState }

        const fetchUrl = url || urlLazy || '';
        cancelRequest.current = false
        dispatch({ type: 'loading' })

        // If a cache exists for this url, return it
        if (cache.current[fetchUrl]) {
            dispatch({ type: 'fetched', payload: cache.current[fetchUrl] })
            return { ...initialState, data: cache.current[fetchUrl] }

        }

        try {
            const response = await fetch(fetchUrl,
                {
                    credentials: 'include',
                    ...options,
                    ...addOnOptions,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        ...options?.headers,
                        ...addOnOptions?.headers
                    },

                });
            if (!response.ok) {
                if (response.status >= 400 && response.status < 500) {
                    const dataJson = (await response.json()) as T
                    dispatch({ type: 'fetched', payload: dataJson })
                    return { ...initialState, data: dataJson }
                } else {
                    throw new Error(response.statusText)
                }

            }

            const data = (await response.json()) as T
            cache.current[fetchUrl] = data
            if (cancelRequest.current) return { ...initialState, data: data }

            dispatch({ type: 'fetched', payload: data })
            return { ...initialState, data: data }
        } catch (error) {
            console.error(error);
            if (cancelRequest.current) return { ...initialState, error: error as Error }

            dispatch({ type: 'error', payload: error as Error })
            return { ...initialState, error: error as Error }
        }
    }

    return [fetchData, state];
}