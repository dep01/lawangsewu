const fs = require("fs");

var childOne = "";
var childTwo = "";
var childThree = "";
var childFour = "";

const capitalized = (str) => {
  return str.replace(/^./, str[0].toUpperCase());
};
const camelcase = (text = "") => {
  let str = text.replace("id_", "");
  str = str.replace("_id", "");
  str = capitalized(str);
  return str.replace(/_([a-z])/g, (match, char) => " " + capitalized(char));
};
const checkavailtype = (col = "") => {
  const arr_col = col.split(":");
  let resp = {
    type: "text",
    data_type: "string",
    text:arr_col[0]
  };
  if (arr_col.length <= 1) {
    return resp;
  }
  switch (arr_col[1]) {
    case "string":
      return resp;
    case "number":
      return { type: "text", data_type: "number",text:arr_col[0] };
    case "int":
      return { type: "text", data_type: "number",text:arr_col[0] };
    case "password":
      return { type: "password", data_type: "string",text:arr_col[0] };
    case "email":
      return { type: "email", data_type: "string",text:arr_col[0] };
    default:
      return resp;
  }
};
async function writeFile(dir, name, strFile, message) {
  fs.access(dir, function (error) {
    if (error) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, "0744");
      }
      fs.access(`${dir}/${name}.js`, function (error) {
        if (error) {
          fs.writeFile(`${dir}/${name}.js`, strFile, function (error) {
            if (error) {
              console.log(error.message);
            } else {
              console.log(message);
            }
          });
        } else {
          console.log(
            "file name is exists, change the file name to another one"
          );
        }
      });
    } else {
      fs.access(`${dir}/${name}.js`, function (error) {
        if (error) {
          fs.writeFile(`${dir}/${name}.js`, strFile, function (error) {
            if (error) {
              console.log(error.message);
            } else {
              console.log(message);
            }
          });
        } else {
          console.log(
            "file name is exists, change the file name to another one"
          );
        }
      });
    }
  });
  return true;
}
async function model(fileJson, name, paths, withProvider) {
  const path = paths ?? "";
  var data = null;
  var named = name + "Model";
  try {
    data = require(`./src/data/${fileJson}`);
  } catch (error) {
    if (fileJson == "") {
      return false;
    } else {
      console.log(
        "error: please put your JSON on src/data or make sure your file is exists"
      );
    }
    return false;
  }
  console.log("generating model...");
  var object = {};
  var listKey = [];
  if (!Array.isArray(data)) {
    object = data;
  } else {
    object = data[0];
  }
  Object.keys(object).map((key, index) => {
    const x = {
      name: key,
      type: object[key] == null ? "null" : typeof object[key],
      data: object[key],
      is_single: false,
    };
    if (object[key] != null) {
      if (Array.isArray(object[key]) || typeof object[key] === "object") {
        if (Array.isArray(object[key])) {
          if (
            !Array.isArray(object[key][0]) &&
            typeof object[key][0] !== "object"
          ) {
            x.is_single = true;
          } else {
            genmodelChildOne(object[key], key);
          }
        } else {
          genmodelChildOne(object[key], key);
        }
      }
    }
    listKey.push(x);
  });
  var forObject = "";
  console.log("generating object data...");
  listKey.map((val) => {
    var str = "";
    if (val.data == null) {
      str = `\n\t\tobjectData.${val.name} = data.${val.name} ?? null;`;
    } else if (Array.isArray(val.data) && !val.is_single) {
      str = `\n\t\tobjectData.${val.name} = listOf${val.name}(data.${val.name} ?? []);`;
    } else if (Array.isArray(val.data) && val.is_single) {
      str = `\n\t\tobjectData.${val.name} = data.${val.name} ?? [];`;
    } else if (typeof val.data === "object") {
      str = `\n\t\tobjectData.${val.name} = objectOf${val.name}(data.${val.name} ?? null);`;
    } else {
      str = `\n\t\tobjectData.${val.name} = data.${val.name} ?? null;`;
    }
    forObject += str;
  });
  console.log("generating list data...");
  var strFile = `// HOW TO IMPORT ?
// const Convert = require('location/${named}.js'); 
// OR
// import Convert from 'location/${named}.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOf${named}(data)
// FOR ARRAY
// const data = Convert.listOf${named}(data)
const modelOfData${named} = {${listKey.map((val) => {
    const dataType =
      val.type == "string"
        ? "''"
        : val.type == "null"
        ? null
        : val.type == "boolean"
        ? false
        : val.type == "number"
        ? 0
        : Array.isArray(val.data) && !val.is_single
        ? `[modelOfData${val.name}]`
        : Array.isArray(val.data) && val.is_single
        ? "[]"
        : `modelOfData${val.name}`;
    return `\n\t${val.name}: ${dataType}`;
  })}
};
function listOf${named}(data = []) {
  var listData = [modelOfData${named}];
  listData = [];
  try {
    data.map((val) => {
      var object = {${listKey.map((val) => {
        var str = "";
        if (val.data == null) {
          str = `\n\t\t\t\t${val.name}: val.${val.name} ?? null`;
        } else if (Array.isArray(val.data) && !val.is_single) {
          str = `\n\t\t\t\t${val.name}: listOf${val.name}(val.${val.name} ?? [])`;
        } else if (Array.isArray(val.data) && val.is_single) {
          str = `\n\t\t\t\t${val.name}: val.${val.name} ?? []`;
        } else if (typeof val.data === "object") {
          str = `\n\t\t\t\t${val.name}: objectOf${val.name}(val.${val.name} ?? null)`;
        } else {
          str = `\n\t\t\t\t${val.name}: val.${val.name} ?? null`;
        }
        return str;
      })}
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOf${named}(data = null) {
  var objectData = modelOfData${named};
  if (data == null) {
    return null;
  }
  try {${forObject}
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOf${named}: listOf${named},
  objectOf${named}: objectOf${named},
};
${childOne}
${childTwo}
${childThree}
${childFour}
  `;
  console.log("generating file model...");
  await writeFile(
    "./src/model" + path,
    named,
    strFile,
    `file model saved to directory src/model${path}/${named}.js`
  );
  if (withProvider) {
    await providers(name);
  }
}

function genmodelChildOne(data, name) {
  var object = {};
  var listKey = [];
  if (!Array.isArray(data)) {
    object = data;
  } else {
    object = data[0];
  }
  Object.keys(object).map((key, index) => {
    const x = {
      name: key,
      type: object[key] == null ? "null" : typeof object[key],
      data: object[key],
      is_single: false,
    };
    if (object[key] != null) {
      if (Array.isArray(object[key]) || typeof object[key] === "object") {
        if (Array.isArray(object[key])) {
          if (
            !Array.isArray(object[key][0]) &&
            typeof object[key][0] !== "object"
          ) {
            x.is_single = true;
          } else {
            genmodelChildTwo(object[key], key);
          }
        } else {
          genmodelChildTwo(object[key], key);
        }
      }
    }
    listKey.push(x);
  });
  var forObject = "";
  console.log("generating child model...");
  listKey.map((val) => {
    var str = "";
    if (val.data == null) {
      str = `\n\t\tobjectData.${val.name} = data.${val.name} ?? null;`;
    } else if (Array.isArray(val.data) && !val.is_single) {
      str = `\n\t\tobjectData.${val.name} = listOf${val.name}(data.${val.name} ?? []);`;
    } else if (Array.isArray(val.data) && val.is_single) {
      str = `\n\t\tobjectData.${val.name} = data.${val.name} ?? [];`;
    } else if (typeof val.data === "object") {
      str = `\n\t\tobjectData.${val.name} = objectOf${val.name}(data.${val.name} ?? null);`;
    } else {
      str = `\n\t\tobjectData.${val.name} = data.${val.name} ?? null;`;
    }
    forObject += str;
  });

  childOne += `
const modelOfData${name} = {${listKey.map((val) => {
    const dataType =
      val.type == "string"
        ? "''"
        : val.type == "null"
        ? null
        : val.type == "boolean"
        ? false
        : val.type == "number"
        ? 0
        : Array.isArray(val.data) && !val.is_single
        ? `[modelOfData${val.name}]`
        : Array.isArray(val.data) && val.is_single
        ? "[]"
        : `modelOfData${val.name}`;
    return `\n\t${val.name}: ${dataType}`;
  })}
};`;

  if (Array.isArray(data)) {
    childOne += `
function listOf${name}(data = []) {
  var listData = [modelOfData${name}];
  listData = [];
  try {
    data.map((val) => {
      var object = {${listKey.map((val) => {
        var str = "";
        if (val.data == null) {
          str = `\n\t\t\t\t${val.name}: val.${val.name} ?? null`;
        } else if (Array.isArray(val.data) && !val.is_single) {
          str = `\n\t\t\t\t${val.name}: listOf${val.name}(val.${val.name} ?? [])`;
        } else if (Array.isArray(val.data) && val.is_single) {
          str = `\n\t\t\t\t${val.name}: val.${val.name} ?? []`;
        } else if (typeof val.data === "object") {
          str = `\n\t\t\t\t${val.name}: objectOf${val.name}(val.${val.name} ?? null)`;
        } else {
          str = `\n\t\t\t\t${val.name}: val.${val.name} ?? null`;
        }
        return str;
      })}
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}`;
  } else {
    childOne += `
function objectOf${name}(data = null) {
  var objectData = modelOfData${name};
  if (data == null) {
    return null;
  }
  try {${forObject}
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}`;
  }
}

function genmodelChildTwo(data, name) {
  var object = {};
  var listKey = [];
  if (!Array.isArray(data)) {
    object = data;
  } else {
    object = data[0];
  }
  Object.keys(object).map((key, index) => {
    const x = {
      name: key,
      type: object[key] == null ? "null" : typeof object[key],
      data: object[key],
      is_single: false,
    };
    if (object[key] != null) {
      if (Array.isArray(object[key]) || typeof object[key] === "object") {
        if (Array.isArray(object[key])) {
          if (
            !Array.isArray(object[key][0]) &&
            typeof object[key][0] !== "object"
          ) {
            x.is_single = true;
          } else {
            genmodelChildThree(object[key], key);
          }
        } else {
          genmodelChildThree(object[key], key);
        }
      }
    }
    listKey.push(x);
  });
  var forObject = "";
  console.log("generating child model...");
  listKey.map((val) => {
    var str = "";
    if (val.data == null) {
      str = `\n\t\tobjectData.${val.name} = data.${val.name} ?? null;`;
    } else if (Array.isArray(val.data) && !val.is_single) {
      str = `\n\t\tobjectData.${val.name} = listOf${val.name}(data.${val.name} ?? []);`;
    } else if (Array.isArray(val.data) && val.is_single) {
      str = `\n\t\tobjectData.${val.name} = data.${val.name} ?? [];`;
    } else if (typeof val.data === "object") {
      str = `\n\t\tobjectData.${val.name} = objectOf${val.name}(data.${val.name} ?? null);`;
    } else {
      str = `\n\t\tobjectData.${val.name} = data.${val.name} ?? null;`;
    }
    forObject += str;
  });

  childTwo += `
const modelOfData${name} = {${listKey.map((val) => {
    const dataType =
      val.type == "string"
        ? "''"
        : val.type == "null"
        ? null
        : val.type == "boolean"
        ? false
        : val.type == "number"
        ? 0
        : Array.isArray(val.data) && !val.is_single
        ? `[modelOfData${val.name}]`
        : Array.isArray(val.data) && val.is_single
        ? "[]"
        : `modelOfData${val.name}`;
    return `\n\t${val.name}: ${dataType}`;
  })}
}`;

  if (Array.isArray(data)) {
    childTwo += `
function listOf${name}(data = []) {
  var listData = [modelOfData${name}];
  listData = [];
  try {
    data.map((val) => {
      var object = {${listKey.map((val) => {
        var str = "";
        if (val.data == null) {
          str = `\n\t\t\t\t${val.name}: val.${val.name} ?? null`;
        } else if (Array.isArray(val.data) && !val.is_single) {
          str = `\n\t\t\t\t${val.name}: listOf${val.name}(val.${val.name} ?? [])`;
        } else if (Array.isArray(val.data) && val.is_single) {
          str = `\n\t\t\t\t${val.name}: val.${val.name} ?? []`;
        } else if (typeof val.data === "object") {
          str = `\n\t\t\t\t${val.name}: objectOf${val.name}(val.${val.name} ?? null)`;
        } else {
          str = `\n\t\t\t\t${val.name}: val.${val.name} ?? null`;
        }
        return str;
      })}
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
};`;
  } else {
    childTwo += `
function objectOf${name}(data = null) {
  var objectData = modelOfData${name};
  if (data == null) {
    return null;
  };
  try {${forObject}
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}`;
  }
}
function genmodelChildThree(data, name) {
  var object = {};
  var listKey = [];
  if (!Array.isArray(data)) {
    object = data;
  } else {
    object = data[0];
  }
  Object.keys(object).map((key, index) => {
    const x = {
      name: key,
      type: object[key] == null ? "null" : typeof object[key],
      data: object[key],
      is_single: false,
    };
    if (object[key] != null) {
      if (Array.isArray(object[key]) || typeof object[key] === "object") {
        if (Array.isArray(object[key])) {
          if (
            !Array.isArray(object[key][0]) &&
            typeof object[key][0] !== "object"
          ) {
            x.is_single = true;
          } else {
            genmodelChildFour(object[key], key);
          }
        } else {
          genmodelChildFour(object[key], key);
        }
      }
    }
    listKey.push(x);
  });
  var forObject = "";
  console.log("generating child model...");
  listKey.map((val) => {
    var str = "";
    if (val.data == null) {
      str = `\n\t\tobjectData.${val.name} = data.${val.name} ?? null;`;
    } else if (Array.isArray(val.data) && !val.is_single) {
      str = `\n\t\tobjectData.${val.name} = listOf${val.name}(data.${val.name} ?? []);`;
    } else if (Array.isArray(val.data) && val.is_single) {
      str = `\n\t\tobjectData.${val.name} = data.${val.name} ?? [];`;
    } else if (typeof val.data === "object") {
      str = `\n\t\tobjectData.${val.name} = objectOf${val.name}(data.${val.name} ?? null);`;
    } else {
      str = `\n\t\tobjectData.${val.name} = data.${val.name} ?? null;`;
    }
    forObject += str;
  });

  childThree += `
const modelOfData${name} = {${listKey.map((val) => {
    const dataType =
      val.type == "string"
        ? "''"
        : val.type == "null"
        ? null
        : val.type == "boolean"
        ? false
        : val.type == "number"
        ? 0
        : Array.isArray(val.data) && !val.is_single
        ? `[modelOfData${val.name}]`
        : Array.isArray(val.data) && val.is_single
        ? "[]"
        : `modelOfData${val.name}`;
    return `\n\t${val.name}: ${dataType}`;
  })}
};`;

  if (Array.isArray(data)) {
    childThree += `
function listOf${name}(data = []) {
  var listData = [modelOfData${name}];
  listData = [];
  try {
    data.map((val) => {
      var object = {${listKey.map((val) => {
        var str = "";
        if (val.data == null) {
          str = `\n\t\t\t\t${val.name}: val.${val.name} ?? null`;
        } else if (Array.isArray(val.data) && !val.is_single) {
          str = `\n\t\t\t\t${val.name}: listOf${val.name}(val.${val.name} ?? [])`;
        } else if (Array.isArray(val.data) && val.is_single) {
          str = `\n\t\t\t\t${val.name}: val.${val.name} ?? []`;
        } else if (typeof val.data === "object") {
          str = `\n\t\t\t\t${val.name}: objectOf${val.name}(val.${val.name} ?? null)`;
        } else {
          str = `\n\t\t\t\t${val.name}: val.${val.name} ?? null`;
        }
        return str;
      })}
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}`;
  } else {
    childThree += `
function objectOf${name}(data = null) {
  var objectData = modelOfData${name};
  if (data == null) {
    return null;
  };
  try {${forObject}
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}`;
  }
}
function genmodelChildFour(data, name) {
  var object = {};
  var listKey = [];
  if (!Array.isArray(data)) {
    object = data;
  } else {
    object = data[0];
  }
  Object.keys(object).map((key, index) => {
    const x = {
      name: key,
      type: object[key] == null ? "null" : typeof object[key],
      data: object[key],
    };
    listKey.push(x);
  });
  var forObject = "";
  console.log("generating child model...");
  listKey.map((val) => {
    const str = `\n\t\tobjectData.${val.name} = data.${val.name} ?? null;`;

    forObject += str;
  });

  childFour += `
const modelOfData${name} = {${listKey.map((val) => {
    const dataType =
      val.type == "string"
        ? "''"
        : val.type == "null"
        ? null
        : val.type == "boolean"
        ? false
        : val.type == "number"
        ? 0
        : Array.isArray(val.data)
        ? "[]"
        : "{}";
    return `\n\t${val.name}: ${dataType}`;
  })}
};`;

  if (Array.isArray(data)) {
    childFour += `
function listOf${name}(data = []) {
  var listData = [modelOfData${name}];
  listData = [];
  try {
    data.map((val) => {
      var object = {${listKey.map((val) => {
        const str = `\n\t\t\t\t${val.name}: val.${val.name} ?? null`;

        return str;
      })}
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}`;
  } else {
    childFour += `
function objectOf${name}(data = null) {
  var objectData = modelOfData${name};
  if (data == null) {
    return null;
  };
  try {${forObject}
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}`;
  }
}
async function view(name, col = "", paths) {
  const columns = col.split(",");
  const path = paths ?? "";
  const dir = `./src/pages${path}/${name}`;
  console.log("generating listing view...");
  const strList = `import React from "react";
  import AdminDashboard from "lawangsewu-layouts";
  import { Link, useNavigate } from "react-router-dom";
  import { STATIC_ROUTES } from "lawangsewu-routes";
  import { sys_labels } from "lawangsewu-utils/constants";
  import DataTable from "lawangsewu-components/moleculs/DataTable";
  import { Button, Popconfirm } from "antd";
  import { action } from "./store";
  const ${capitalized(name)}List = () => {
    const navigate = useNavigate();
    const columns = [
      ${columns.map((val) => {
        const type = checkavailtype(val);
        return `
          {
            title:"${camelcase(type.text)}",
            dataIndex:"${type.text}",
            key:"${type.text}",
          }
          `;
      })}
      ,{
        title: "Aksi",
        dataIndex: "id",
        key: "action",
        render: (val, record) => (
          <div className="btn-group" role="group">
            <Button
              onClick={() =>
                navigate('')
              }
              className="btn btn-primary btn-mr"
            >
              <i className="ri-file-list-line"></i>
            </Button>
            <Button
              onClick={() =>
                navigate('')
              }
              className="btn btn-info btn-mr"
            >
              <i className="ri-pencil-line"></i>
            </Button>
  
            <Popconfirm
              title={'Confirmation delete'}
              onConfirm={() => action.deleteData(val)}
            >
              <Button className="btn btn-danger btn-mr">
                <i className="ri-delete-bin-line"></i>
              </Button>
            </Popconfirm>
          </div>
        ),
      }
    ];
    const form_action = [
      <Button>
        <Link
          to={''}
          className="icon icon-left"
        >
          <i className="ri-add-line" />
          {sys_labels.action.add}
        </Link>
      </Button>,
    ];
    return (
      <AdminDashboard label={''}>
        <DataTable
          fetchDataFunc={thisFuckingProvider}
          columns={columns}
          title={''}
          action={form_action}
        />
      </AdminDashboard>
    );
  };
  
  export default ${capitalized(name)}List;
  
  `;
  await writeFile(
    dir,
    "List",
    strList,
    "listing view successfully generated.."
  );

  console.log("generating form...");
  const strForm = `import {  useParams } from "react-router-dom";
  import React, { useEffect } from "react";
  import AdminDashboard from "lawangsewu-layouts";
  import { useNavigate } from "react-router-dom";
  import { sys_labels } from "lawangsewu-utils/constants";
  import { Button } from "antd";
  import { CustomInput } from "lawangsewu-components";
  import { Card} from "react-bootstrap";
  import { useForm } from "react-hook-form";
  import { FORM_SCHEMA } from "./store/schema_form";
  import { action, base_state, setter, useStore } from "./store";
  import useValidationSchema from "lawangsewu-utils/resolver";
  import { onlyNumber } from "lawangsewu-utils/validation";
  
  const ${capitalized(name)}Form = ({ readonly = false }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const label ="";
    const resolver = useValidationSchema(FORM_SCHEMA);
  
    const state = {
      ...useStore((state) => base_state(state)),
    };
    const {
      handleSubmit,
      control,
      setValue,
      formState: { errors },
    } = useForm({ resolver });
    useEffect(() => {
      action.initialized();
      return () => {
        action.cleanUp();
      };
    }, []);
    return (
      <AdminDashboard label={label}>
        <Card className={'card'}>
          <Card.Body>
            <div className="row">
            ${columns.map((val) => {
              const type = checkavailtype(val);
              return `
                <div className="col-6">
                  <CustomInput
                    type="${type.type}"
                    control={control}
                    placeholder="${camelcase(type.text)}"
                    classname="form-control"
                    ${type.data_type == 'number'? ('onKeyDown={onlyNumber}'):''}
                    name="${type.text}"
                    label="${camelcase(type.text)}"
                    errors={errors.${type.text}}
                    readonly={readonly}
                    id="${type.text}"
                  />
                </div>
                `;
            }).join().replace(/,/g,'')}
            </div>
          </Card.Body>
          {!readonly && (
            <Card.Footer>
              <Button onClick={handleSubmit(action.handleSubmit)}>
                {id ? sys_labels.action.edit : sys_labels.action.add}
              </Button>
            </Card.Footer>
          )}
        </Card>
      </AdminDashboard>
    );
  };
  
  export default ${capitalized(name)}Form;  
  `;
  await writeFile(dir, "Form", strForm, "form successfully generated..");

  console.log("creating index...");
  const strPageIndex = `import ${capitalized(name)}List from "./List";
  import ${capitalized(name)}Form from "./Form";
  export {${capitalized(name)}Form,${capitalized(name)}List}`;
  await writeFile(dir, "index", strPageIndex, "generate page completed.");

  console.log("generating store...");
  const strStore = `import {
    SysHideLoading,
    SysShowLoading,
    SysShowToast,
    TOAST_TYPE,
  } from "lawangsewu-utils/global_store";
  import { create } from "zustand";
  import { FORM_SCHEMA } from "./schema_form";
  
  export const base_state = (props) => {
    return {
      data: null,
    };
  };
  export const useStore = create((set) => base_state());
  export const setter = {
    data: (value = null) => useStore.setState({ data: value }),
  };
  export const action = {
    initialized: () => null,
    cleanUp: () => useStore.setState(base_state()),
    handleSubmit,
    deleteData
  };
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
  }`;
  await writeFile(
    dir + "/store",
    "index",
    strStore,
    "store successfully generated.."
  );

  console.log("generating schema...");
  const strSchema = `import * as yup from "yup";

  export const FORM_SCHEMA = {  
    ${columns.map((val) => {
      const type = checkavailtype(val)
      return `
        ${type.text}:yup.${type.data_type}().required("Required!")`;
    })}
  };`;
  await writeFile(
    dir + "/store",
    "schema_form",
    strSchema,
    "schema successfully generated.."
  );
  console.log("view succesfully");
}
async function providers(name) {
  console.log("generating provider...");
  const named = name + "Provider";
  const str = `import Convert from '@/model/${name}Model.js';
import {sys_get,sys_post,sys_put,sys_del} from '@/utils/api_client';

const uri = '${name}/'
export async function getAll(){
  try {
    const response = await sys_get({endpoint: uri});
    return Convert.listOf${name}Model(response.callback);
  } catch (error) {
    
  }
}
export async function getById(id){
  try {
    const response = await sys_get({endpoint: uri+id});
    return Convert.objectOf${name}Model(response.callback);
  } catch (error) {
    
  }
}
export async function addData(data){
  try {
    const response = await sys_post({endpoint: uri,body:data});
    return response.callback;
  } catch (error) {
    
  }
}
export async function updateData(data){
  try {
    const response = await sys_put({endpoint: uri,body:data});
    return response.callback;
  } catch (error) {
    
  }
}
export async function deleteData(id){
  try {
    const response = await sys_del({endpoint: uri+id});
    return response.callback;
  } catch (error) {
    
  }
}

  `;
  await writeFile(
    "./src/providers",
    named,
    str,
    `file provider saved to directory src/providers/${named}.js`
  );
}
module.exports = { model, view };
