import React, { useState,useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server"
import "./index.css"

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
    <div style="background-color:red;">
      <h1>Loren Ipsum</h1>
      <p> ${phoneIcon} +1 (911) 113-9126</p>
       <p> ${envelopeIcon} loren.ipsum@gmail.com</p>
      <p>${linkedinIcon} linkedin.com/in/lorenipsum</p>
      <p>${githubIcon}github.com/lorenipsum</p>
    </div>

    <div class="text-center">
      <h2>Career Summary so Far</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam lobortis facilisis sem. Nullam nec mi et neque
        pharetra sollicitudin. Praesent imperdiet mi nec ante. Donec ullamcorper, felis non sodales commodo, lectus velit
        ultrices augue, a dignissim nibh lectus placerat pede. Vivamus nunc nunc, molestie ut, ultricies vel, semper in, velit.
        Ut porttitor. Praesent in sapien. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis fringilla tristique
        neque. Sed interdum libero ut metus. Pellentesque placerat. Nam rutrum augue a leo. Morbi sed elit sit amet ante
        lobortis sollicitudin. Praesent blandit blandit mauris. Praesent lectus tellus, aliquet aliquam, luctus a, egestas a,
        turpis. Mauris lacinia lorem sit amet ipsum. Nunc quis urna dictum turpis accumsan semper.
      </p>
      <p>Jul 2001</p>
    </div>

    <div class="section" style="background-color:red;">
      <h2>Education</h2>
      <p>ABC college Jul 2001 – Jul 2001</p>
      <p>Loren ipsum degree, Loren ipsum</p>
    </div>

    <div class="section">
      <h2>Achievements</h2>
      <ul>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Ut purus elit, vestibulum ut, placerat ac, adipiscing vitae, felis.</li>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Ut purus elit, vestibulum ut, placerat ac, adipiscing vitae, felis.</li>
      </ul>
    </div>

    <div class="section">
      <h2>Experience</h2>
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
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(storedState))
        )
      : EditorState.createEmpty();
  };

  const [editorState, setEditorState] = useState(getInitialEditorState);

  useEffect(() => {
    // Save the editor state to local storage whenever it changes
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem("editorState", JSON.stringify(rawContentState));
  }, [editorState]);

  const onChange = (newEditorState) => {
    console.log("Editor State:", newEditorState);
    setEditorState(newEditorState);
  };

  const rawContentState = convertToRaw(editorState.getCurrentContent());
  console.log("Raw Content State:", rawContentState);

  return (
    <div>
      <Editor editorState={editorState} onChange={onChange} />
    </div>
  );
};

export default EditablePage;
