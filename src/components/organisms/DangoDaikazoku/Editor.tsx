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
  randomize: boolean
}

const Editor = ({
  form: { width, fill, stroke, strokeWidth, randomize, },
  target,
  onChangeHandlers,
  onClickHandlers,
}: {
  form: Form,
  target: PopDangoProps,
  onChangeHandlers: {
    [key in ('randomize' | 'width' | 'other')]: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
  onClickHandlers: {
    [key in ('apply' | 'copy' | 'remove' | 'reset' | 'deselect')]: (e: React.MouseEvent<HTMLButtonElement>) => void
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
        disabled={randomize}
        onChange={onChangeHandlers.width}
      />
      <InputColor
        id='fill'
        labelText='fill'
        name='fill'
        value={fill}
        disabled={randomize}
        onChange={onChangeHandlers.other}
      />
      <InputColor
        id='stroke'
        labelText='stroke'
        name='stroke'
        value={stroke}
        disabled={randomize}
        onChange={onChangeHandlers.other}
      />
      <InputRange
        id='strokeWidth'
        labelText='strokeWidth'
        name='strokeWidth'
        min={1}
        max={16}
        value={strokeWidth}
        disabled={randomize}
        onChange={onChangeHandlers.other}
      />
      <InputToggle
        id='randomize'
        labelText='パラメータを適当に'
        name='randomize'
        checked={randomize}
        onChange={onChangeHandlers.randomize}
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
      <Button
        labelText='選択を解除'
        onClick={onClickHandlers.deselect}
      />
    </>
  )
}

export default Editor;