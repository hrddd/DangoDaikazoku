import Dango from "../molecules/Dango";
import InputRange from '../atoms/InputRange';
import { ChangeEvent, useState } from "react";

const DangoEditor = () => {
  const [state, setState] = useState({
    width: 72,
    height: 52,
    fill: '#aaC8B3',
  })

  const widthRangeProps = {
    id: 'width',
    label: 'width',
    name: 'width',
    min: 72,
    max: 1440,
    value: state.width,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        width: Number(e.currentTarget.value)
      })
    }
  }
  const heightRangeProps = {
    id: 'height',
    label: 'height',
    name: 'height',
    min: 72,
    max: 1028,
    value: state.height,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        height: Number(e.currentTarget.value)
      })
    }
  }
  return (
    <>
      <Dango {...state} />
      <InputRange {...widthRangeProps} />
      <InputRange {...heightRangeProps} />
    </>)
}

export default DangoEditor;