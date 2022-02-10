import React, { useEffect, useState, ReactNode } from "react";
import * as tf from "@tensorflow/tfjs";
import { Tensor3D, Tensor4D, } from '@tensorflow/tfjs';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles({
    progressBar: {
        display: "flex",
        justifyContent: "center"
    },
    modalTitle: {
        textAlign: "center"
    },

});




function loadModel() {
    return tf.loadGraphModel('/style_transfer_tfjs/model.json');
}

function preprocess(imageData: (tf.PixelData | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement), size?: number) {
    let imageTensor = tf.browser.fromPixels(imageData);
    const offset = tf.scalar(255.0);
    const normalized = imageTensor.div(offset);
    const batched = normalized.expandDims(0) as Tensor4D;
    let result = batched;
    if (size) {
        const imgSize = Math.min(imageData.width, imageData.height);
        //console.log("Image Size:" + imgSize);
        const left = (imageData.width - imgSize) / 2;
        const top = (imageData.height - imgSize) / 2;
        const right = (imageData.width + imgSize) / 2;
        const bottom = (imageData.height + imgSize) / 2;
        let boxes = [[top / imageData.height, left / imageData.width, bottom / imageData.height, right / imageData.width]];
        result = tf.image.cropAndResize(batched, boxes, [0], [size,size])
    }
    return result;
}

function LoadingModel() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ alignContent: "center" }}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    alignContent: "center"
                }}>

                    <h2 id="unstyled-modal-title" className={classes.modalTitle}>Loading Model</h2>
                    <p className={classes.progressBar}><CircularProgress /></p>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

type Props = {
    children: (doStyleTransferCallback: (image: HTMLImageElement|ImageData, styleImage:HTMLImageElement, canvasDest: HTMLCanvasElement) => void ) => ReactNode;
};


const FastStyleTransferModel = ({children}:Props) => {
    const [model, setModel] = useState(null as tf.GraphModel | null)

    const doStyleTransferCallback = (image: HTMLImageElement|ImageData, styleImage:HTMLImageElement, canvasDest: HTMLCanvasElement) => {
       
        // get image to apply style to
        //const image = document.getElementById("image");
        //const styleImage = document.getElementById("styleImage") as HTMLImageElement;
    
        tf.tidy(() => {
            const imageTensor = preprocess(image);
    
            const styleImageTensor = preprocess(styleImage, 256);
            //const styleImageTensor = state.styleImage;
            //console.log("Calling model");
            if (model) {
                let result = model.execute([styleImageTensor, imageTensor]);
                //console.log(result);
                tf.browser.toPixels(tf.squeeze(result as Tensor4D) as Tensor3D, canvasDest);
            }
        });
    }
    
    useEffect(() => {
        console.log("Loading model!");
        loadModel().then((loadedModel: tf.GraphModel) => {
            console.log("Finished loading model");
            let model = loadedModel;
            setModel(loadedModel);
        });
    }, [])

    return (
        <>
            {!model &&
                <LoadingModel />
            }

            {model &&
                [ children(doStyleTransferCallback) ]
            }
        </>
    )



}

export default FastStyleTransferModel