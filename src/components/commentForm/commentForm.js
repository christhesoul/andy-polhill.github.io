import PropTypes from "prop-types";
import React, { useState } from "react";
import Alert from "../alert/alert";

import * as styles from "./commentForm.module.css";

export default function CommentForm({ discussionId, addComment }) {

  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://europe-west2-andypolhill.cloudfunctions.net/receive_comment", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body,
          discussionId,
          author,
          url
        }) 
      });

      const json = await response.json();

      if(!response.ok) {
        throw json.message;
      }

      setBody("");
      setAuthor("");
      setUrl("");
      addComment({body, author, url, pending: true});
    } catch(error) {
      setError(error);
    }
  }

  return (
    <form onSubmit={ handleSubmit } className={ styles.commentForm }>
      <label className={ styles.commentForm__label }>
        Name
        <input
            type="text"
            value={ author }
            className={ styles.commentForm__input }
            onChange={e => setAuthor(e.target.value)}
            size={ 40 }
            maxLength={ 50 }
          />
      </label>
      <label className={ styles.commentForm__label }>
        Link (optional)
        <input
            type="text"
            value={ url }
            className={ styles.commentForm__input }
            onChange={e => setUrl(e.target.value)}
            placeholder="https://"
            size={ 40 }
            maxLength={ 50 }
          />
      </label>
      <label className={ styles.commentForm__label }>
        Body
        <textarea
          value={ body }
          className={ styles.commentForm__textarea }
          onChange={e => setBody(e.target.value)}
          maxLength={ 500 }
        />
      </label>

      { error && (
        <Alert>{ error }</Alert>
      )}

      <button>Post comment</button>

    </form>
  )
}

CommentForm.propTypes = {
  discussionId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
}
