import React, { useState, useEffect } from "react";
import { Table, Pagination, Input, Button, Popconfirm } from "antd";
import {
  SysDateTransform,
  SysGenValueOption,
  SysJWTDecoder,
  SysHideLoading,
  SysShowLoading,
  SysShowToast,
} from "../../utils/global_store";
import {Link} from "react-router-dom"
import Select from "react-select";
import { sys_labels } from "../../utils/constants";
import * as XLSX from "xlsx-js-style";
import { LoadingComponent } from "../atoms";
import { create } from "zustand";

const { Search } = Input;
const base_state = (props) => {
  return {
    tableData: props?.tableData ?? [],
    pageSize: props?.pageSize ?? 20,
    currentPage: props?.currentPage ?? 1,
    totalItems: props?.totalItems ?? 0,
    searchQuery: props?.searchQuery ?? "",
    sortField: props?.sortField ?? "",
    sortOrder: props?.sortOrder ?? "",
    filter: props?.filter ?? "",
    loading: props?.loading ?? false,
    selectedFilters: props?.selectedFilters ?? {},
  };
};
const setter = {
  tableData: (val = []) => useStore.setState({ tableData: val }),
  pageSize: (val = 20) => useStore.setState({ pageSize: val }),
  currentPage: (val = 1) => useStore.setState({ currentPage: val }),
  totalItems: (val) => useStore.setState({ totalItems: val }),
  searchQuery: (val) => useStore.setState({ searchQuery: val }),
  sortField: (val) => useStore.setState({ sortField: val }),
  sortOrder: (val) => useStore.setState({ sortOrder: val }),
  filter: (val) => useStore.setState({ filter: val }),
  loading: (val) => useStore.setState({ loading: val }),
  selectedFilters: (val) => useStore.setState({ selectedFilters: val }),
};
const useStore = create((set) => base_state());
const DataTable = ({
  fetchDataFunc,
  columns,
  pageSizeOptions = ["10", "20", "30", "50", "100"],
  defaultPageSize = 20,
  title = "",
  filters = [],
  action = [],
  withExport = true,
}) => {
  const state = {
    ...useStore((state) => base_state(state)),
  };
  const date = new Date();

  useEffect(() => {
    fetchData();
  }, [state.currentPage, state.pageSize, state.filter]);

  const fetchData = (is_clear = false) => {
    setter.loading(true);
    let sort = `${state.sortField}:${
      state.sortOrder == "ascend" ? "asc" : "desc"
    }`;
    if (
      state.sortField == "" ||
      state.sortField == null ||
      state.sortField == undefined
    ) {
      sort = "";
    }
    const my_filter = genFilter();
    fetchDataFunc(
      state.currentPage,
      state.pageSize,
      is_clear ? "" : state.searchQuery,
      sort,
      my_filter
    )
      .then((data) => {
        setter.tableData(data.data.data);
        setter.totalItems(data.data.totalPages * state.pageSize);
        setter.loading(false);
      })
      .catch((error) => {
        setter.loading(false);
        SysShowToast({ message: error.message, type: "error" });
      });
  };

  const handlePageChange = (page) => {
    setter.currentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setter.currentPage(1);
    setter.pageSize(size);
  };

  const handleSearch = (value) => {
    setter.currentPage(1);
    setter.searchQuery(value.target.value);
    if (value.target.value == "" || value.target.value == null) {
      fetchData(true);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const { field, order } = sorter;
    setter.sortField(field);
    setter.sortOrder(order);
  };

  const handleChange = (value, index) => {
    let my_filter = state.selectedFilters;
    let my_filter_str = "";
    my_filter[index] = value.value;
    Object.keys(my_filter).map((val) => {
      if (my_filter[val] != "all") {
        my_filter_str += `&${val}=${my_filter[val]}`;
      }
    });

    if (value.value == "all") {
      delete my_filter[index];
    }
    setter.selectedFilters(my_filter);
    setter.filter(my_filter_str);
  };

  const genFilter = () => {
    let my_filter = state.selectedFilters;
    let my_filter_str = "";
    Object.keys(my_filter).map((val) => {
      if (my_filter[val] != "all") {
        my_filter_str += `&${val}=${my_filter[val]}`;
      }
    });
    setter.filter(my_filter_str);
    return my_filter_str;
  };
  const FilterComponent = () => {
    return (
      <div className="d-flex flex-row" style={{ alignItems: "center" }}>
        {filters.map((val) => {
          let data = [
            {
              value: "all",
              label: `Semua ${val?.title ?? ""}`,
            },
          ];
          if (val.data && val.data.length > 0) {
            val.data.map((value) => {
              data.push({
                value: value[val.data_id],
                label: value[val.label],
              });
            });
          }
          return (
            <div className="form-group" style={{ marginRight: 10 }}>
              <label>{val?.title ?? ""}</label>
              <Select
                styles={{
                  menu: (provide, state) => ({
                    ...provide,
                    zIndex: 3,
                  }),
                }}
                onChange={(value) => handleChange(value, val.index)}
                value={SysGenValueOption(
                  val.data,
                  state.selectedFilters[val.index],
                  val.data_id,
                  val.label
                )}
                options={data}
                formatOptionLabel={(val) => `${val.label}`}
                placeholder={`Select ${val?.title ?? ""}`}
                aria-label="Nama"
                isSearchable
              />
            </div>
          );
        })}
      </div>
    );
  };
  const handleExport = async (all_data = false) => {
    SysShowLoading();
    try {
      let sort = `${state.sortField}:${
        state.sortOrder == "ascend" ? "asc" : "desc"
      }`;
      if (
        state.sortField == "" ||
        state.sortField == null ||
        state.sortField == undefined
      ) {
        sort = "";
      }
      const pages = all_data ? 1 : state.currentPage;
      const limit = all_data ? state.totalItems : state.pageSize;
      const resp = await fetchDataFunc(
        pages,
        limit,
        state.searchQuery,
        sort,
        state.filter
      );
      let str_filter = `search:${state.searchQuery}, `;

      Object.keys(state.selectedFilters).map((value) => {
        const obj = filters.find((val) => val.index == value);
        const data_selected = obj.data.find(
          (val) => val[obj.data_id] == state.selectedFilters[value]
        );
        str_filter += `${obj.title}: ${data_selected[obj.label]}, `;
      });
      let my_data = resp.data.data;
      let the_datas = [];
      for (let index = 0; index < my_data.length; index++) {
        let clean_data_structure = {};
        Object.keys(my_data[index]).map((key) => {
          if (
            typeof my_data[index][key] === "object" &&
            my_data[index][key] != null
          ) {
            Object.keys(my_data[index][key]).map((key_child) => {
              clean_data_structure[`${key}_${key_child}`] =
                my_data[index][key][key_child];
            });
          } else {
            clean_data_structure[key] = my_data[index][key];
          }
        });
        the_datas.push(clean_data_structure);
      }
      let clean_data = [];
      the_datas.map((val) => {
        let obj_data = {};
        columns.map((col_value) => {
          if (col_value.key != "action") {
            obj_data[col_value.title] = val[col_value.key] ?? "";
            if (col_value.val_props) {
              obj_data[col_value.title] =
                col_value.val_props[val[col_value.key]];
            }
          }
        });
        clean_data.push(obj_data);
      });
      const ws = XLSX.utils.json_to_sheet(clean_data, { origin: "A5" });
      const wb = XLSX.utils.book_new();
      const headerStyle = {
        alignment: { horizontal: "center", vertical: "center" },
        font: { sz: 12, bold: true },
      };
      for (
        let colIndex = 0;
        colIndex < columns.filter((val) => val.key != "action").length;
        colIndex++
      ) {
        const cellRef = XLSX.utils.encode_cell({ r: 4, c: colIndex });
        ws[cellRef].s = headerStyle;
      }
      ws["!merges"] = [
        {
          s: { r: 0, c: 0 },
          e: {
            r: 0,
            c: columns.filter((val) => val.key != "action").length - 1,
          },
        },
      ];
      ws["A1"] = {
        t: "s",
        v: `Laporan ${title}`,
      };
      ws["A1"].s = {
        alignment: { horizontal: "center", vertical: "center" },
        font: { sz: 20, bold: true },
      };
      const token = { username: "tester" };
      ws["A2"] = { t: "s", v: "Exported Date: " };
      ws["A3"] = { t: "s", v: "Exported By: " };
      ws["B3"] = { t: "s", v: token?.username ?? "" };
      ws["A4"] = { t: "s", v: "Filtered: " };
      ws["B4"] = { t: "s", v: str_filter };
      ws["B2"] = {
        t: "s",
        v: SysDateTransform({
          date: date,
          type: "long",
          lang: "in",
          withTime: true,
        }),
      };
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        sys_labels.menus.report + " " + title + ".xlsx"
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      SysShowToast({ message: error.message });
    }
    SysHideLoading();
  };
  const handleEnter = (event) => {
    if (event.key == "Enter" || event.key == "Tab") {
      fetchData();
    }
  };
  return (
    <section
      className="section"
      style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
    >
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          {action}
          <Input
              className="col-md-2"
              placeholder="Search..."
              allowClear
              onChange={handleSearch}
              onKeyDown={handleEnter}
            />
          {/* <div className="row mb-3">
            <div className="col-md-10">
              <FilterComponent />
            </div>
           
          </div> */}
        </div>
        <div className="card-body">
          {state.loading && <LoadingComponent />}
          <div
            style={{
              height: "70vh",
            }}
          >
            <Table
              dataSource={state.tableData}
              pagination={false}
              className="table-responsive"
              sticky={true}
              onChange={handleTableChange}
              size="small"
              columns={columns
                .filter((val) => val.type != "hidden")
                .map((col) => ({                  
                  sorter: col.sortable ?? false,
                  render:(val,record)=>col.route?<Link to={col.route+(record[col?.key_index??"id"])} >{val}</Link>:val,
                  ...col,

                }))}
              style={{ marginBottom: 30, height: "65vh" }}
            />

            <Pagination
              style={{ position: "absolute", bottom: 15, right: 15 }}
              current={state.currentPage}
              total={state.totalItems}
              pageSize={state.pageSize}
              onChange={handlePageChange}
              showSizeChanger
              onShowSizeChange={handlePageSizeChange}
              pageSizeOptions={pageSizeOptions}
            />
          </div>
          <div
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {withExport && (
              <Popconfirm
                cancelText="All Data"
                title="Select export option!"
                okText="Only this pages"
                onCancel={() => handleExport(true)}
                onConfirm={() => handleExport(false)}
              >
                <Button style={{ marginRight: 10 }}>
                  {sys_labels.action.export_excel}
                </Button>
              </Popconfirm>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataTable;
