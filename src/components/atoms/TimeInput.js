import React, { useState } from 'react';
import dayjs from 'dayjs';
import {TimePicker} from "antd"
import { SysDateTransform } from '../../utils/global_store';
function TimeInput(props) {
    const { value, onChange, placeholder,name } = props;
    const handleChange =(val,str)=>{
      onChange(str)
    }
    return (
      
      <TimePicker
        onChange={handleChange}
        value={dayjs(value =='' ||value==null||value == undefined?'00:00:00':value,'HH:mm:ss')}
        name={name??'input_time'}
        className='form-control'
        format="HH:mm:ss"        
        placeholder={placeholder}
      />
    );
}

export default TimeInput;