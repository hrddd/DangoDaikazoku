import Viewer from './Viewer';
import Editor from './Editor';
import Button from '../../atoms/Button';
import { useDangodaikazokuState } from './hooks/index';

const DangoDaikazoku = () => {
  // TODO: 各パラメータがundefinedにも解釈されてしまうのを解決
  const [{
    editorForm,
    viewerDangos,
    editorTarget
  }, {
    editorChangeHandlers,
    editorClickHandlers,
    viewerClickHandler,
    buttonClickHandler
  }] = useDangodaikazokuState()

  return (
    <>
      { editorTarget ? (
        <Editor
          form={editorForm}
          target={editorTarget}
          onChangeHandlers={editorChangeHandlers}
          onClickHandlers={editorClickHandlers}
        />
      ) : (<Button
        labelText='だんごを追加する'
        onClick={buttonClickHandler}
      />)}
      { viewerDangos ? (
        <Viewer dangos={viewerDangos} clickHandler={viewerClickHandler} />
      ) : ''}
    </>)
}

export default DangoDaikazoku;