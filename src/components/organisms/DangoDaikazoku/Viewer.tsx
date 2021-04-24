import SelectableDango from "../../molecules/SelectableDango/SelectableDango";
import styles from './Viewer.module.css'
import { Dango as DangoType } from '../../../types/Dango';
import React from "react";

type ViewerItemProps = DangoType & {
  isSelected: boolean
  clickHandler: (e: React.MouseEvent<HTMLDivElement>) => void
}

const ViewerItem = React.memo(({
  id,
  width,
  height,
  fill,
  stroke,
  strokeWidth,
  isSelected,
  clickHandler
}: ViewerItemProps) => {
  const size = Math.floor(width / 72);
  return (
    <div className={styles[`_item--${size}`]} >
      <SelectableDango
        id={id}
        width={width}
        height={height}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        isSelected={isSelected}
        onClick={clickHandler} />
    </div>
  )
})

const Viewer = ({ dangos, clickHandler }: {
  dangos: (DangoType & {
    isSelected: boolean
  })[],
  clickHandler: (e: React.MouseEvent<HTMLDivElement>) => void
}) => {
  return (
    <div className={styles.root}>
      {dangos.map((dango) => (<ViewerItem
        {...dango}
        clickHandler={clickHandler}
        key={dango.id}
      />))}
    </div>)
}

export default Viewer;