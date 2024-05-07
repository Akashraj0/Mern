import { useState, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import axios from "axios";
import "./index.css";
import CommentCard from "../CommentCard";

const initialState = {
  likes: 0,
  dislikes: 0,
  liked: false,
  disliked: false,
};

const likeFunction = async (postId) =>
  await axios.patch(`/sign/like/${postId}`, {});
const dislikeFunction = async (postId) =>
  await axios.patch(`/sign/dislike/${postId}`, {});
const likeFunctionD = async (postId) =>
  await axios.patch(`/sign/like/delete/${postId}`, {});
const dislikeFunctionD = async (postId) =>
  await axios.patch(`/sign/dislike/delete/${postId}`, {});

const reducer = (state, action) => {
  const { postId } = action;
  switch (action.type) {
    case "LIKE":
      if (state.likes == 1) {
        state.liked = true;
      }
      if (state.dislikes == 1) {
        state.disliked = true;
      }
      if (!state.liked && !state.disliked) {
        console.log("1");
        likeFunction(postId);
        return {
          ...state,
          likes: state.likes + 1,
          liked: true,
        };
      } else if (state.disliked && !state.liked) {
        likeFunction(postId);
        dislikeFunctionD(postId);
        return {
          ...state,
          likes: state.likes + 1,
          dislikes: state.dislikes - 1,
          liked: true,
          disliked: false,
        };
      } else if (state.liked && !state.disliked) {
        likeFunctionD(postId);
        return {
          ...state,
          likes: state.likes - 1,
          liked: false,
        };
      }
      break;
    case "DISLIKE":
      if (state.likes == 1) {
        state.liked = true;
      }
      if (state.dislikes == 1) {
        state.disliked = true;
      }
      if (!state.liked && !state.disliked) {
        dislikeFunctionD(postId);
        return {
          ...state,
          dislikes: state.dislikes + 1,
          disliked: true,
        };
      } else if (!state.liked && state.disliked) {
        dislikeFunctionD(postId);
        return {
          ...state,
          dislikes: state.dislikes - 1,
          disliked: false,
        };
      } else if (state.liked && !state.disliked) {
        dislikeFunction(postId);
        likeFunctionD(postId);
        return {
          ...state,
          dislikes: state.dislikes + 1,
          likes: state.likes - 1,
          liked: false,
          disliked: true,
        };
      }
      break;
    default:
      return state;
  }
};

const PostCard = ({ data }) => {
  const [expandedPostIndex, setExpandedPostIndex] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const togglePostExpansion = (index) => {
    if (index === expandedPostIndex) {
      setExpandedPostIndex(null);
    } else {
      setExpandedPostIndex(index);
    }
  };

  const { likes, dislikes, liked, disliked } = state;

  const handleLike = (item) => {
    const { _id } = item;
    dispatch({ type: "LIKE", postId: _id });
  };

  const handleDislike = (item) => {
    const { _id } = item;
    dispatch({ type: "DISLIKE", postId: _id });
  };

  return (
    <div>
      {Array.isArray(data) ? (
        data?.map((item, i) => (
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
            <div className="post--features">
              <button
                className={liked ? "liked" : ""}
                onClick={() => {
                  handleLike(item);
                }}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                Like ({item?.likes[0]?.like?.count})
              </button>
              <button
                className={disliked ? "disliked" : ""}
                onClick={() => {
                  handleDislike(item);
                }}
              >
                <FontAwesomeIcon icon={faThumbsDown} />
                Dislike ({item?.dislikes[0]?.dislike?.count})
              </button>
            </div>
            <CommentCard item={item} index={i} />
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

PostCard.propTypes = {
  data: PropTypes.array.isRequired,
  user: PropTypes.array.isRequired,
};

export default PostCard;
