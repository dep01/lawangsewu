import { DatePicker } from "antd";
import { useController } from "react-hook-form";
const CustomDatePicker = ({
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
  format = "YYYY-MM-DD",
  onChange
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
        <DatePicker
          id={id}
          style={style}
          name={name}
          ref={ref}
          value={inputProps.value}
          disabled={readonly}
          className={classname}
          placeholder={placeholder}
          allowClear
          format={format}
          onChange={(val) => {
            inputProps.onChange(val)
            onChange(val.format(format))
            // console.log();
          }}
        />

        <label className="text-danger">{errors?.message || ""}</label>
      </div>
    </div>
  );
};

export default CustomDatePicker;
