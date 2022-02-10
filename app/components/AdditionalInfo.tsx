import React from "react";
import { Button, Stack, Card, CardMedia, CardActions, Container, Grid, NativeSelect, InputLabel, FormControl, FormControlLabel } from '@mui/material';

const AdditionalInfo = (() => {

    return (
        <>

                    <Grid item xs={12} md={12} >
                                        <p>
                                        <b>References:</b>
                                        [1] Golnaz Ghiasi, Honglak Lee, Manjunath Kudlur, Vincent Dumoulin,
                                        Jonathon Shlens. <a href="https://arxiv.org/abs/1705.06830">Exploring the structure of a real-time, arbitrary neural artistic stylization network. </a>Proceedings of the British Machine Vision Conference (BMVC), 2017.
                                        </p>

                    </Grid>

                    <Grid item xs={12} md={12} >
                    <p>
                    <b>Blog Article:</b>
                        <a href="https://spltech.co.uk/a-tutorial-on-how-to-convert-a-tensorflow-model-to-tensorflow-js/">A tutorial on how to convert a Tensorflow model to Tensorflow.js</a>
                    </p>
                    
                    </Grid>
        </>
    )

});

export default AdditionalInfo;
 