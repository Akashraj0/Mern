import { useState } from "react";
import PostCard from "../PostCard";
import PropTypes from "prop-types";
import Comment from "./Comment";
const UserPost = (data) => {
  // data={data.data}
  const [expandedPostIndex, setExpandedPostIndex] = useState(null);
  const togglePostExpansion = (index) => {
    if (index === expandedPostIndex) {
      setExpandedPostIndex(null);
    } else {
      setExpandedPostIndex(index);
    }
  };
  return (
    <div>
      <div>
        {Array.isArray(data?.data) ? (
          data?.data?.map((item, i) => (
            <div key={i} className="post-grid">
              <div className="post-title" style={{ color: "black" }}>
                {item.title}
              </div>
              <div className="post-meta">
                {`Author: ${item.user.name} | Date Posted: ${new Date(
                  item.date
                ).toDateString()}`}
              </div>
              <div className="post-content">
                <p
                  onClick={() => togglePostExpansion(i)}
                  className={expandedPostIndex === i ? "expanded" : ""}
                >
                  {expandedPostIndex === i
                    ? item.post
                    : item.post.length > 50
                    ? `${item.post.substring(0, 50)} (read more...)`
                    : item.post}
                </p>
                <img
                  className="post-image"
                  src={item.image}
                  alt="Image Description"
                />
              </div>
              <Comment item={item} index={i} />
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

PostCard.propTypes = {
  data: PropTypes.array.isRequired,
  user: PropTypes.array.isRequired,
};

export default UserPost;
