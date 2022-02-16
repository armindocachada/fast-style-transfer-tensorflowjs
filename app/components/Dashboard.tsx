import FastStyleTransferModel from './FastStyleTransferModel'
import AdditionalInfo from './AdditionalInfo'
import ImageSelector from './ImageSelector'
import CameraDisplay from './CameraDisplay';
import PhotoDisplay from './PhotoDisplay';

import React, { useEffect, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Button, Stack, Card, CardMedia, CardActions, Container, Grid, NativeSelect, InputLabel, FormControl, FormControlLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*function resizeImage(imageURL: string, targetCanvas: HTMLCanvasElement) {
    console.log("Target Canvas=" + targetCanvas);
    const inputImage = document.createElement("img");
    console.log("resizeImage called");
    // we want to wait for our image to load
    let result = inputImage.onload = () => {
        // calculates aspect ratio of image
        console.log("Called.....");
        console.log("Input image height=" + inputImage.height);
        console.log("Input image width=" + inputImage.width);

        let imageAspectRatio = inputImage.height / inputImage.width;
        targetCanvas.height = targetCanvas.width * imageAspectRatio;
        console.log("New targetCanvas.height:" + targetCanvas.height);
        //const imgSize = Math.min(inputImage.width, inputImage.height);
        // The following two lines yield a central based cropping.
        // They can both be amended to be 0, if you wish it to be
        // a left based cropped image.
        //const left = (inputImage.width - imgSize) / 2;
        //const top = (inputImage.height - imgSize) / 2;
        //var left = 0; // If you wish left based cropping instead.
        //var top = 0; // If you wish left based cropping instead.
        const ctx = targetCanvas.getContext("2d");
        console.log("targetCanvas.width:" + targetCanvas.width);
        console.log("targetCanvas.height:" + targetCanvas.height);
        ctx.drawImage(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, targetCanvas.width, targetCanvas.height);
        return targetCanvas;
    };
    inputImage.src = imageURL;
    return result;
}*/

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
    },
 
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardGrid: {
        alignItems: "center",
        justifyContent: "center"
    },
   
   

    
});

export enum CameraState {
    start,
    started,
    stop,
    stopped
}
export default function Dashboard({ }) {
    
    enum Mode {
        video,
        photo
    }
    const [state, setState] =
        useState<{  camera: CameraState, mode: string, styleImage: string, imageToStyle: string }>({
            camera: CameraState.stopped,
            mode: "camera",
            styleImage: "/images/The_Great_Wave_off_Kanagawa.jpg",
            imageToStyle: "/images/turtle.jpg",
        });

    const startCamera = () => {
        setState({
            ...state,
            "camera": CameraState.start,
        });

    }

    const stopCamera = () => {
        setState({
            ...state,
            "camera": CameraState.stop,
        });

    }
   
    const updateCameraStateCallback = (cameraState: CameraState) => {
        setState({
            ...state,
            camera: cameraState
        });
    }
    const updateStyleImageCallback = (styleImageUrl: string) => {
        //console.log("Updating image: " + styleImageElement);
         setState({
            ...state,
            styleImage: styleImageUrl,
        });
    }

    const updateImageToStyleCallback = (imageToStyle: string) => {
        //console.log("Updating image: " + styleImageElement);
        setState({
            ...state,
            imageToStyle: imageToStyle,
        });
    }

    const setModeTo = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setState({
            ...state,
            mode: event.target.value,
        });
        console.log("event.target.value:" + event.target.value);
    };

    const predefinedStylesList = [
        { url: "/images/The_Great_Wave_off_Kanagawa.jpg", name: "kanagawa_great_wave" },
        { url: "/images/Vassily_Kandinsky%2C_1913_-_Composition_7.jpg", name: "kandinsky_composition_7" },
        { url: "/images/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg", name: "hubble_pillars_of_creation" },
        { url: "/images/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg", name: "van_gogh_starry_night" },
        { url: "/images/JMW_Turner_-_Nantes_from_the_Ile_Feydeau.jpg", name: "turner_nantes" },
        { url: "/images/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg", name: "munch_scream" },
        { url: "/images/Les_Demoiselles_d%27Avignon.jpg", name: "picasso_demoiselles_avignon" },
        { url: "/images/Pablo_Picasso%2C_1911-12%2C_Violon_%28Violin%29%2C_oil_on_canvas%2C_Kr%C3%B6ller-M%C3%BCller_Museum%2C_Otterlo%2C_Netherlands.jpg", name: "picasso_violin" },
        { url: "/images/Pablo_Picasso%2C_1911%2C_Still_Life_with_a_Bottle_of_Rum%2C_oil_on_canvas%2C_61.3_x_50.5_cm%2C_Metropolitan_Museum_of_Art%2C_New_York.jpg", name: "picasso_bottle_of_rum" },
        { url: "/images/Large_bonfire.jpg", name: "fire" },
        { url: "/images/Derkovits_Gyula_Woman_head_1922.jpg", name: "derkovits_woman_head" },
        { url: "/images/Untitled_%28Still_life%29_%281913%29_-_Amadeo_Souza-Cardoso_%281887-1918%29_%2817385824283%29.jpg", name: "amadeo_style_life" },
        { url: "/images/Derkovits_Gyula_Talig%C3%A1s_1920.jpg", name: "derkovtis_talig" },
        { url: "/images/Amadeo_de_Souza-Cardoso%2C_1915_-_Landscape_with_black_figure.jpg", name: "amadeo_cardoso" }
    ];

    const predefinedImagesToStyle = [
        { url: "/images/turtle.jpg", name: "turtle.jpg" },
        
    ];
    const classes = useStyles();
    
    return (
        <>
            <FastStyleTransferModel>
                {doStyleTransfer => {
                   
                  return  <Container className={classes.cardGrid} key="container">
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }} key="dasboard">
                            <Grid item xs={12} sm={4} md={4} >
                                <Card className={classes.card}>

                                  <ImageSelector listKey="styleImages" list={predefinedStylesList} uploadImageLabel="Upload Style" setStateCallback={updateStyleImageCallback} />
                                  {
                                      state.mode == "photo" &&
                                      <ImageSelector listKey="imagesToStyle" list={predefinedImagesToStyle} uploadImageLabel="Upload Image" setStateCallback={updateImageToStyleCallback} />
                                  }

                                  <Grid container rowSpacing={1} alignItems="flex-start" justifyContent="space-evenly" p={2}>
                                        <Grid item xs={12} md={12} >
                                          <RadioGroup
                                              row
                                              aria-labelledby="demo-row-radio-buttons-group-label"
                                              name="row-radio-buttons-group" defaultValue="camera" onChange={setModeTo}>
                                              <FormControlLabel value="camera" control={<Radio />} label="Video"/>
                                              <FormControlLabel value="photo" control={<Radio />} label="Photos"  />
                                             
                                          </RadioGroup>
                                        </Grid>
                                       
 


                                     
                                      {
                                        state.mode == "camera" &&
                                          <Grid item xs={12} md={6}>
                                              {state.camera != CameraState.start && state.camera != CameraState.started &&
                                                  <Button variant="outlined" onClick={startCamera} >
                                                      Start Camera
                                                  </Button>
                                              }
                                              {(state.camera == CameraState.start || state.camera == CameraState.started) &&
                                                  <Button variant="outlined" onClick={stopCamera}>
                                                      Stop Camera
                                                  </Button>
                                              }
                                          </Grid>
                                      }
                                     
                                      <AdditionalInfo/>          

                                    </Grid>


                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={8} >
                              {
                                  state.mode == "camera" &&
                                  <CameraDisplay styleImageUrl={state.styleImage} updateCameraStateCallback={updateCameraStateCallback} cameraState={state.camera} doStyleTransferCallback={doStyleTransfer} />
                              }
                              {
                                  state.mode == "photo" &&
                                  <PhotoDisplay styleImageUrl={state.styleImage} imageToStyleUrl={state.imageToStyle} doStyleTransferCallback={doStyleTransfer} />
                              }

                            </Grid>
                        </Grid>
                    </Container>

                }
            }
            </FastStyleTransferModel>
          
        </>
         
    )
}




