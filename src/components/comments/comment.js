import React, { Fragment } from "react";
import PropTypes from "prop-types";

import * as styles from "./comments.module.css";
import Author from "../author/author";

const Comment = ({ author, body, date, pending, url }) => {
  return (
    <li role="comment" data-author={ author } className={ styles.comment }>
      <Author
        date={ date }
        author={ author }
        url={ url }
        pending={ pending } />
      <p>{ body }</p>
    </li>
  )
}

Comment.propTypes = {
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string, /*.isRequired,*/
  url: PropTypes.string,
  pending: PropTypes.bool,
};


export default Comment;