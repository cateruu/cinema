import * as Select from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import React from 'react';

interface Props {
  values: string[];
  value: string;
  onChange: (value: string) => void;
}

const SelectComponent = ({ values, value, onChange }: Props) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        id='select-component'
        className='bg-slate-950 rounded-xl border-2 border-slate-800 p-2 flex gap-2 outline-none font-medium'
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDown size={24} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className='bg-slate-950 rounded-xl border-2 border-slate-800 overflow-hidden z-20'>
          <Select.Viewport>
            {values.map((value) => (
              <Select.Item
                value={value}
                key={value}
                className='p-3 font-medium cursor-pointer flex gap-3 items-center transition-colors border-none outline-none hover:bg-slate-900'
              >
                <Select.ItemText>{value}</Select.ItemText>
                <Select.ItemIndicator className='block w-2 h-2 rounded-full bg-orange-400'></Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectComponent;
