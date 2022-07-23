import { useReducer, useEffect } from 'react';

export interface FetchState {
  loading: boolean;
  data: null | string[];
  error: null | Error;
}

export interface FetchAction {
  type: string;
  data?: string[];
  error?: Error;
}

export type FetchDataInfo = FetchState | (() => Promise<any>);

function reducer(state: FetchState, action: FetchAction): FetchState {
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

function useAsync(callback: () => Promise<any>): FetchDataInfo[] {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

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

  return [state, fetchData];
}

export default useAsync;
