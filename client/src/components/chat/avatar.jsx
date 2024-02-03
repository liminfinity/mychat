
export default function Avatar({src, className}) {
  return (
    <img src={src} className={'avatar ' + (className || '')} alt="" />
  )
}
