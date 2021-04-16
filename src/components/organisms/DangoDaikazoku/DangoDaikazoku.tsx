// TODO: テスト
// height操作でstateが変更される
// width操作でstateが変更される

import { useContext } from "react";
import SelectableDango from "../../molecules/SelectableDango/SelectableDango";
import { DangoDaikazokuContext, DangoDaikazokuUpdateContext } from '../../../contexts/dangoDaikazokuContext';
import { deselectDangoAction, selectDangoAction, addDangoAction } from '../../../modules/dangoDaikazoku';
import styles from './DangoDaikazoku.module.css'

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
    <div className={styles.root}>
      {dangoDaikazoku?.dangos.map((dangoProps) => {
        const isSelected = dangoDaikazoku.selectedId === dangoProps.id;
        const size = Math.floor(dangoProps.width / 72);
        return (
          <div className={styles[`_item--${size}`]} key={dangoProps.id} >
            <SelectableDango {...dangoProps} isSelected={isSelected} onClick={clickHandler} />
          </div>
        )
      })}
    </div>)
}

export default DangoDaikazoku;