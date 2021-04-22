// TODO: テスト
// height操作でstateが変更される
// width操作でstateが変更される

import Dango from "../../atoms/Dango";
import InputRange, { InputRangeProps } from '../../atoms/InputRange';
import InputColor, { InputColorProps } from '../../atoms/InputColor';
import Button, { ButtonProps } from "../../atoms/Button";
import InputToggle, { InputToggleProps } from '../../atoms/InputToggle';
import { Dango as DangoType } from '../../../types/Dango';

const Editor = ({
  dango,
  randomizeProps,
  widthRangeProps,
  heightRangeProps,
  fillProps,
  strokeProps,
  strokeWidthProps,
  applyProps,
  copyProps,
  removeProps,
}: {
  dango: Omit<DangoType, 'id'>,
  randomizeProps: InputToggleProps,
  widthRangeProps: InputRangeProps,
  heightRangeProps: InputRangeProps,
  fillProps: InputColorProps,
  strokeProps: InputColorProps,
  strokeWidthProps: InputRangeProps,
  applyProps: ButtonProps,
  copyProps: ButtonProps,
  removeProps: ButtonProps,
}) => {
  return (
    <>
      <Dango {...dango} />
      <InputToggle {...randomizeProps} id={randomizeProps.name} />
      <InputRange {...widthRangeProps} id={widthRangeProps.name} />
      <InputRange {...heightRangeProps} id={heightRangeProps.name} />
      <InputColor {...fillProps} id={fillProps.name} />
      <InputColor {...strokeProps} id={strokeProps.name} />
      <InputRange {...strokeWidthProps} id={strokeWidthProps.name} />
      <Button {...applyProps} />
      <Button {...copyProps} />
      <Button {...removeProps} />
    </>
  )
}

export default Editor;