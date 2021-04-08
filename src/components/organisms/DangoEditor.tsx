// TODO: テスト
// height操作でstateが変更される
// width操作でstateが変更される
// scaleLink操作でstateが変更される
// scaleLink操作でheight,widthの更新方法が変更される

import Dango from "../molecules/Dango";
import InputRange from '../atoms/InputRange';
import { ChangeEvent, useState } from "react";
import InputToggle from '../atoms/InputToggle';
import InputColor from '../atoms/InputColor';

const initialState = {
  width: 72,
  height: 52,
  fill: '#aaC8B3',
  scaleLink: true,
}

const DangoEditor = () => {
  const [state, setState] = useState(initialState)

  const widthRangeProps = {
    id: 'width',
    label: 'width',
    name: 'width',
    min: 72,
    max: 1440,
    value: state.width,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const width = Number(e.currentTarget.value);
      setState({
        ...state,
        width,
        height: state.scaleLink ? width * initialState.height / initialState.width : state.height
      })
    }
  }
  const heightRangeProps = {
    id: 'height',
    label: 'height',
    name: 'height',
    min: 52,
    max: 1028,
    value: state.height,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const height = Number(e.currentTarget.value);
      setState({
        ...state,
        width: state.scaleLink ? height * initialState.width / initialState.height : state.width,
        height
      })
    }
  }
  const scaleLinkToggleProps = {
    id: 'scaleLink',
    label: 'scaleLink',
    name: 'scaleLink',
    checked: state.scaleLink,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        scaleLink: e.currentTarget.checked
      })
    }
  }
  const fillProps = {
    id: 'fill',
    label: 'fill',
    name: 'fill',
    value: '#aaC8B3',
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        fill: e.currentTarget.value,
      })
    }
  }
  return (
    <>
      <Dango {...state} />
      <InputRange {...widthRangeProps} />
      <InputRange {...heightRangeProps} />
      <InputToggle {...scaleLinkToggleProps} />
      <InputColor {...fillProps} />
    </>)
}

export default DangoEditor;