import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [timeDifference, setTimeDifference] = useState("");

  useEffect(() => {
    const createdDate = new Date(post.created_at);
    const currentDate = new Date();
    const diff = (currentDate - createdDate) / (1000 * 60 * 60);

    if (parseInt(diff) > 24) {
      const date = createdDate.getDate();
      const month = createdDate.getMonth();
      const year = createdDate.getFullYear();
      const fullDate = date + "/" + month + "/" + year;
      setTimeDifference(fullDate);
    } else {
      if(parseInt(diff) === 0) {
       const minute = (currentDate - createdDate) / (1000 * 60);
       setTimeDifference(parseInt(minute) + "mins ago");
      } else {
        setTimeDifference(parseInt(diff) + "hrs ago");
      }
    }

  }, []);

  const likeHandler = () => {
    setIsLiked(!isLiked);
    setLike(isLiked ? like - 1 : like + 1);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={post.author.profile_photo}
              alt=""
            />
            <span className="postUsername">{post.author.name}</span>
            <span className="postDate">{timeDifference}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.content}</span>
          <img className="postImg" src={post.photo_url} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/assets/like.png"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src="/assets/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCount">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
