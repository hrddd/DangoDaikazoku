import Viewer from './Viewer';
import Editor from './Editor';
import { useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { ViewerContext, ViewerUpdateContext } from '../../../contexts/viewerContext';
import { selectDangoAction, deselectDangoAction, addDangoAction, removeDangoAction, updateDangoAction } from '../../../modules/viewer';
import { Dango as DangoType } from '../../../types/Dango';
import Button from '../../atoms/Button';
import { EditorContext, EditorUpdateContext } from '../../../contexts/editorContext';
import { switchRandomizeAction, clearOriginalAction, setOriginalAction, updateModifiedAction } from '../../../modules/editor';


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
  const viewerDispatch = useContext(ViewerUpdateContext)
  const editor = useContext(EditorContext)
  const editorDispatch = useContext(EditorUpdateContext)

  useEffect(() => {
    const selected = viewer.dangos.find(({ id }) => id === viewer.selectedId);
    if (!selected) {
      editorDispatch(clearOriginalAction())
    } else {
      editorDispatch(setOriginalAction(selected))
    }
  }, [viewer.selectedId])

  // Editor
  const editorOnChangeHandlers = {
    randomize: (e: React.ChangeEvent<HTMLInputElement>) => {
      editorDispatch(switchRandomizeAction(e.currentTarget.checked))
    },
    width: (e: React.ChangeEvent<HTMLInputElement>) => {
      const width = Number(e.currentTarget.value);
      editorDispatch(updateModifiedAction({
        width,
        height: Math.ceil(width * dafaultState.height / dafaultState.width)
      }))
      if (!editor.original) return void (0)
      viewerDispatch(updateDangoAction({
        ...editor.original,
        ...editor.modified
      }))
    },
    other: (e: React.ChangeEvent<HTMLInputElement>) => {
      editorDispatch(updateModifiedAction({
        [e.currentTarget.name]: e.currentTarget.value,
      }))
      if (!editor.original) return void (0)
      viewerDispatch(updateDangoAction({
        ...editor.original,
        ...editor.modified
      }))
    }
  }

  const editorOnClickHandlers = {
    apply: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editor.original) return void (0);
      const newDango = editor.randomize
        ? {
          ...editor.original,
          ...randomizeDangoParamFactory()
        } : {
          ...editor.original,
          ...editor.modified
        }
      viewerDispatch(updateDangoAction(newDango))
      editorDispatch(setOriginalAction(newDango))
    },
    copy: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editor.original) return void (0);
      viewerDispatch(addDangoAction(editor.randomize ? randomizeDangoParamFactory() : editor.modified))
    },
    remove: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editor.original) return void (0);
      const { id } = editor.original;
      viewerDispatch(removeDangoAction(id))
    },
    reset: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editor.original) return void (0);
      viewerDispatch(updateDangoAction(editor.original))
      editorDispatch(setOriginalAction(editor.original))
    },
    deselect: (e: React.MouseEvent<HTMLButtonElement>) => {
      viewerDispatch(deselectDangoAction())
    },
  }

  const addOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    viewerDispatch(addDangoAction())
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
      viewerDispatch(selectDangoAction(clickedId))
    } else {
      viewerDispatch(deselectDangoAction())
    }
  }, [viewer.selectedId])

  return (
    <>
      { editor.original ? (
        <Editor
          form={{
            ...editor.modified,
            randomize: editor.randomize
          }}
          target={editor.original}
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