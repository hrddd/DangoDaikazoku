import Viewer from './Viewer';
import Editor from './Editor';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ViewerContext, ViewerUpdateContext } from '../../../contexts/viewerContext';
import { selectDangoAction, deselectDangoAction, addDangoAction, removeDangoAction, updateDangoAction } from '../../../modules/viewer';
import { Dango as DangoType } from '../../../types/Dango';
import Button from '../../atoms/Button';

type ChangeableDangoParam = Omit<DangoType, 'id'>

const dafaultState: ChangeableDangoParam = {
  width: 72,
  height: 52,
  fill: '#aaC8B3',
  stroke: '#5D3F35',
  strokeWidth: 8
}
const randomHexColorFactory = () => {
  const hex = (number: number) => number.toString(16)
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += hex(Math.trunc(15.9 * Math.random()))
  }
  return color
}
const randomizeDangoParamFactory = (): ChangeableDangoParam => {
  const width = 72 + Math.ceil(360 * Math.random());
  return {
    width,
    height: Math.ceil(width * dafaultState.height / dafaultState.width),
    fill: randomHexColorFactory(),
    stroke: randomHexColorFactory(),
    strokeWidth: Math.ceil(8 * Math.random())
  }
}

const DangoDaikazoku = () => {
  // TODO: customhookに退避
  const viewer = useContext(ViewerContext)
  const dispatch = useContext(ViewerUpdateContext)

  // TODO: EditorContext
  const [editorState, setEditorState] = useState({
    original: undefined as undefined | DangoType,
    modified: {
      width: 72,
      height: 52,
      fill: '#aaC8B3',
      stroke: '#5D3F35',
      strokeWidth: 8,
    },
    enableRandomize: true
  });

  const updateModified = (newInputs: Partial<typeof editorState.modified>) => {
    setEditorState({
      ...editorState,
      modified: {
        ...editorState.modified,
        ...newInputs,
      }
    })
  }
  const switchEnableRandomize = (enableRandomize: boolean) => {
    setEditorState({
      ...editorState,
      enableRandomize
    })
  }

  useEffect(() => {
    console.log(editorState)
    setEditorState({
      ...editorState,
      original: viewer?.dangos.find(({ id }) => id === viewer.selectedId),
    })
  }, [viewer?.selectedId])

  // Editor
  const editorOnChangeHandlers = {
    enableRandomize: (e: React.ChangeEvent<HTMLInputElement>) => {
      switchEnableRandomize(e.currentTarget.checked)
    },
    width: (e: React.ChangeEvent<HTMLInputElement>) => {
      const width = Number(e.currentTarget.value);
      updateModified({
        width,
        height: Math.ceil(width * dafaultState.height / dafaultState.width)
      })
    },
    fill: (e: React.ChangeEvent<HTMLInputElement>) => {
      updateModified({
        fill: e.currentTarget.value,
      })
    },
    stroke: (e: React.ChangeEvent<HTMLInputElement>) => {
      updateModified({
        stroke: e.currentTarget.value,
      })
    },
    strokeWidth: (e: React.ChangeEvent<HTMLInputElement>) => {
      updateModified({
        strokeWidth: Number(e.currentTarget.value),
      })
    }
  }

  const editorOnClickHandlers = {
    apply: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editorState.original) return void (0);
      dispatch(updateDangoAction(editorState.enableRandomize
        ? {
          ...editorState.original,
          ...randomizeDangoParamFactory()
        } : {
          ...editorState.original,
          ...editorState.modified
        }))
    },
    copy: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editorState.original) return void (0);
      const { id, ...copiedParams } = editorState.original;
      dispatch(addDangoAction(editorState.enableRandomize ? randomizeDangoParamFactory() : copiedParams))
    },
    remove: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editorState.original) return void (0);
      const { id } = editorState.original;
      dispatch(removeDangoAction(id))
    },
  }

  const addOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addDangoAction())
  }

  // Viewer
  const dangos = useMemo(() => {
    return viewer?.dangos.map((dango) => ({
      ...dango,
      isSelected: viewer.selectedId === dango.id
    }))
  }, [viewer])
  const ViewerClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickedId = e.currentTarget.dataset['id'] as string
    if (viewer && viewer.selectedId !== clickedId) {
      dispatch(selectDangoAction(clickedId))
    } else {
      dispatch(deselectDangoAction())
    }
  }

  return (
    <>
      { editorState.original ? (
        <Editor
          form={{
            ...editorState.modified,
            enableRandomize: editorState.enableRandomize
          }}
          onChangeHandlers={editorOnChangeHandlers}
          onClickHandlers={editorOnClickHandlers}
        />
      ) : (<Button
        labelText='だんごを追加する'
        onClick={addOnClickHandler}
      />)}
      { dangos ? (
        <Viewer dangos={dangos} clickHandler={ViewerClickHandler} />
      ) : ''}
    </>)
}

export default DangoDaikazoku;