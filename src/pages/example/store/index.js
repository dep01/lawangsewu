import {
  SysHideLoading,
  SysShowLoading,
  SysShowToast,
  TOAST_TYPE,
} from "lawangsewu-utils/global_store";
import { create } from "zustand";
import * as provider from "lawangsewu-providers/example";
import convert from "lawangsewu-model/exampleModel";
import { FORM_SCHEMA } from "./schema_form";

export const base_state = (props) => {
  return {
    data: convert.objectOfexampleModel(props?.data ?? null),
  };
};
export const useStore = create((set) => base_state());
export const setter = {
  data: (value = null) => useStore.setState({ data: value }),
};
export const action = {
  initialized: (id, setValue) => {
    if (id) getDetail(id, setValue);
  },
  cleanUp: () => useStore.setState(base_state()),
  handleSubmit,
  deleteData
};

async function getDetail(id, setValue) {
  SysShowLoading();
  try {
    const resp = await provider.getById(id);
    setter.data(resp.data);
    Object.keys(resp.data).map((key) => {
      setValue(key, resp.data[key]);
    });
  } catch (error) {
    SysShowToast({ message: error.message, type: TOAST_TYPE.ERROR });
  }
  SysHideLoading();
}
async function insertData(data = FORM_SCHEMA) {
  SysShowLoading();
  try {
    console.log(data);
  } catch (error) {
    throw error;
  }
  SysHideLoading();
}

async function updateData(data = FORM_SCHEMA, id) {
  SysShowLoading();
  try {
    console.log(data, id);
  } catch (error) {
    throw error;
  }
  SysHideLoading();
}
async function handleSubmit(data) {
  const state = base_state(useStore.getState());
  try {
    if (state.data?.id) {
      await updateData(data, state.data.id);
    } else {
      await insertData(data);
    }
  } catch (error) {
    SysShowToast({ message: error.message, type: TOAST_TYPE.ERROR });
  }
}

async function deleteData( id) {
  SysShowLoading();
  try {
    console.log( id);
  } catch (error) {
    throw error;
  }
  SysHideLoading();
}