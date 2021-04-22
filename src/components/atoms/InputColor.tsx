export type InputColorProps = Pick<JSX.IntrinsicElements['input'],
  | 'id'
  | 'value'
  | 'name'
  | 'disabled'
  | 'onChange'> & {
    labelText?: string,
  }

// TODO: propsからlabelText分離してスプレッド
const InputColor = (props: InputColorProps) => (
  <>
    {props.labelText ? (
      <label htmlFor={props.id}>{props.labelText}</label>
    ) : ''}
    <input type="color" id={props.id} name={props.name} value={props.value} onChange={props.onChange} disabled={props.disabled} />
  </>
);

export default InputColor;