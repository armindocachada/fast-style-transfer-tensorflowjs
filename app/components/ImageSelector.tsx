import React, { useEffect, useState, ReactNode } from "react";
import * as tf from "@tensorflow/tfjs";
import { Tensor3D, Tensor4D, } from '@tensorflow/tfjs';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Stack, Card, CardMedia, CardActions, Container, Grid, NativeSelect, InputLabel, FormControl } from '@mui/material';



const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
    },


    cardMedia: {
    },





});


type Props = {
    listKey: string;
    list: { name: string, url: string }[];
    uploadImageLabel: string;
    setStateCallback: (styleImage: string) => void;
};

const ImageSelector = ({ listKey, list, uploadImageLabel, setStateCallback }:Props) => {
    const [image, setImage] = useState(list[0].url as string)


    const uploadImage = ((evt: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        let tgt = evt.target as HTMLInputElement,
            files = tgt.files;

        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                //let targetCanvas = document.getElementById(evt.target.getAttribute("imgid"));
                //resizeAndSquareImage(fr.result, targetCanvas);
                console.log("key=" + listKey);
                let imagesList = document.getElementById(listKey) as HTMLSelectElement;

                if (files && files[0] != null) {
                    var option = document.createElement("option");
                    option.text = files[0].name;
                    option.value = String(fr.result);
                    imagesList.add(option, 0);
                    imagesList.selectedIndex = 0;
                    imagesList.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
            fr.readAsDataURL(files[0]);

            //doStyleTransfer();
        }

    });
    const classes = useStyles();

    const notifyImageLoaded = (() => {
       
        setStateCallback(image);

    });

    const selectImage = ((evt: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const value = evt.target.value as string;
        //console.log("Changing state:" + value);

        setImage(
           value
        );
        
    });


   
    return (
        <>
            <CardMedia
                id="image"
                className={classes.cardMedia}
                image={image}
                title="Style Image"
                component="img" onLoad={notifyImageLoaded}
                key="selectorImage"
            />
            <Grid container rowSpacing={1} alignItems="flex-start" justifyContent="space-evenly" p={2} key="selector">
                <Grid item xs={12} md={6} key="uploadMedia">
                    <label htmlFor={listKey + "-upload-image"}>
                        <input
                            style={{ display: 'none' }}
                            id={listKey + "-upload-image"}
                            name={listKey + "-upload-image"}
                            type="file" onChange={uploadImage}
                        />

                        <Button variant="outlined" component="span" >
                            {uploadImageLabel}
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={12} md={6} key="imageList">
                        <NativeSelect
                            defaultValue={image}
                            key="random1"
                            inputProps={{
                                name: 'image',
                                id: listKey
                            }} onChange={selectImage}>
                            {
                                list.map((image, index) => {
                                    return (
                                        <option key={"imageOption" + index} value={image.url}>{image.name}</option>
                                    )
                                  })
                            }

                        </NativeSelect>
                </Grid>
            </Grid>

        </>
    )



}

export default ImageSelector