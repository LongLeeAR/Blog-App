import { useDispatch } from "react-redux";

export const useActions = (actions) => {
  const dispatch = useDispatch();

  return Object.keys(actions).reduce((acc, key) => {
    return {
      ...acc,
      [key]: (...args) => dispatch(actions[key](...args))
    }
  }, {})
}