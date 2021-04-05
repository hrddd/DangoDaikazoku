import { ChangeEvent } from "react";

type InputToggleProps = {
  id: string,
  label?: string,
  value?: string,
  name: string,
  checked: boolean,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputToggle = (props: InputToggleProps) => (
  <>
    {props.label ? (
      <label htmlFor={props.id}>{props.label}</label>
    ) : ''}
    <input type="checkbox" id={props.id} name={props.name} value={props.value} onChange={props.onChange} checked={props.checked} />
  </>
);

export default InputToggle;