// TODO: テスト
// height操作でstateが変更される
// width操作でstateが変更される

import Dango from "../../atoms/Dango";
import InputRange from '../../atoms/InputRange';
import InputColor from '../../atoms/InputColor';
import Button from "../../atoms/Button";
import InputToggle from '../../atoms/InputToggle';
import { Dango as DangoType } from '../../../types/Dango';

const Editor = ({ dango, inputProps }: {
  dango: Omit<DangoType, 'id'>,
  inputProps: {
    randomize: any,
    widthRange: any,
    heightRange: any,
    fill: any,
    stroke: any,
    strokeWidth: any,
    apply: any,
    copy: any,
    remove: any,
  }
}) => {
  return (
    <>
      <Dango {...dango} />
      <InputToggle {...inputProps.randomize} />
      <InputRange {...inputProps.widthRange} />
      <InputRange {...inputProps.heightRange} />
      <InputColor {...inputProps.fill} />
      <InputColor {...inputProps.stroke} />
      <InputRange {...inputProps.strokeWidth} />
      <Button {...inputProps.apply} />
      <Button {...inputProps.copy} />
      <Button {...inputProps.remove} />
    </>
  )
}

export default Editor;