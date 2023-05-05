import React from "react";
import icon from "../../../assets/img/user-icon.png";
import { useSelector } from "react-redux";
import CommentForm from "./commentForm";

export default function Comment({
  comment,
  commentId,
  replies,
  setActiveComment,
  activeComment,
  parentId,
  currentUserId,
  addComment,
  deleteComment,
}) {
  const isReplying =
    activeComment &&
    activeComment.id === commentId &&
    activeComment.type === "replying";
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const commentList = useSelector((state) => state.listComment);
  const canReply = currentUserId;
  const replyId = parentId ? parentId : commentId;
  const canDelete = currentUserId == comment.userId && replies.length === 0;
  const getReplies = (commentId) =>
    Object.keys(commentList.data)
      .filter((i) => commentList.data[i].parentId == commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src={icon} />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.userName}</div>
          <div>{createdAt}</div>
        </div>
        <div className="comment-text">{comment.body}</div>
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: commentId, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(commentId)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            hasCancelButton
            handleCancel={() => {
              setActiveComment(null);
            }}
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={commentList.data[reply]}
                key={reply}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                replies={getReplies(reply)}
                commentId={reply}
                parentId={reply}
                currentUserId={localStorage.getItem("id")}
                addComment={addComment}
                deleteComment={deleteComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
