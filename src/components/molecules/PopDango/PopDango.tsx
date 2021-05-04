import Dango from "../../atoms/Dango";
import { Dango as DangoType } from '../../../types/Dango';
import styles from './PopDango.module.css'

export type PopDangoProps = Omit<DangoType, 'id'>;

const PopDango = (props: PopDangoProps) => {
  return (
    <div className={styles.root}>
      <Dango {...props} />
    </div>)
}

export default PopDango;