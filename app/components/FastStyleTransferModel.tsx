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
    children: (model: tf.GraphModel) => ReactNode;
};


const FastStyleTransferModel = ({children}:Props) => {
    const [model, setModel] = useState(null as tf.GraphModel | null)

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
                [ children(model) ]
            }
        </>
    )



}

export default FastStyleTransferModel