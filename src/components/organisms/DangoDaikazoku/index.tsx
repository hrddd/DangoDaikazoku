import DangoDaikazokuViewer from './Viewer';
import DangoEditor from './Editor';
import { useContext, useMemo } from 'react';
import { DangoDaikazokuContext, DangoDaikazokuUpdateContext } from '../../../contexts/dangoDaikazokuContext';
import { selectDangoAction, deselectDangoAction } from '../../../modules/dangoDaikazoku';


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

  const dangos = useMemo(() => {
    return dangoDaikazoku?.dangos.map((dango) => ({
      ...dango,
      isSelected: dangoDaikazoku.selectedId === dango.id
    }))
  }, [dangoDaikazoku])
  return (
    <>
      <DangoEditor />
      { dangos
        ? (
          <DangoDaikazokuViewer dangos={dangos} clickHandler={clickHandler} />
        ) : ''}
    </>)
}



export default DangoDaikazoku;