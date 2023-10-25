// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import TextEditor from "./TextEditor";
// import { getTerms } from "../../../actions";

// const TermsAndConditions = () => {
//   const dispatch = useDispatch();
//   const  { content }  = useSelector((state) => state.terms);

//   useEffect(() => {
//     dispatch(getTerms());
//   }, [dispatch]);
//   console.log(content)

//   return (
//     <div>
//       <TextEditor content={content} />
//     </div>
//   );
// };

// export default TermsAndConditions;

import React, { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import { Container } from "react-bootstrap";
import Layout from "../../../components/Layout";
import Modal from "../../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import { getTerms } from "../../../actions";
import axios from "../../../helpers/axios";
import parse from "html-react-parser";
import he from "he"; // Import he library
const TermsAndConditions = () => {
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.terms);

  useEffect(() => {
    dispatch(getTerms());
  }, [dispatch]);


  return (
    <Layout sidebar>
      <Container>
        <div>
          {parse(content)}
        </div>
        <div className="editor">
          <TextEditor content={content} />
        </div>
      </Container>
    </Layout>
  );
};

export default TermsAndConditions;
