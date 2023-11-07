import React from "react";
import { Select } from "antd";
import { useController } from "react-hook-form";

const { Option } = Select;

const CustomSelect = ({
  control,
  name,
  id,
  placeholder = "",
  label = null,
  defaultvalue = null,
  errors = null,
  required = false,
  readonly = false,
  style = {},
  rules = {},
  classname = "",
  classContainer = "",
  onKeydown,
  onChange = () => null,
  valueIndex="id",
  defaultValue=null,
  labelIndex="",
  data = [],
}) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules,
    defaultvalue,
  });
  return (
    <div className={`col ${classContainer}`}>
      <div className="form-group">
        {label ? (
          <label>
            {label} {required ? "*" : ""}
          </label>
        ) : null}
        <Select
          id={id}
          style={style}
          name={name}
          ref={ref}
          onKeyDown={onKeydown}
          value={inputProps.value}
          disabled={readonly}
          defaultValue={defaultValue}
          className={`${classname} no-border`}
          placeholder={placeholder}
          onChange={(val) => {
            inputProps.onChange(val);
            onChange(val);
          }}
        >
            {data.length>0&&data.map(val=>{
                return <Option value={val[valueIndex]}>{val[labelIndex]}</Option>
            })}
        </Select>
        <label className="text-danger">{errors?.message || ""}</label>
      </div>
    </div>
  );
};

export default CustomSelect;