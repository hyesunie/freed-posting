import { useReducer, useEffect } from 'react';

export interface FetchState<T> {
  loading: boolean;
  data: null | T;
  error: null | Error;
}

export interface FetchAction<T> {
  type: string;
  data?: T;
  error?: Error;
}

function reducer<T>(
  state: FetchState<T>,
  action: FetchAction<T>
): FetchState<T> {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS': {
      const data = action.data ?? null;
      return {
        loading: false,
        data,
        error: null,
      };
    }
    case 'ERROR': {
      const error = action.error ?? null;
      return {
        loading: false,
        data: null,
        error,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAsync<T>(callback: () => Promise<any>): FetchState<T> {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const state2 = state as FetchState<T>;

  const fetchData = async (): Promise<any> => {
    dispatch({ type: 'LOADING' });

    try {
      const response = await callback();
      const data = await response.json();

      dispatch({ type: 'SUCCESS', data });
    } catch (e: any) {
      dispatch({ type: 'SUCCESS', error: e });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return state2;
}

export default useAsync;
