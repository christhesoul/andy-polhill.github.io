/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const axios = require("axios") // got doesn't work

const owner = process.env.GITHUB_OWNER
const repo = process.env.GITHUB_REPO
const token = process.env.GITHUB_ACCESS_TOKEN;
const workflow_id = process.env.GITHUB_WORKFLOW_ID;
const ref = process.env.GITHUB_BRANCH;

const github_actions_hook = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`;
 
exports.receive_message = function(req, res) {
   
  res.set('Access-Control-Allow-Origin', `*`)
  res.set('Access-Control-Allow-Methods', 'POST')
    
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.set('Access-Control-Max-Age', '3600')
    return res.status(204).send('')
  }
   
  if (req.method === 'POST') {
    const { body, author, discussionId, url } = req.body

    if(!discussionId) {
      return res.status(422).send({
        discussionId: "missing discussionId"
      })
    }

    if(!author) {
      return res.status(422).send({
        message: "Please provide your name"
      })
    }

    if(author.length < 2) {
      console.error(`Author too short: ${author}`)
      return res.status(422).send({
        message: "Please provide your name"
      })
    }

    if(author.length > 50) {
      console.error(`Author too long: ${author}`)
      return res.status(422).send({
        message: "Please use less than 50 characters for your name"
      })
    }

    // if(url) {
    //   try {
    //     new URL(url);
    //   } catch {
    //     console.error(`Invalid url: ${url}`)
    //     return res.status(422).send({
    //       message: "Please provide a valid url or leave the field blank"
    //     })
    //   }
    // }


    if(!body) {
      return res.status(422).send({
        message: "Please add some text in the comment field"
      })
    }

    if(body.length < 5) {
      console.error(`Body short: ${author}`)
      return res.status(422).send({
        message: "Please give a bit more detail in your comment"
      })
    }

    if(body.length > 500) {
      console.error(`Body long: ${author}`)
      return res.status(422).send({
        message: "Please keep your comment to less than 500 characters"
      })
    }

    if(body.length < 2) {
      return res.status(422).send({
        message: "Please provide a comment"
      })
    }

    console.log(`discussionId ${discussionId}`);

    return axios.post(github_actions_hook,
      {
        ref,
        inputs : {
          body,
          discussionId,
          author,
          url
        }
      }, {
        headers: {
          "Authorization": `token ${ token }`
        }
      }
    ).then(() => {
      console.log('action success');
      return res.status(200).send({body: "sent"});
    }).catch(error => {
      console.log(error.response)
      return res.status(error.response.status).send({
        ...error.response.data
      })
    })
  }
}
