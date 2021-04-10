import { selectDangoAction, reducer } from '../dangoDaikazoku';


describe('dangoDaikazoku reducer', () => {
  it('selectDangoAction: 選択しただんごのidが保持できる', () => {
    const id = 'dummy_id';
    const action = selectDangoAction(id);
    const result = reducer({ dangos: [], selectedId: null }, action);
    expect(result).toEqual({ dangos: [], selectedId: id })
  })
})