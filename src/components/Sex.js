import { FormControlLabel, FormLabel, RadioGroup, Radio} from "@mui/material";
import React, { useState } from "react";

export default function Sex(props){
    const [sexValue, setSexValue] = useState("");

    const sexValidation = (sex) => {
      if (sex === 0) {
        props.setSexValid(true);
        setSexValue("Male");
      } else if (sex === 1){
        props.setSexValid(true);
        setSexValue("Female");
      } else {
        props.setSexValue(false);
      }
    } 

    return(
      <div>
        <FormLabel>SEX: {sexValue}</FormLabel>
        <RadioGroup row>
          <FormControlLabel 
            name="male" 
            value={0} 
            control={<Radio/>} 
            label="MALE" 
            onChange={(e) => sexValidation(Number(e.target.value))}
            />
            <FormControlLabel
            name="female"
            value={1}
            control={<Radio/>}
            label="FEMALE"
            onChange={(e) => sexValidation(Number(e.target.value))}
            />
        </RadioGroup>
      </div>
        // <div>
        // <label>
        //     <span>SEX: {sexValue}</span>
        //     <input
        //       type="radio"
        //       name="sex" 
        //       value={0}
        //       className="sex-male"
        //       onChange={(e) => sexValidation(Number(e.target.value))}
        //     />
        //     <span>Male</span>
        //     <input  
        //       type="radio" 
        //       name="sex" 
        //       value={1} 
        //       className="sex-female"
        //       onChange={(e) => sexValidation(Number(e.target.value))}
        //     />
        //     <span>Female</span>
        // </label>
        // </div>
    )
}