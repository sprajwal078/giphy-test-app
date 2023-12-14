import { IGifObject } from "./gifObject";

export interface IGiphyResponse {
  data: IGifObject[];
  pagination: {
    count: number;
    offset: number;
    total_count: number;
  };
  meta: {
    status: number;
    msg: string;
  };
}
