import Dango from "../molecules/Dango";

const DangoEditor = () => {
  const dangoProps = {
    width: 720,
    height: 514,
    fill: '#aaC8B3',
  }
  return (<Dango {...dangoProps} />)
}

export default DangoEditor;