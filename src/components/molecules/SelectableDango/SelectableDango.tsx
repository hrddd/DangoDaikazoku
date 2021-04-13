import { Dango as DangoType } from '../../../types/Dango';
import PopDango from '../PopDango/PopDango';
import styles from './SelectableDango.module.css'

type SelectableDangoProps = DangoType & {
  isSelected: boolean
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const SelectableDango = (props: SelectableDangoProps) => {
  const { isSelected, onClick, id, ...dangoProps } = props;
  const className = isSelected ? `${styles['selectableDango--isSelected']}` : styles.selectableDango;
  return (
    // TODO: waiarea
    <div onClick={onClick} role="button" className={className} data-id={id}>
      <PopDango {...dangoProps} />
    </div>)
}

export default SelectableDango;