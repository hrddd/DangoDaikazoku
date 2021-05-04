// TODO: テスト
// height操作でstateが変更される
// width操作でstateが変更される

import InputRange from '../../atoms/InputRange';
import InputColor from '../../atoms/InputColor';
import Button from "../../atoms/Button";
import InputToggle from '../../atoms/InputToggle';
import PopDango from '../../molecules/PopDango/PopDango';
import { PopDangoProps } from '../../molecules/PopDango/PopDango';

type Form = {
  width: number,
  fill: string,
  stroke: string,
  strokeWidth: number,
  enableRandomize: boolean
}

const Editor = ({
  form: { width, fill, stroke, strokeWidth, enableRandomize, },
  target,
  onChangeHandlers,
  onClickHandlers,
}: {
  form: Form,
  target: PopDangoProps,
  onChangeHandlers: {
    [key in ('enableRandomize' | 'width' | 'other')]: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
  onClickHandlers: {
    [key in ('apply' | 'copy' | 'remove' | 'reset')]: (e: React.MouseEvent<HTMLButtonElement>) => void
  }
}) => {
  return (
    <>
      <PopDango {...target} />
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
        onChange={onChangeHandlers.other}
      />
      <InputColor
        id='stroke'
        labelText='stroke'
        name='stroke'
        value={stroke}
        disabled={enableRandomize}
        onChange={onChangeHandlers.other}
      />
      <InputRange
        id='strokeWidth'
        labelText='strokeWidth'
        name='strokeWidth'
        min={1}
        max={16}
        value={strokeWidth}
        disabled={enableRandomize}
        onChange={onChangeHandlers.other}
      />
      <InputToggle
        id='randomize'
        labelText='パラメータを適当に'
        name='randomize'
        checked={enableRandomize}
        onChange={onChangeHandlers.enableRandomize}
      />
      <Button
        labelText='変更をリセット'
        onClick={onClickHandlers.reset}
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