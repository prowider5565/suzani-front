import { Option, Select } from '@material-tailwind/react'
import React from 'react'

const SelectMaterial = () => {
    return (
      <div className="w-full lg:w-[250px]">
        <Select
          className="py-5 w-full"
          label="Sorting
"
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          <Option>Tibbiy apparaturalar</Option>
          <Option>Tibbiy jixozlar</Option>
          <Option>Tibbiy buyumlar</Option>
          <Option>Laboratoriya reaktivlari</Option>
          <Option>Laboratoriya reagentlari</Option>
        </Select>
      </div>
    );
}

export default SelectMaterial