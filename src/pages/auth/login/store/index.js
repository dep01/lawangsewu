import { FORM_SCHEMA } from "./schema_form";
import {
  global_store
} from "lawangsewu-utils";
import { create } from "zustand";

export const base_state = (props) => {
  return {
    data: props?.data ?? [],
  };
};
export const useStore = create((set) => base_state());
export const action = {
  initialized: () => null,
  cleanUp: () => useStore.setState(base_state()),
  doLogin: (data) => doLogin(data),
};

const doLogin = async (form = FORM_SCHEMA) => {
  global_store.SysShowLoading();
  console.log(form);
  setTimeout(() => {
    global_store.SysHideLoading();
  }, 4000);
};
