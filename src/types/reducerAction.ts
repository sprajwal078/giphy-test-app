export interface IReducerAction<T = any> {
  type: string;
  payload?: T;
}
