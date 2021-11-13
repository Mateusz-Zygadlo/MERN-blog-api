export const Comment = ({ authorEmail, description }) => {
  return(
    <div className="my-3">
      <h2 className="text-2xl">{authorEmail}</h2>
      <p>{description}</p>
    </div>
  )
}