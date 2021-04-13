import { Dango as DangoType } from '../../types/Dango';
import PopDango from './PopDango/PopDango';

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
      <PopDango {...dangoProps} />
    </div>)
}

export default SelectableDango;