// TODO: テスト
// height操作でstateが変更される
// width操作でstateが変更される

import Dango from "../molecules/Dango";
import InputRange from '../atoms/InputRange';
import { ChangeEvent, useState } from "react";
import InputColor from '../atoms/InputColor';

const initialState = [{
  id: 'dango_1',
  width: 72,
  height: 52,
  fill: '#aaC8B3',
  stroke: '#5D3F35',
  strokeWidth: 8
}, {
  id: 'dango_2',
  width: 144,
  height: 104,
  fill: '#aaC8B3',
  stroke: '#5D3F35',
  strokeWidth: 8
}, {
  id: 'dango_3',
  width: 216,
  height: 156,
  fill: '#aaC8B3',
  stroke: '#5D3F35',
  strokeWidth: 8
}]

const DangoDaikazoku = () => {
  const [state] = useState(initialState)

  return (
    <>
      {state.map((dangoProps) => {
        const { id, ...props } = dangoProps
        return (<Dango {...props} key={id} />)
      })}
    </>)
}

export default DangoDaikazoku;