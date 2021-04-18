import SelectableDango from "../../molecules/SelectableDango/SelectableDango";
import styles from './Viewer.module.css'
import { Dango as DangoType } from '../../../types/Dango';

const DangoDaikazokuViewer = ({ dangos, clickHandler }: {
  dangos: (DangoType & {
    isSelected: boolean
  })[],
  clickHandler: (e: React.MouseEvent<HTMLDivElement>) => void
}) => {
  return (
    <div className={styles.root}>
      {dangos.map((props) => {
        const size = Math.floor(props.width / 72);
        return (
          <div className={styles[`_item--${size}`]} key={props.id} >
            <SelectableDango {...props} isSelected={props.isSelected} onClick={clickHandler} />
          </div>
        )
      })}
    </div>)
}

export default DangoDaikazokuViewer;