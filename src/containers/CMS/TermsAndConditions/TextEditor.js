// import React, { Component } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";
// import 'draft-js/dist/Draft.css'
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import draftToHtml from "draftjs-to-html";

// export default class TextEditor extends Component {
//   state = {
//     editorState: EditorState.createEmpty(),
//   };

//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };

//   render() {
//     const { editorState } = this.state;
//     console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
//     return (
//       <div>
//         <Editor
//           editorState={editorState}
//           toolbarClassName="toolbarClassName"
//           wrapperClassName="wrapperClassName"
//           editorClassName="editorClassName"
//           onEditorStateChange={this.onEditorStateChange}
//             editorStyle={{height: "400px", boxShadow: '2px 2px 3px 3px lightgrey'}}
//        />
//        <button type="submit">submit</button>
//        <br/>
//         <textarea
//           disabled
//           value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//         ></textarea>
//       </div>
//     );
//   }
// }




//////////////////////////



import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import axios from "../../../helpers/axios";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    const { content } = this.props;
    const editorState = content
      ? EditorState.createWithContent(ContentState.createFromText(content))
      : EditorState.createEmpty();

    this.state = {
      editorState: editorState,
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleSubmit = () => {
    const { editorState } = this.state;
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    // Backend ko post request ke sath data bhejna
    axios.put('/conditions', { content })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { editorState } = this.state;

    return (
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
          editorStyle={{ height: "400px", boxShadow: "2px 2px 3px 3px lightgrey" }}
        />
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
        <br />
        <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea>
      </div>
    );
  }
}

