import { LOGIN_FORM_SCHEMA } from "./schema_form";
import {
  SysHideLoading,
  SysShowLoading,
  SysShowToast,
} from "../../../../utils/global_store";
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

const doLogin = async (form = LOGIN_FORM_SCHEMA) => {
  SysShowLoading();
  console.log(form);
  setTimeout(() => {
    SysHideLoading();
  }, 4000);
};
