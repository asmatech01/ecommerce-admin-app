import React, { useState, useEffect } from "react";
import axios from "../../../helpers/axios";

const PrivacyPolicyPage = () => {
  const [privacyPolicyContent, setPrivacyPolicyContent] = useState("");

  useEffect(() => {
    axios
      .get("/conditions")
      .then((response) => {
        setPrivacyPolicyContent(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Privacy Policy</h1>
      <div dangerouslySetInnerHTML={{ __html: privacyPolicyContent }}></div>
    </div>
  );
};

export default PrivacyPolicyPage;
