import { Comment } from "./Comment";

export const Comments = ({ comments }) => {
  return(
    <div>
      <h1 className="text-4xl mt-5">Comments [{comments.comments.length}]</h1>
      {comments.comments.map((item) => (<Comment 
        key={item.description}
        authorEmail={item.authorEmail}
        description={item.description}
      />))}
    </div>
  )
}