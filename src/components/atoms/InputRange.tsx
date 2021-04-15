import { ChangeEvent } from "react";

type InputRangeProps = Pick<JSX.IntrinsicElements['input'],
  | 'id'
  | 'value'
  | 'name'
  | 'min'
  | 'max'
  | 'disabled'
  | 'onChange'> & {
    labelText?: string,
  }

// TODO: propsからlabelText分離してスプレッド
const InputRange = (props: InputRangeProps) => (
  <>
    {props.labelText ? (
      <label htmlFor={props.id}>{props.labelText}</label>
    ) : ''}
    <input type="range" id={props.id} name={props.name} min={props.min} max={props.max} value={props.value} onChange={props.onChange} disabled={props.disabled} />
    {props.value}
  </>
);

export default InputRange;