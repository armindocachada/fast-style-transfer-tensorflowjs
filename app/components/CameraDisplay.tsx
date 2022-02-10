import React, { useEffect, useState, ReactNode } from "react";
import { makeStyles } from '@mui/styles';
import { CameraState } from './Dashboard';

import { Button, Stack, Card, CardMedia, CardActions, Container, Grid, NativeSelect, InputLabel, FormControl } from '@mui/material';
import { loadImage } from '../modules/utils';

type Props = {
    styleImageUrl: string;
    updateCameraStateCallback: (cameraState: CameraState) => void;
    cameraState: CameraState,
    doStyleTransferCallback: (imageToStyle: ImageData, styleImage: HTMLImageElement, canvasDest: HTMLCanvasElement) => void;


};
let video: HTMLVideoElement;
let styleImage: HTMLImageElement;

const CameraDisplay = ({ styleImageUrl, updateCameraStateCallback, cameraState, doStyleTransferCallback }: Props) => {
    const computeFrame = () => {

        let canvas1 = document.querySelector("#canvasContainer1") as HTMLCanvasElement;
        let canvasCtx1 = canvas1.getContext("2d");
        let canvas2 = document.querySelector("#canvasContainer2") as HTMLCanvasElement;
        let canvasCtx2 = canvas2.getContext("2d");

        if (canvasCtx1) {
            canvasCtx1.drawImage(video, 0, 0, canvas1.width, canvas1.height);
            let frame = canvasCtx1.getImageData(0, 0, canvas1.width, canvas1.height);

            doStyleTransferCallback(frame, styleImage, canvas2);
        }
        else {
            console.error("canvasCtx is null!!");
        }
    }

    const timerCallback = () => {
        computeFrame();
        setTimeout(() => {
            if (video.srcObject != null) {
                timerCallback();
            }
        }, 0);
    }

    const stopCamera = () => {
        let stream = video.srcObject as MediaStream;
        let tracks = stream.getTracks();

        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            track.stop();
        }

        video.srcObject = null;
        updateCameraStateCallback(CameraState.stopped);
    }

    const startCamera = () => {
        
        let canvas1 = document.querySelector("#canvasContainer1") as HTMLCanvasElement;
        let canvasCtx1 = canvas1.getContext("2d");
        let canvas2 = document.querySelector("#canvasContainer2") as HTMLCanvasElement;
        let canvasCtx2 = canvas2.getContext("2d");

        video = document.createElement("video") as HTMLVideoElement;
        video.autoplay = true;
        video.onplay = timerCallback;
        video.width = canvas1.width;
        video.height = canvas1.height;

        console.log("video width: " + video.width);
        console.log("video height: " + video.height);

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 270 } })
                .then(function (stream) {
                    console.log("Setting stream");
                    video.srcObject = stream;
                    updateCameraStateCallback(CameraState.started);
                    return video;
                })
                .catch(function (err0r) {
                    console.log("Something went wrong!" + err0r);
                });
        }

    }
    
    const useStyles = makeStyles({
       
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        },

        canvasCamera: {
            aspectRatio: "16 / 9",
            width: "100%",
        },
        

    });

    const classes = useStyles();



    useEffect(() => {
        if (cameraState == CameraState.start) {
            console.log("StyleImageUrl=" + styleImageUrl);
            loadImage(styleImageUrl).then((loadedImage: HTMLImageElement) => {
                console.log("StyleImageUrl=" + styleImageUrl + " loaded successfully=" + loadedImage);
                styleImage = loadedImage;
                startCamera();
            });
        }
        else if (cameraState == CameraState.started) {
            console.log("StyleImageUrl=" + styleImageUrl);
            loadImage(styleImageUrl).then((loadedImage: HTMLImageElement) => {
                console.log("StyleImageUrl=" + styleImageUrl + " loaded successfully=" + loadedImage);
                styleImage = loadedImage;
            });
        }
        else if (cameraState == CameraState.stop) {
            stopCamera();
        }
    });

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                <Grid key="canvasContainer1" item xs={12} sm={12} md={12}>
                    <Card className={classes.card}>
                        <canvas id="canvasContainer1" className={classes.canvasCamera} />
                    </Card>
                </Grid>
                <Grid key="canvasContainer2" item xs={12} sm={12} md={12}>
                    <Card className={classes.card}>
                        <canvas id="canvasContainer2" className={classes.canvasCamera} />
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}


export default CameraDisplay