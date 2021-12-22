import React, { Fragment } from "react";
import PropTypes from "prop-types";

import * as styles from "./comments.module.css";

const Comment = ({ author, body, date, pending, url }) => {
  return (
    <li role="comment" data-author={ author } className={ styles.comment }>
      <h4 className={ styles.comment__title }>
        { pending && <span alt="Pending">⏱</span>}
        { url && (
          <Fragment>
            <a href={ url }>{ author }</a>
            <small className={ styles.comment__date }>{ date }</small>
          </Fragment>            
        )}
        { !url && (
          <Fragment>
            { author }
            <small className={ styles.comment__date }>{ date }</small>
          </Fragment>
        )}
      </h4>
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