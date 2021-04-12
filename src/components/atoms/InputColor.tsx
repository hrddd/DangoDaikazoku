import { ChangeEvent } from "react";

type InputColorProps = Pick<JSX.IntrinsicElements['input'],
  | 'id'
  | 'value'
  | 'name'
  | 'onChange'> & {
    labelText?: string,
  }

const InputColor = (props: InputColorProps) => (
  <>
    {props.labelText ? (
      <label htmlFor={props.id}>{props.labelText}</label>
    ) : ''}
    <input type="color" id={props.id} name={props.name} value={props.value} onChange={props.onChange} />
  </>
);

export default InputColor;