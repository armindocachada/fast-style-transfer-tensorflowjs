import React from "react";
import { Button, RadioGroup, Radio, FormControl, FormControlLabel } from '@mui/material';


type Props = {
    mode: string;
    setModeToCallback:  (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};


const ModeSelector = (({ mode, setModeToCallback }:Props) => {
    return (
            
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group" defaultValue="camera" onChange={setModeToCallback}>
                <FormControlLabel value="camera" control={<Radio />} label="Video"/>
                <FormControlLabel value="photo" control={<Radio />} label="Photos"  />
            
            </RadioGroup>
       
        )

    });
    
export default ModeSelector;
     