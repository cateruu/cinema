import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import { Value } from '../ScheduleForm';

interface Props {
  values: Value[];
  value: Value | undefined;
  onChange: (id: string) => void;
  placeholder: string;
  name: string;
}

const SelectComponent = ({
  value,
  values,
  onChange,
  placeholder,
  name,
}: Props) => {
  return (
    <Select.Root value={value?.id} onValueChange={onChange} name={name}>
      <Select.Trigger
        id='select-component'
        className='bg-slate-950 rounded-xl p-3 flex gap-2 outline-none font-medium max-w-96 w-full'
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className='ml-auto'>
          <ChevronDown size={24} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className='bg-slate-950 rounded-xl border-2 border-slate-800 overflow-hidden z-20'>
          <Select.Viewport>
            {values.map((value) => (
              <Select.Item
                value={value.id}
                key={value.id}
                className='p-3 font-medium cursor-pointer flex gap-3 items-center transition-colors border-none outline-none hover:bg-slate-900'
              >
                <Select.ItemText>{value.name}</Select.ItemText>
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
