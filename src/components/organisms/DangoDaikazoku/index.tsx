import Viewer from './Viewer';
import Editor from './Editor';
import { useContext, useEffect, useMemo, useState, useCallback } from 'react';
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
    original: null as null | DangoType,
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
  const setOriginal = (original: DangoType) => {
    setEditorState({
      ...editorState,
      original,
      modified: {
        width: original.width,
        height: original.height,
        fill: original.fill,
        stroke: original.stroke,
        strokeWidth: original.strokeWidth,
      },
    })
  }
  const clearOriginal = () => {
    setEditorState({
      ...editorState,
      original: null,
    })
  }

  useEffect(() => {
    const selected = viewer.dangos.find(({ id }) => id === viewer.selectedId);
    if (!selected) {
      clearOriginal()
    } else {
      setOriginal(selected)
    }
  }, [viewer.selectedId])

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
      if (!editorState.original) return void (0)
      dispatch(updateDangoAction({
        ...editorState.original,
        ...editorState.modified
      }))
    },
    other: (e: React.ChangeEvent<HTMLInputElement>) => {
      updateModified({
        [e.currentTarget.name]: e.currentTarget.value,
      })
      if (!editorState.original) return void (0)
      dispatch(updateDangoAction({
        ...editorState.original,
        ...editorState.modified
      }))
    }
  }

  const editorOnClickHandlers = {
    apply: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editorState.original) return void (0);
      const newDango = editorState.enableRandomize
        ? {
          ...editorState.original,
          ...randomizeDangoParamFactory()
        } : {
          ...editorState.original,
          ...editorState.modified
        }
      dispatch(updateDangoAction(newDango))
      setOriginal(newDango)
    },
    copy: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editorState.original) return void (0);
      dispatch(addDangoAction(editorState.enableRandomize ? randomizeDangoParamFactory() : editorState.modified))
    },
    remove: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editorState.original) return void (0);
      const { id } = editorState.original;
      dispatch(removeDangoAction(id))
    },
    reset: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editorState.original) return void (0);
      dispatch(updateDangoAction(editorState.original))
      setOriginal(editorState.original)
    },
    deselect: (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(deselectDangoAction())
    },
  }

  const addOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addDangoAction())
  }

  // Viewer
  const dangos = useMemo(() => viewer.dangos.map((dango) => ({
    ...dango,
    isSelected: viewer.selectedId === dango.id
  })), [viewer.dangos, viewer.selectedId])
  // TODO: ClickHandlerの中身を分ける。selectedIdの変更で全てのだんごがレンダリングし直されてしまうため
  const ViewerClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const clickedId = e.currentTarget.dataset['id'] as string
    if (viewer && viewer.selectedId !== clickedId) {
      dispatch(selectDangoAction(clickedId))
    } else {
      dispatch(deselectDangoAction())
    }
  }, [viewer.selectedId])

  return (
    <>
      { editorState.original ? (
        <Editor
          form={{
            ...editorState.modified,
            enableRandomize: editorState.enableRandomize
          }}
          target={editorState.original}
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