// TODO: テスト
// height操作でstateが変更される
// width操作でstateが変更される

import Dango from "../atoms/Dango";
import InputRange from '../atoms/InputRange';
import { ChangeEvent, useContext, useEffect, useState } from "react";
import InputColor from '../atoms/InputColor';
import { DangoDaikazokuContext, DangoDaikazokuUpdateContext } from "../../contexts/dangoDaikazokuContext";
import Button from "../atoms/Button";
import { updateDangoAction, addDangoAction } from '../../modules/dangoDaikazoku';
import InputToggle from '../atoms/InputToggle';
import { Dango as DangoType } from '../../types/Dango';

type DangoChangeableParameters = Omit<DangoType, 'id'>
const dafaultState: DangoChangeableParameters = {
  width: 72,
  height: 52,
  fill: '#aaC8B3',
  stroke: '#5D3F35',
  strokeWidth: 8
}

const DangoEditor = () => {
  // TODO: customhookに退避
  const dangoDaikazoku = useContext(DangoDaikazokuContext)
  const dispatch = useContext(DangoDaikazokuUpdateContext)
  const selectedDango = dangoDaikazoku?.dangos.find(({ id }) => id === dangoDaikazoku.selectedId)

  // TODO: editor用のcontextを形成
  // {
  //   dango: {},
  //   options: {
  //     randomize: true
  //   }
  // }
  const [state, setState] = useState(selectedDango);
  const [formState, setFormState] = useState({
    randomize: false
  });

  useEffect(() => {
    setState(selectedDango)
  }, [selectedDango])

  const randomizeProps = {
    id: 'randomize',
    labelText: 'パラメータを適当に',
    name: 'randomize',
    checked: formState.randomize,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setFormState({
        ...formState,
        randomize: e.currentTarget.checked,
      })
    }
  }
  const widthRangeProps = {
    id: 'width',
    labelText: 'width',
    name: 'width',
    min: 72,
    max: 720,
    value: state?.width,
    disabled: formState.randomize,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const width = Number(e.currentTarget.value);
      if (!state) return void (0);
      setState({
        ...state,
        width,
        height: Math.ceil(width * dafaultState.height / dafaultState.width)
      })
    }
  }
  const heightRangeProps = {
    id: 'height',
    labelText: 'height',
    name: 'height',
    min: 52,
    max: 520,
    value: state?.height,
    disabled: formState.randomize,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const height = Number(e.currentTarget.value);
      if (!state) return void (0);
      setState({
        ...state,
        width: Math.ceil(height * dafaultState.width / dafaultState.height),
        height
      })
    }
  }
  const fillProps = {
    id: 'fill',
    labelText: 'fill',
    name: 'fill',
    value: state?.fill,
    disabled: formState.randomize,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      if (!state) return void (0);
      setState({
        ...state,
        fill: e.currentTarget.value,
      })
    }
  }
  const strokeProps = {
    id: 'stroke',
    labelText: 'stroke',
    name: 'stroke',
    value: state?.stroke,
    disabled: formState.randomize,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      if (!state) return void (0);
      setState({
        ...state,
        stroke: e.currentTarget.value,
      })
    }
  }
  const strokeWidthProps = {
    id: 'strokeWidth',
    labelText: 'strokeWidth',
    name: 'strokeWidth',
    min: 1,
    max: 16,
    value: state?.strokeWidth,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      if (!state) return void (0);
      setState({
        ...state,
        strokeWidth: Number(e.currentTarget.value),
      })
    }
  }
  const randomHexColorFactory = () => {
    const hex = (number: number) => number.toString(16)
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += hex(Math.ceil(16 * Math.random()))
    }
    return color
  }
  const randomizeDangoParamFactory = (): DangoChangeableParameters => {
    const width = 72 + Math.ceil(360 * Math.random());
    return {
      width,
      height: Math.ceil(width * dafaultState.height / dafaultState.width),
      fill: randomHexColorFactory(),
      stroke: randomHexColorFactory(),
      strokeWidth: Math.ceil(8 * Math.random())
    }
  }

  const applyProps = {
    labelText: '変更を反映する',
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!state) return void (0);
      dispatch(updateDangoAction(formState.randomize ? {
        ...state,
        ...randomizeDangoParamFactory()
      } : state))
    }
  }

  const copyProps = {
    labelText: 'だんごをコピーする',
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!state) return void (0);
      const { id, ...copiedParams } = state;
      dispatch(addDangoAction(formState.randomize ? randomizeDangoParamFactory() : copiedParams))
    }
  }

  const addProps = {
    labelText: 'だんごを追加する',
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(addDangoAction())
    }
  }

  return (
    <>
      {
        state ? (
          <>
            <Dango {...state} />
            <InputToggle {...randomizeProps} />
            <InputRange {...widthRangeProps} />
            <InputRange {...heightRangeProps} />
            <InputColor {...fillProps} />
            <InputColor {...strokeProps} />
            <InputRange {...strokeWidthProps} />
            <Button {...applyProps} />
            <Button {...copyProps} />
          </>
        ) : <Button {...addProps} />
      }
    </>
  )
}

export default DangoEditor;