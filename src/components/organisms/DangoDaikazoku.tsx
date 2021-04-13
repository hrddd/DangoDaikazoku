// TODO: テスト
// height操作でstateが変更される
// width操作でstateが変更される

import { useContext } from "react";
import SelectableDango from "../molecules/SelectableDango";
import { DangoDaikazokuContext, DangoDaikazokuUpdateContext } from '../../contexts/dangoDaikazokuContext';
import { deselectDangoAction, selectDangoAction, addDangoAction } from '../../modules/dangoDaikazoku';

const DangoDaikazoku = () => {
  // TODO: customhookに退避
  const dangoDaikazoku = useContext(DangoDaikazokuContext)
  const dispatch = useContext(DangoDaikazokuUpdateContext)

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickedId = e.currentTarget.dataset['id'] as string
    if (dangoDaikazoku && dangoDaikazoku.selectedId !== clickedId) {
      dispatch(selectDangoAction(clickedId))
    } else {
      dispatch(deselectDangoAction())
    }
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end' }}>
      {dangoDaikazoku?.dangos.map((dangoProps) => {
        const isSelected = dangoDaikazoku.selectedId === dangoProps.id;
        return (<SelectableDango {...dangoProps} isSelected={isSelected} onClick={clickHandler} key={dangoProps.id} />)
      })}
    </div>)
}

export default DangoDaikazoku;