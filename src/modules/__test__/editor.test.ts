import { reducer, setOriginalAction, clearOriginalAction, updateModifiedAction, switchRandomizeAction } from '../editor';

const dummyDango = (id: string) => ({
  id,
  width: 72,
  height: 52,
  fill: '#aaC8B3',
  stroke: '#5D3F35',
  strokeWidth: 8
})

describe('Actions', () => {
  it('setOriginalAction: 選択しただんごの情報が保持できる', () => {
    const original = dummyDango('dummy');
    const action = setOriginalAction(original);
    const result = reducer({
      original: null,
      modified: null,
      randomize: true
    }, action);
    expect(result.original).toEqual(original)
  })
  it('clearOriginalAction: 選択しただんごの情報をクリアできる', () => {
    const original = dummyDango('dummy');
    const { id, ...modified } = original;
    const action = clearOriginalAction();
    const result = reducer({
      original,
      modified,
      randomize: true
    }, action);
    expect(result.original).toEqual(null)
    expect(result.modified).toEqual(null)
  })
  it('updateModifiedAction: 選択しただんごの情報を編集できる', () => {
    const original = dummyDango('dummy');
    const { id, ...modified } = original;
    const action = updateModifiedAction({
      width: 1111
    });
    const result = reducer({
      original,
      modified,
      randomize: true
    }, action);
    expect(result.modified?.width).toBe(1111)
  })
  it('switchRandomizeAction: ランダム状態を切り替えられる', () => {
    const action = switchRandomizeAction(false);
    const result = reducer({
      original: null,
      modified: null,
      randomize: true
    }, action);
    expect(result.randomize).toBe(false)
  })
})