import { ChangeEvent } from "react";

type InputColorProps = {
  id: string,
  label?: string,
  value: string,
  name: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputColor = (props: InputColorProps) => (
  <>
    {props.label ? (
      <label htmlFor={props.id}>{props.label}</label>
    ) : ''}
    <input type="color" id={props.id} name={props.name} value={props.value} onChange={props.onChange} />
  </>
);

export default InputColor;