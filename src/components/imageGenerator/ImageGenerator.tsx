/*  REACT & NPM */
import { useRef, useState } from "react";
import { Box } from "@mui/material";
import OpenAI from "openai";

/*  Component */
import default_image from "@/assets/Ai-Image.jpg";

/*  Css */
import "./ImageGenerator.css";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true,
});

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState<string>("/");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  async function fetechData() {
    if (inputRef.current?.value === "") {
      console.log("inputRef.current.value", inputRef.current.value);
      return alert("Enter What you want See with AI");
    }
    setLoading(true);

    try {
      const response = await openai.images.generate({
        prompt: `${inputRef.current?.value}`,
        n: 1,
        size: "512x512",
      });

      // console.log('response', response);
      const imgFetch = response.data[0].url;
      setImage_url(imgFetch!);

      setLoading(false);
    } catch (error) {
      console.log("${inputRef.current.value}", inputRef.current?.value);
      console.error("Error:", error);
      setLoading(false);
    }
  }

  return (
    <Box
      className="ai-image-generator"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      paddingTop="3.5rem"
      gap="2.8rem"
    >
      <Box
        className="header"
        fontSize="4.5rem"
        fontWeight="500"
        alignItems="center"
      >
        AI Image <span>Generator</span>
      </Box>
      <Box className="img-loading" display="flex" flexDirection="column">
        <Box className="image">
          <img
            src={image_url === "/" ? default_image : image_url}
            alt="default image"
            style={{ minWidth: "10rem", maxWidth: "35rem" }}
          />
        </Box>
        <Box className="loading">
          <Box
            className={loading ? "loading-bar-full" : ""}
            width="0rem"
            height="0.5rem"
            bgcolor="#7611a6"
          ></Box>
          <Box
            className={loading ? "loading-text" : "display-none"}
            fontSize="1.1rem"
          >
            Loading....
          </Box>
        </Box>
      </Box>
      <Box
        className="search-box"
        width="50rem"
        height="5rem"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        borderRadius="50px"
        bgcolor="#1F3540"
      >
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe What you want See..."
        />
        <Box
          className="generate-btn"
          onClick={() => fetechData()}
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="18.75rem"
          height="5rem"
          fontSize="1.5rem"
          borderRadius="50px"
          bgcolor="#7611a6"
        >
          Generate
        </Box>
      </Box>
    </Box>
  );
};

export default ImageGenerator;
