import { useCallback, useEffect, useReducer } from "react";
import { getGifsBasedOnSearchTerm, getTrendingGifs } from "services/giphy";
import { IGifObject } from "types/gifObject";
import { IGiphyResponse } from "types/gifphyResponse";
import { IReducerAction } from "types/reducerAction";

interface IUseGifsDataState {
  gifs: IGifObject[];
  loading: boolean;
  error: string;
  count: number;
  limit: number;
  offset: number;
  totalCount: number;
  searchTerm: string;
  mode: "trending" | "search";
}

interface IGifsAction {
  count: number;
  limit: number;
  offset: number;
  totalCount: number;
  data: IGifObject[];
}

function reducer(
  state: IUseGifsDataState,
  action: IReducerAction<string | boolean | IGifsAction | number>
) {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_FINISH":
      return {
        ...state,
        loading: false,
        gifs: [...state.gifs, ...(payload as IGifsAction).data],
        count: (payload as IGifsAction).count,
        limit: (payload as IGifsAction).limit,
        offset: (payload as IGifsAction).offset,
        totalCount: (payload as IGifsAction).totalCount,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: payload as string,
      };
    case "SET_OFFSET":
      return {
        ...state,
        offset: payload as number,
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: payload as string,
      };
    case "SET_SEARCH_MODE":
      return {
        ...state,
        offset: 0,
        count: 0,
        mode: "search" as "search",
        gifs: [],
      };
    case "RESET_STATE":
      return {
        ...state,
        gifs: [],
        limit: 15,
        offset: 0,
        totalCount: 0,
        count: 0,
        loading: false,
        error: "",
        searchTerm: "",
        mode: "trending" as "trending",
      };
    default:
      return state;
  }
}

export default function useGifsData() {
  const [{ error, gifs, limit, offset, loading, mode, searchTerm }, dispatch] =
    useReducer(reducer, {
      gifs: [],
      limit: 15,
      offset: 0,
      totalCount: 0,
      count: 0,
      loading: false,
      error: "",
      searchTerm: "",
      mode: "trending",
    });

  const fetchNewGifs = useCallback(
    async (offset: number) => {
      dispatch({ type: "FETCH_INIT" });
      try {
        let response: IGiphyResponse;
        if (mode === "trending") {
          const res = await getTrendingGifs<IGiphyResponse>({ limit, offset });
          response = res.data;
        }
        if (mode === "search") {
          const res = await getGifsBasedOnSearchTerm<IGiphyResponse>({
            limit,
            offset,
            searchTerm,
          });
          response = res.data;
        }
        const { data, pagination: responsePagination } = response!;
        const payload: IGifsAction = {
          data,
          count: responsePagination.count,
          offset: offset,
          totalCount: responsePagination.total_count,
          limit: 15,
        };
        dispatch({
          type: "FETCH_FINISH",
          payload,
        });
      } catch (error: any) {
        console.error(error);
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    },
    [limit, mode, searchTerm]
  );

  const fetchNextSetOfGifs = useCallback(() => {
    const payload = offset + limit;
    dispatch({
      type: "SET_OFFSET",
      payload,
    });
    fetchNewGifs(payload);
  }, [offset, limit, fetchNewGifs]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "SET_SEARCH_TERM",
      payload: e.target.value,
    });
  }

  async function handleSubmitSearchTerm() {
    dispatch({
      type: "SET_SEARCH_MODE",
    });
    dispatch({ type: "FETCH_INIT" });
    try {
      const res = await getGifsBasedOnSearchTerm<IGiphyResponse>({
        limit: 15,
        offset: 0,
        searchTerm,
      });
      const { data, pagination: responsePagination } = res.data;
      const payload: IGifsAction = {
        data,
        count: responsePagination.count,
        offset: 0,
        totalCount: responsePagination.total_count,
        limit: 15,
      };
      dispatch({
        type: "FETCH_FINISH",
        payload,
      });
    } catch (error: any) {
      console.error(error);
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }

  useEffect(() => {
    // when there's no search term, we should reset the state to the trending gifs
    if (mode === "search" && !searchTerm) {
      dispatch({ type: "RESET_STATE" });
    }
  }, [searchTerm, mode, fetchNewGifs]);

  useEffect(() => {
    // this fetches new gifs the first time as well as when the mode changes from search to trending
    if (mode === "trending" && !gifs.length) {
      fetchNewGifs(0);
    }
  }, [gifs.length, mode, fetchNextSetOfGifs, fetchNewGifs]);

  return {
    gifs,
    mode,
    error,
    loading,
    fetchNextSetOfGifs,
    searchTerm,
    handleSearchChange,
    handleSubmitSearchTerm,
  };
}
