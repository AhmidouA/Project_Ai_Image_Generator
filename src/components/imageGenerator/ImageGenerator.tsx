/*  REACT & NPM */
import { useRef, useState } from 'react'
import { Box } from '@mui/material'
import axios from 'axios';

/*  Component */
import default_image from '@/assets/Ia-Image.jpg'

 

/*  Css */
import './ImageGenerator.css';



const ImageGenerator = () => {

    const [image_url, setImage_url] = useState<string>('/');
    const [loading, setLoading] = useState(false);
    
    const inputRef = useRef<HTMLInputElement | null>(null);

    const imageGenerator = async () =>  {
        if(inputRef.current.value === '') {
            console.log("inputRef.current.value", inputRef.current.value)
            return alert('Enter What you want See with AI');
           
        } 

        console.log("inputRef.current.value", inputRef.current.value)

        setLoading(true);
       
    

            
        const response = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
                prompt: `${inputRef.current.value}`,
                n: 0,
                size: "512x512",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer YOURKEY', // Your API KEY OPENAI
                },
            }
        );
        
        try {
            const data = response.data;
            console.log('data', data);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            // Gérez les erreurs ici
            setLoading(false);
        }
    }
        // const data_array = data.data;
        // setImage_url(data_array[0].url);


  return (
    <Box 
        className='ai-image-generator' 
        display='flex' 
        flexDirection='column'
        justifyContent='center'
        alignItems='center' 
        paddingTop='3.5rem' 
        gap='2.8rem'
    >
        <Box className='header' fontSize='4.5rem' fontWeight='500'  alignItems='center' >  
            AI Image <span>Generator</span>
        </Box>
        <Box className='img-loading' display='flex' flexDirection='column' >
            <Box className='image'>
                <img src={image_url === '/' ? default_image : image_url} alt='default image' 
                style={{ minWidth: '10rem', maxWidth: '35rem' }} />
            </Box>
            <Box className='loading'>
                <Box className={loading ? "loading-bar-full" : "" } width='0rem' height='0.5rem' bgcolor='#7611a6'></Box>
                <Box className={loading ? "loading-text" : "display-none" }  fontSize='1.1rem'>Loading....</Box>
            </Box>
        </Box>
        <Box className='search-box'
            width='50rem' 
            height='5rem'
            display='flex'
            justifyContent='space-around'
            alignItems='center'
            borderRadius='50px'
            bgcolor='#1F3540'
        >
                <input type='text' ref={inputRef} className='search-input' placeholder='Describe What you want See...'/>
                <Box className='generate-btn'
                    onClick={() => imageGenerator()} 
                    display='flex' 
                    alignItems='center'
                    justifyContent='center'
                    width='18.75rem'
                    height='5rem'
                    fontSize='1.5rem'
                    borderRadius='50px'
                    bgcolor='#7611a6'
                    
                >
                    Generate
                </Box>
        </Box>
    </Box>
  )
}


export default ImageGenerator