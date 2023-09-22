import Moment from "moment";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import {create} from 'zustand';
import { getToken } from "./session";
import { sys_labels } from "./constants";
export const global_base_state = props => {
  return {
    is_loading: props?.is_loading ?? false
  };
};

export const globalStore = create(set => global_base_state());
export const setter_global_state = {
  is_loading: (value = false) => globalStore.setState({is_loading: value}),
};
export function SysShowLoading(){
  setter_global_state.is_loading(true);
}

export function SysHideLoading(){
  setter_global_state.is_loading(false);
}
export function SysCurrencyTransform({ num = 0, currency = "IDR" }) {
  num = parseInt(num ?? 0);
  if (isNaN(num)) {
    num = 0;
  }
  return (
    currency + " " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}
export function SysGetCurrentTime({ lang = "en", type = "long" }) {
  const date = new Date();
  return {
    time: `${addZero({ num: date.getHours() })}:${addZero({
      num: date.getMinutes(),
    })}:${addZero({ num: date.getSeconds() })}`,
    day: SysDay({ date: date, lang: lang }),
    date: SysDateTransform({ date: date, type: type, lang: lang }),
  };
}
export function addZero({ num = 0 }) {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
}
export function SysDay({ date = "", lang = "en" }) {
  var days = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateFormat = new Date(date);
  if (lang != "en") {
    days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  }
  return days[dateFormat.getDay()];
}
export function SysDateTransform({
  date = "",
  type = "long",
  checkIsToDay = false,
  lang = "en",
  withTime = false,
  forSql = false,
}) {
  if (date == "") {
    return "";
  }
  const current = new Date();
  const dateFormat = new Date(date);
  const month = dateFormat.getMonth();
  const year = dateFormat.getFullYear();
  const day = dateFormat.getDate();
  const hour = dateFormat.getHours();
  const minutes = dateFormat.getMinutes();
  const seconds = dateFormat.getSeconds();
  const mili = dateFormat.getMilliseconds();
  let fullOfdate = "";
  if (checkIsToDay) {
    if (
      Moment(current).format("yyyy-MM-DD") ==
      Moment(dateFormat).format("yyyy-MM-DD")
    ) {
      fullOfdate = "Today ";
    } else {
      fullOfdate =
        addZero({ num: day }) +
        " " +
        SysMonthTransform(month, type, lang) +
        " " +
        year;
    }
  } else {
    fullOfdate =
      addZero({ num: day }) +
      " " +
      SysMonthTransform(month, type, lang) +
      " " +
      year;
  }
  if (withTime) {
    fullOfdate +=
      " (" +
      addZero({ num: hour }) +
      ":" +
      addZero({ num: minutes }) +
      ":" +
      addZero({ num: seconds }) +
      ")";
  }
  if (forSql) {
    fullOfdate = `${addZero({ num: year })}-${addZero({
      num: month + 1,
    })}-${addZero({
      num: day,
    })}`;
    if (withTime) {
      fullOfdate += ` ${addZero({ num: hour })}:${addZero({
        num: minutes,
      })}:${addZero({ num: seconds })}.${addZero({ num: mili })}`;
    }
  }
  return fullOfdate;
}
export function SysMonthTransform(val, type = "long", lang = "en") {
  var longMonth = [
    "January",
    "February",
    "March",
    "April",
    "Mei",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var shortMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (lang == "in") {
    longMonth = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    shortMonth = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
  }
  if (type == "long") {
    return longMonth[val];
  } else {
    return shortMonth[val];
  }
}
export const TOAST_TYPE={
  SUCCESS:"success",
  ERROR:"error",
  WARNING:"warning"

}
export function SysShowToast({
  message = "",
  type = "success",
  autoClose = 2000,
}) {
  switch (type) {
    case "error":
      toast.error(message, {
        position: "top-center",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type:"error"
      });
      break;
    case "warning":
      toast.info(message, {
        position: "top-center",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type:"warning"
      });
      break;
    default:
      toast(message, {
        position: "top-center",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type:"success"
      });
      break;
  }
}
export function SysReadData(file) {
  try {
    let rawData = [{ value: "", name: "" }];
    rawData = [];
    rawData = file;
    return rawData;
  } catch (err) {
    console.error("Error reading data:", err);
    return [];
  }
}

export function SysJWTDecoder(token = null) {
  let my_jwt = {
    id: "",
    email: "",
    username: "",
    role: "",
    iat: "",
    exp: "",
  };
  if (token) {
    my_jwt = jwt_decode(token);
  } else {
    my_jwt = jwt_decode(getToken());
  }
  return {
    id: my_jwt?.id ?? "",
    email: my_jwt?.email ?? "",
    username: my_jwt?.username ?? "",
    role: my_jwt?.role ?? "",
    iat: my_jwt?.iat ?? "",
    exp: my_jwt?.exp ?? "",
  };
}

export function SystoCamelCase(text = "") {
  let str = text.replace("id_", "");
  str = str.replace("_id", "");
  return str.replace(/_([a-z])/g, (match, char) => " " + char);
}
export function SysValidateForm(required_field = [], data = []) {
  let message = "field ";
  let is_valid = true;
  let msg_error = [];
  required_field.map((val, index) => {
    const alises = val.split(" as ");
    const named = alises.length > 1 ? alises[1] : alises[0];
    if (
      data[alises[0]] == null ||
      data[alises[0]] == "" ||
      data[alises[0]] == undefined
    ) {
      msg_error.push(SystoCamelCase(named));
      document.getElementsByName(alises[0]).forEach((val) => {
        val.classList.add("validate-error");
      });
      is_valid = false;
    } else {
      document.getElementsByName(alises[0]).forEach((val) => {
        val.classList.remove("validate-error");
      });
    }
  });
  message += msg_error.join(",");
  message += " is required!";
  if (!is_valid) throw { is_valid, message };
  return {
    is_valid,
    message,
  };
}

export function SysGenValueOption(
  data = [],
  value = null,
  id_index = "value",
  index = "name"
) {
  var obj = data.find((val) => val[id_index] === value);
  if (!obj) return null;
  return {
    value,
    label: obj[index],
    ...obj,
  };
}
