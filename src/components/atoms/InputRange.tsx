import { ChangeEvent } from "react";

type InputRangeProps = {
  id: string,
  label?: string,
  name: string,
  min: number,
  max: number,
  value: number,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputRange = (props: InputRangeProps) => (
  <>
    {props.label ? (
      <label htmlFor={props.id}>{props.label}</label>
    ) : ''}
    <input type="range" id={props.id} name={props.name} min={props.min} max={props.max} value={props.value} onChange={props.onChange} />
    {props.value}
  </>
);

export default InputRange;