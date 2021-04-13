// TODO: テスト
// height操作でstateが変更される
// width操作でstateが変更される

import Dango from "../molecules/Dango";
import InputRange from '../atoms/InputRange';
import { ChangeEvent, useContext, useEffect, useState } from "react";
import InputColor from '../atoms/InputColor';
import { DangoDaikazokuContext, DangoDaikazokuUpdateContext } from "../../contexts/dangoDaikazokuContext";
import DangoDaikazoku from './DangoDaikazoku';
import Button from "../atoms/Button";
import { updateDangoAction, addDangoAction } from '../../modules/dangoDaikazoku';

const initialState = {
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

  const [state, setState] = useState(selectedDango)

  useEffect(() => {
    setState(selectedDango)
  }, [selectedDango])

  const widthRangeProps = {
    id: 'width',
    labelText: 'width',
    name: 'width',
    min: 72,
    max: 1440,
    value: state?.width,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const width = Number(e.currentTarget.value);
      if (!state) return void (0);
      setState({
        ...state,
        width,
        height: Math.ceil(width * initialState.height / initialState.width)
      })
    }
  }
  const heightRangeProps = {
    id: 'height',
    labelText: 'height',
    name: 'height',
    min: 52,
    max: 1028,
    value: state?.height,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const height = Number(e.currentTarget.value);
      if (!state) return void (0);
      setState({
        ...state,
        width: Math.ceil(height * initialState.width / initialState.height),
        height
      })
    }
  }
  const fillProps = {
    id: 'fill',
    labelText: 'fill',
    name: 'fill',
    value: state?.fill,
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

  const applyProps = {
    labelText: '変更を反映する',
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!state) return void (0);
      dispatch(updateDangoAction({
        ...state,
      }))
    }
  }

  const addProps = {
    labelText: 'だんごを追加する',
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!state) return void (0);
      const { id, ...copiedParams } = state;
      dispatch(addDangoAction(copiedParams))
    }
  }

  return (
    <>
      {
        state ? (
          <>
            <Dango {...state} />
            <InputRange {...widthRangeProps} />
            <InputRange {...heightRangeProps} />
            <InputColor {...fillProps} />
            <InputColor {...strokeProps} />
            <InputRange {...strokeWidthProps} />
            <Button {...applyProps} />
            <Button {...addProps} />
          </>
        ) : 'だんごを選択してください'
      }
    </>
  )
}

export default DangoEditor;