/* eslint-disable */
import { useState } from "react";
import axios from "axios";
const CommentCard = ({ item, index }) => {
  const [comment, setComment] = useState("");
  const [expandComment, setExpandComment] = useState(null);

  const handleComment = async (event, id) => {
    event.preventDefault();
    const result = await axios.post(`/comments/${id}`, { comment });
    console.log(result.data);
    setComment("");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const handleExpandComment = (index) => {
    if (expandComment !== index) {
      setExpandComment(index);
    } else {
      setExpandComment(null);
    }
  };

  return (
    <div>
      <div className="commentbox">
        <h1>Comment</h1>
        <div className="comment-input">
          <form
            className="comment-form"
            onSubmit={(event) => {
              handleComment(event, item.id);
            }}
          >
            <input
              type="text"
              name="comment-text"
              placeholder="Write something..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        </div>
        <div>
          <div>
            {expandComment === index ? (
              <>
                {item?.comments?.map((el, j) => (
                  <>
                    <div key={j} className="comments">
                      <div className="comment">
                        <div className="comment-metadata">
                          {`Author: ${el.user.name} | Date Posted: ${new Date(
                            el.date
                          ).toDateString()}`}
                        </div>
                        <div
                          className="comment-content"
                          style={{ color: "black" }}
                        >
                          <p>{el.comment}</p>
                        </div>
                        <hr />
                      </div>
                    </div>
                  </>
                ))}
              </>
            ) : (
              <>
                <div className="comments">
                  <div className="comment">
                    <div className="comment-metadata">
                      {`Author: ${
                        item?.comments[0]?.user.name
                      } | Date Posted: ${new Date(
                        item?.comments[0]?.date
                      ).toDateString()}`}
                    </div>
                    <div className="comment-content" style={{ color: "black" }}>
                      <p>{item?.comments[0]?.comment}</p>
                    </div>
                    <hr />
                  </div>
                </div>
              </>
            )}
          </div>
          <button onClick={(i) => handleExpandComment(index)}>
            Show comments
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
