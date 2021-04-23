// TODO: テスト
// height操作でstateが変更される
// width操作でstateが変更される

import Dango from "../../atoms/Dango";
import InputRange from '../../atoms/InputRange';
import InputColor from '../../atoms/InputColor';
import Button from "../../atoms/Button";
import InputToggle, { InputToggleProps } from '../../atoms/InputToggle';
import { Dango as DangoType } from '../../../types/Dango';

type Form = {
  width: number,
  fill: string,
  stroke: string,
  strokeWidth: number,
  enableRandomize: boolean
}

const Editor = ({
  form: { width, fill, stroke, strokeWidth, enableRandomize, },
  onChangeHandlers,
  onClickHandlers,
}: {
  form: Form,
  onChangeHandlers: {
    [key in keyof Form]: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
  onClickHandlers: {
    [key in ('apply' | 'copy' | 'remove')]: (e: React.MouseEvent<HTMLButtonElement>) => void
  }
}) => {
  return (
    <>
      <InputToggle
        id='randomize'
        labelText='パラメータを適当に'
        name='randomize'
        checked={enableRandomize}
        onChange={onChangeHandlers.enableRandomize}
      />
      <InputRange
        id='width'
        labelText='width'
        name='width'
        min={72}
        max={720}
        value={width}
        disabled={enableRandomize}
        onChange={onChangeHandlers.width}
      />
      <InputColor
        id='fill'
        labelText='fill'
        name='fill'
        value={fill}
        disabled={enableRandomize}
        onChange={onChangeHandlers.fill}
      />
      <InputColor
        id='stroke'
        labelText='stroke'
        name='stroke'
        value={stroke}
        disabled={enableRandomize}
        onChange={onChangeHandlers.stroke}
      />
      <InputRange
        id='strokeWidth'
        labelText='strokeWidth'
        name='strokeWidth'
        min={1}
        max={16}
        value={strokeWidth}
        disabled={enableRandomize}
        onChange={onChangeHandlers.strokeWidth}
      />
      <Button
        labelText='変更を反映する'
        onClick={onClickHandlers.apply}
      />
      <Button
        labelText='だんごをコピーする'
        onClick={onClickHandlers.copy}
      />
      <Button
        labelText='だんごを削除する'
        onClick={onClickHandlers.remove}
      />
    </>
  )
}

export default Editor;