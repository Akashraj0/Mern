/* eslint-disable */
import { useState } from "react";
import axios from "axios";
const Answer = ({ item, index }) => {
  const [comment, setComment] = useState("");
  const [expandComment, setExpandComment] = useState(null);

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
        <div>
          <div>
            {expandComment === index ? (
              <>
                {item?.answers?.map((el, j) => (
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
                        item?.answers[0]?.user.name
                      } | Date Posted: ${new Date(
                        item?.answers[0]?.date
                      ).toDateString()}`}
                    </div>
                    <div className="comment-content" style={{ color: "black" }}>
                      <p>{item?.answers[0]?.answer}</p>
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

export default Answer;
