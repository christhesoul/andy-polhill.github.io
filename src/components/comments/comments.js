import React, { useState } from "react";
import PropTypes from "prop-types";

import Comment from "./comment";
import CommentForm from "../commentForm/commentForm";

import * as styles from "./comments.module.css";

const Comments = ({ comments, discussionId }) => {

  const [commentState, setCommentState] = useState(comments);

  function addComment(comment) {
    setCommentState([ ...commentState, comment]);    
  }

  return (
    <section className={ styles.comments }>
      <h3>Comments</h3>
      <ul className={ styles.comments__list }>
        {commentState.map(({ author, body, date, pending, url }, index) => (
          <Comment
            author={ author }
            key={ index }
            body={ body }
            date={ date }
            pending={ pending }
            url={ url }
            />
        ))}
      </ul>

      <CommentForm
        addComment={ addComment }
        discussionId={ discussionId } />
    </section>
  )
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string.isRequired
    })
  )
}


export default Comments;