import React, { useEffect, useState } from "react";
import CommentForm from "./commentForm";
import {
  filterCommentParent,
  getListComment,
  addListComment,
  deleteListComment,
} from "../../feature/commentSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./comment";

export default function Comments() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeComment, setActiveComment] = useState(null);
  const commentList = useSelector((state) => state.listComment);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getListComment());
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      commentList.doneGet && dispatch(filterCommentParent(params.id));
    }, 1000);
  }, [commentList.doneGet === true]);

  const getReplies = (commentId) =>
    Object.keys(commentList.data)
      .filter((i) => commentList.data[i].parentId == commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    const data = {
      body: text,
      userName: localStorage.getItem("name"),
      userId: localStorage.getItem("id"),
      parentId: parentId,
      mal_id: params.id,
      createdAt: new Date().toISOString(),
    };
    dispatch(addListComment(data));
    setActiveComment(null);
  };
  const deleteComment = (id) => {
    dispatch(deleteListComment(id));
    setActiveComment(null);
  };
  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {commentList.dataFilter &&
          commentList.doneGet &&
          commentList.dataFilter.map((commentParent) => (
            <Comment
              key={commentParent}
              commentId={commentParent}
              comment={commentList.data[commentParent]}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              replies={getReplies(commentParent)}
              parentId={null}
              currentUserId={localStorage.getItem("id")}
              addComment={addComment}
              deleteComment={deleteComment}
            />
          ))}
      </div>
    </div>
  );
}
