import { TypedUseSelectorHook, useSelector } from "react-redux";
import store from "./store";


const UseAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = 
useSelector;

export { UseAppSelector };