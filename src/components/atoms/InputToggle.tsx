import { ChangeEvent } from "react";

export type InputToggleProps = Pick<JSX.IntrinsicElements['input'],
  | 'id'
  | 'value'
  | 'name'
  | 'checked'
  | 'onChange'> & {
    labelText?: string,
  }

const InputToggle = (props: InputToggleProps) => (
  <>
    {props.labelText ? (
      <label htmlFor={props.id}>{props.labelText}</label>
    ) : ''}
    <input type="checkbox" id={props.id} name={props.name} value={props.value} onChange={props.onChange} checked={props.checked} />
  </>
);

export default InputToggle;