import Viewer from './Viewer';
import Editor from './Editor';
import React, { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ViewerContext, ViewerUpdateContext } from '../../../contexts/viewerContext';
import { selectDangoAction, deselectDangoAction, addDangoAction, removeDangoAction, updateDangoAction } from '../../../modules/viewer';
import { Dango as DangoType } from '../../../types/Dango';
import Button from '../../atoms/Button';

type DangoChangeableParameters = Omit<DangoType, 'id'>
const dafaultState: DangoChangeableParameters = {
  width: 72,
  height: 52,
  fill: '#aaC8B3',
  stroke: '#5D3F35',
  strokeWidth: 8
}

const DangoDaikazoku = () => {
  // TODO: customhookに退避
  const viewer = useContext(ViewerContext)
  const dispatch = useContext(ViewerUpdateContext)

  // TODO: editor用のcontextを形成
  // {
  //   dango: {},
  //   inputs: {
  //     randomize: true
  //   }
  // }
  const [editorState, setEditorState] = useState({
    original: undefined as undefined | DangoType,
    inputs: {
      width: 72,
      height: 52,
      fill: '#aaC8B3',
      stroke: '#5D3F35',
      strokeWidth: 8,
      randomize: true
    }
  });
  const selectEditingDangoProps = useCallback(() => ({
    editingDango: {
      width: editorState.inputs.width,
      height: editorState.inputs.height,
      fill: editorState.inputs.fill,
      stroke: editorState.inputs.stroke,
      strokeWidth: editorState.inputs.strokeWidth,
    }
  }), [editorState.inputs])

  useEffect(() => {
    console.log(editorState)
    setEditorState({
      ...editorState,
      original: viewer?.dangos.find(({ id }) => id === viewer.selectedId),
    })
  }, [viewer?.selectedId])

  // Editor
  const randomizeProps = {
    id: 'randomize',
    labelText: 'パラメータを適当に',
    name: 'randomize',
    checked: editorState.inputs.randomize,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setEditorState({
        ...editorState,
        inputs: {
          ...editorState.inputs,
          randomize: e.currentTarget.checked,
        }
      })
    }
  }
  const widthRangeProps = {
    id: 'width',
    labelText: 'width',
    name: 'width',
    min: 72,
    max: 720,
    value: editorState.inputs.width,
    disabled: editorState.inputs.randomize,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const width = Number(e.currentTarget.value);
      setEditorState({
        ...editorState,
        inputs: {
          ...editorState.inputs,
          width,
          height: Math.ceil(width * dafaultState.height / dafaultState.width)
        }
      })
    }
  }
  const heightRangeProps = {
    id: 'height',
    labelText: 'height',
    name: 'height',
    min: 52,
    max: 520,
    value: editorState.inputs.height,
    disabled: editorState.inputs.randomize,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const height = Number(e.currentTarget.value);
      setEditorState({
        ...editorState,
        inputs: {
          ...editorState.inputs,
          width: Math.ceil(height * dafaultState.width / dafaultState.height),
          height
        }
      })
    }
  }
  const fillProps = {
    id: 'fill',
    labelText: 'fill',
    name: 'fill',
    value: editorState.inputs.fill,
    disabled: editorState.inputs.randomize,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setEditorState({
        ...editorState,
        inputs: {
          ...editorState.inputs,
          fill: e.currentTarget.value,
        }
      })
    }
  }
  const strokeProps = {
    id: 'stroke',
    labelText: 'stroke',
    name: 'stroke',
    value: editorState.inputs.stroke,
    disabled: editorState.inputs.randomize,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setEditorState({
        ...editorState,
        inputs: {
          ...editorState.inputs,
          stroke: e.currentTarget.value,
        }
      })
    }
  }
  const strokeWidthProps = {
    id: 'strokeWidth',
    labelText: 'strokeWidth',
    name: 'strokeWidth',
    min: 1,
    max: 16,
    value: editorState.inputs.strokeWidth,
    disabled: editorState.inputs.randomize,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setEditorState({
        ...editorState,
        inputs: {
          ...editorState.inputs,
          strokeWidth: Number(e.currentTarget.value),
        }
      })
    }
  }
  const randomHexColorFactory = () => {
    const hex = (number: number) => number.toString(16)
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += hex(Math.trunc(15.9 * Math.random()))
    }
    return color
  }
  const randomizeDangoParamFactory = (): DangoChangeableParameters => {
    const width = 72 + Math.ceil(360 * Math.random());
    return {
      width,
      height: Math.ceil(width * dafaultState.height / dafaultState.width),
      fill: randomHexColorFactory(),
      stroke: randomHexColorFactory(),
      strokeWidth: Math.ceil(8 * Math.random())
    }
  }

  const applyProps = {
    labelText: '変更を反映する',
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editorState.original) return void (0);
      dispatch(updateDangoAction(editorState.inputs.randomize ? {
        ...editorState.original,
        ...randomizeDangoParamFactory()
      } : {
          ...editorState.original,
          ...editorState.inputs
        }))
    }
  }

  const copyProps = {
    labelText: 'だんごをコピーする',
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editorState.original) return void (0);
      const { id, ...copiedParams } = editorState.original;
      dispatch(addDangoAction(editorState.inputs.randomize ? randomizeDangoParamFactory() : copiedParams))
    }
  }

  const removeProps = {
    labelText: 'だんごを削除する',
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!editorState.original) return void (0);
      const { id } = editorState.original;
      dispatch(removeDangoAction(id))
    }
  }

  const addProps = {
    labelText: 'だんごを追加する',
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(addDangoAction())
    }
  }

  // Viewer
  const dangos = useMemo(() => {
    return viewer?.dangos.map((dango) => ({
      ...dango,
      isSelected: viewer.selectedId === dango.id
    }))
  }, [viewer])
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickedId = e.currentTarget.dataset['id'] as string
    if (viewer && viewer.selectedId !== clickedId) {
      dispatch(selectDangoAction(clickedId))
    } else {
      dispatch(deselectDangoAction())
    }
  }

  const inputProps = {
    randomize: randomizeProps,
    widthRange: widthRangeProps,
    heightRange: heightRangeProps,
    fill: fillProps,
    stroke: strokeProps,
    strokeWidth: strokeWidthProps,
    apply: applyProps,
    copy: copyProps,
    remove: removeProps,
  }
  return (
    <>
      { editorState.original ? (
        <Editor
          dango={selectEditingDangoProps().editingDango} inputProps={inputProps} />
      ) : (<Button {...addProps} />)}
      { dangos ? (
        <Viewer dangos={dangos} clickHandler={clickHandler} />
      ) : ''}
    </>)
}



export default DangoDaikazoku;