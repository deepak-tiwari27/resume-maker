import React, { useState, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import "./index.css";

import {
  Editor,
  EditorState,
  // ContentState,
  convertFromRaw,
  // convertFromHTML,
  convertToRaw,
} from "draft-js";
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

import "draft-js/dist/Draft.css";

const EditablePage = () => {
  const phoneIcon = renderToStaticMarkup(<FaPhone />);
  const envelopeIcon = renderToStaticMarkup(<FaEnvelope />);
  const linkedinIcon = renderToStaticMarkup(<FaLinkedin />);
  const githubIcon = renderToStaticMarkup(<FaGithub />);

  const initialContent = `
    <div >
    <h1 style="font-size:3em; text-align:center; margin-bottom:10px;"> Deepak Tiwari </h1>
    <div>
    <div style="display:flex; justify-content:center; gap:10px;">
    <span>${phoneIcon} </span>
    <p>+1 (911) 113-9126</p>
    <span>${envelopeIcon}</span>
     <p>loren.ipsum@gmail.com</p>
     </div>
     <div style="display:flex; justify-content:center; gap:10px;">
       <span> ${linkedinIcon}</span>
     <p>linkedin.com/in/lorenipsum</p>
  <span>${githubIcon} </span>
  <p>github.com/lorenipsum</p>
  </div>
</div>
 </div>
 <div style="margin=left:1em; margin-bottom:1%;">
      <h2 style="font-size:1.5em; display:flex; justify-content:start; margin-left:5px;"> 1. Career Summary so Far</h2>
      <div  style="font-size:1em;  margin-left:10px; display:flex; justify-content:space-between; gap:30px;">
      <p  style="max-width:70%; text-indent:0; margin-left:10px;">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam lobortis facilisis sem. Nullam nec mi et neque
        pharetra sollicitudin. Praesent imperdiet mi nec ante. Donec ullamcorper, felis non sodales commodo, lectus velit
        ultrices augue, a dignissim nibh lectus placerat pede. Vivamus nunc nunc, molestie ut, ultricies vel, semper in, velit.
        Ut porttitor. Praesent in sapien. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis fringilla tristique
        neque. Sed interdum libero ut metus. Pellentesque placerat. Nam rutrum augue a leo. Morbi sed elit sit amet ante
        lobortis sollicitudin. Praesent blandit blandit mauris. Praesent lectus tellus, aliquet aliquam, luctus a egestas a
        turpis. Mauris lacinia lorem sit amet ipsum. Nunc quis urna dictum turpis accumsan semper.
      </p>
      <p style="margin-right:10%">July 2001- jun 2005</p>
      </div>
    </div>

    <div  style="margin=left:1em; margin-bottom:1%;">
      <h2 style="font-size:1.5em; display:flex; justify-content:start; margin-left:10px;" > 2. Education</h2>
      <p>ABC college Jul 2001 – Jul 2001</p>
      <p>Loren ipsum degree, Loren ipsum</p>
    </div>

    <div style="margin=left:1em; margin-bottom:1%;" >
      <h2 style="font-size:1.5em; display:flex; justify-content:start; margin-left:10px;"> 3. Achievements</h2>
      <ul>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Ut purus elit, vestibulum ut, placerat ac, adipiscing vitae, felis.</li>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Ut purus elit, vestibulum ut, placerat ac, adipiscing vitae, felis.</li>
      </ul>
    </div>

    <div style="margin=left:1em; margin-bottom:1%;">
      <h2 style="font-size:1.5em; display:flex; justify-content:start; margin-left:10px;"> 4. Experience</h2>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nov 1005– Present</p>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
      <ul>
        <li>Ut purus elit, vestibulum ut, placerat ac, adipiscing vitae, felis.</li>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Curabitur dictum gravida mauris.</li>
        <li>Donec vehicula augue eu neque.</li>
      </ul>
    </div>
   
  `;

  // const initialContentState = ContentState.createFromBlockArray(
  //   convertFromHTML(initialContent)
  // );

  // const [editorState, setEditorState] = useState(
  //   EditorState.createWithContent(initialContentState)
  // );
  const getInitialEditorState = () => {
    const storedState = localStorage.getItem("editorState");
    return storedState
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(storedState)))
      : EditorState.createEmpty();
  };

  const [editorState, setEditorState] = useState(getInitialEditorState);

  useEffect(() => {
    // Save the editor state to local storage whenever it changes
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem("editorState", JSON.stringify(rawContentState));
  }, [editorState]);
  const onBlurHandler = (e) => {
    // Prevent default behavior
    e.preventDefault();

    // Check if the event source is the contentEditable div
    if (e.target.isContentEditable) {
      console.log("Updated HTML content:", e.target.innerHTML);
    }
  };

  const onChange = (newEditorState) => {
    console.log("Editor State:", newEditorState);
    setEditorState(newEditorState);
  };

  const rawContentState = convertToRaw(editorState.getCurrentContent());
  console.log("Raw Content State:", rawContentState);

  return (
    <div>
      {/* <div dangerouslySetInnerHTML={{ __html: initialContent }} /> */}
      {/* <div dangerouslySetInnerHTML={{ __html: initialContent }} /> */}
      <div
        contentEditable
        dangerouslySetInnerHTML={{ __html: initialContent }}
        onBlur={onBlurHandler}
      ></div>
      <Editor editorState={editorState} onChange={onChange} />
    </div>
  );
};

export default EditablePage;
