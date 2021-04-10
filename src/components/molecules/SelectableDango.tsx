// TODO: テスト
// height操作でstateが変更される
// width操作でstateが変更される

import Dango from "./Dango";
import { Dango as DangoType } from '../../types/Dango';

type SelectableDangoProps = DangoType & {
  isSelected: boolean
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const SelectableDango = (props: SelectableDangoProps) => {
  const { isSelected, onClick, id, ...dangoProps } = props;
  const opacity = isSelected ? 0.5 : 1;
  return (
    // TODO: waiarea
    <div onClick={onClick} role="button" style={{ opacity: opacity }} data-id={id}>
      <Dango {...dangoProps} key={id} />
    </div>)
}

export default SelectableDango;