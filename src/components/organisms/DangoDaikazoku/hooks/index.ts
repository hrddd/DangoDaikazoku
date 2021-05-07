import { ViewerContext, ViewerUpdateContext } from "../../../../contexts/viewerContext"
import { EditorContext, EditorUpdateContext } from '../../../../contexts/editorContext';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { clearOriginalAction, setOriginalAction, switchRandomizeAction, updateModifiedAction } from "../../../../modules/editor";
import { updateDangoAction, addDangoAction, removeDangoAction, deselectDangoAction, selectDangoAction } from "../../../../modules/viewer";
import { Dango as DangoType } from '../../../../types/Dango';

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

// TODO: React.ChangeEventはhooksから外す
export const useDangodaikazokuState = () => {
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
  const editorChangeHandlers = {
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

  const editorClickHandlers = {
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

  // Viewer
  const viewerDangos = useMemo(() => viewer.dangos.map((dango) => ({
    ...dango,
    isSelected: viewer.selectedId === dango.id
  })), [viewer.dangos, viewer.selectedId])
  // TODO: ClickHandlerの中身を分ける。selectedIdの変更で全てのだんごがレンダリングし直されてしまうため
  const viewerClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const clickedId = e.currentTarget.dataset['id'] as string
    if (viewer && viewer.selectedId !== clickedId) {
      viewerDispatch(selectDangoAction(clickedId))
    } else {
      viewerDispatch(deselectDangoAction())
    }
  }, [viewer.selectedId])

  // Button
  const buttonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    viewerDispatch(addDangoAction())
  }

  return [{
    editorForm: {
      ...editor.modified,
      randomize: editor.randomize
    },
    viewerDangos,
    editorTarget: editor.original
  }, {
    editorChangeHandlers,
    editorClickHandlers,
    viewerClickHandler,
    buttonClickHandler
  }]
}