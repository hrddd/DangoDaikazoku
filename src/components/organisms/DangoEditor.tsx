import Dango from "../molecules/Dango";
import InputRange from '../atoms/InputRange';
import { ChangeEvent, useState } from "react";

const DangoEditor = () => {
  const [state, setState] = useState({
    width: 72,
    height: 52,
    fill: '#aaC8B3',
  })
  const onChangeHandlerFactory = (key: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [key]: Number(e.currentTarget.value)
      })
    }
  }

  const widthRangeProps = {
    id: 'width',
    label: 'width',
    name: 'width',
    min: 72,
    max: 1440,
    value: state.width,
    onChange: onChangeHandlerFactory('width')
  }
  const heightRangeProps = {
    id: 'height',
    label: 'height',
    name: 'height',
    min: 72,
    max: 1028,
    value: state.height,
    onChange: onChangeHandlerFactory('height')
  }
  return (
    <>
      <Dango {...state} />
      <InputRange {...widthRangeProps} />
      <InputRange {...heightRangeProps} />
    </>)
}

export default DangoEditor;