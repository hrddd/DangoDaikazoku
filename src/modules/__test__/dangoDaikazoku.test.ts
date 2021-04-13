import { selectDangoAction, reducer, deselectDangoAction, updateDangoAction, addDangoAction, removeDangoAction } from '../dangoDaikazoku';

const dummyDango = (id: string) => ({
  id,
  width: 72,
  height: 52,
  fill: '#aaC8B3',
  stroke: '#5D3F35',
  strokeWidth: 8
})

describe('Actions', () => {
  it('selectDangoAction: 選択しただんごのidが保持できる', () => {
    const id = 'id';
    const action = selectDangoAction(id);
    const result = reducer({ dangos: [], selectedId: null }, action);
    expect(result.selectedId).toBe(id)
  })
  it('deselectDangoAction: 選択しただんごのidを解除できる', () => {
    const action = deselectDangoAction();
    const result = reducer({ dangos: [], selectedId: 'some_id' }, action);
    expect(result.selectedId).toBe(null)
  })
  it('updateDangoAction: 各だんごのパラメータをアップデートできる', () => {
    const action = updateDangoAction({
      ...dummyDango('id2'), width: 144
    });
    const result = reducer({
      dangos: [
        dummyDango('id'),
        dummyDango('id2'),
        dummyDango('id3')
      ], selectedId: null
    }, action);
    expect(result.dangos).toEqual([
      dummyDango('id'),
      { ...dummyDango('id2'), width: 144 },
      dummyDango('id3')
    ])
  })
  it('updateDangoAction: 一個の時でもだんごのパラメータをアップデートできる', () => {
    const action = updateDangoAction({
      ...dummyDango('id2'), width: 144
    });
    const result = reducer({
      dangos: [
        dummyDango('id2')
      ], selectedId: null
    }, action);
    expect(result.dangos).toEqual([
      { ...dummyDango('id2'), width: 144 },
    ])
  })
  it('addDangoAction: だんごを追加できる', () => {
    const action = addDangoAction();
    const result = reducer({
      dangos: [
        dummyDango('id')
      ], selectedId: null
    }, action);
    expect(result.dangos.length).toBe(2)
  })
  it('addDangoAction: だんごのパラメータをコピーした上で追加できる', () => {
    const action = addDangoAction({
      width: 999,
      height: 999,
      fill: '#ffffff',
      stroke: '#ffffff',
      strokeWidth: 999
    });
    const result = reducer({
      dangos: [
        dummyDango('id')
      ], selectedId: null
    }, action);
    const { id, ...copiedDangoParams } = result.dangos[1];
    expect(copiedDangoParams).toEqual({
      width: 999,
      height: 999,
      fill: '#ffffff',
      stroke: '#ffffff',
      strokeWidth: 999
    })
  })
  it('removeDangoAction: だんごを削除できる', () => {
    const action = removeDangoAction('id2');
    const result = reducer({
      dangos: [
        dummyDango('id'),
        dummyDango('id2'),
        dummyDango('id3')
      ], selectedId: null
    }, action);
    expect(result.dangos).toEqual([
      dummyDango('id'),
      dummyDango('id3')
    ])
  })
})