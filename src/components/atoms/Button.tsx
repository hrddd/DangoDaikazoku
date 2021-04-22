import { ChangeEvent } from "react";

export type ButtonProps = Pick<JSX.IntrinsicElements['button'],
  | 'onClick'> & {
    labelText: string,
  }

const Button = (props: ButtonProps) => (
  <button onClick={props.onClick}>{props.labelText}</button>
);

export default Button;