import React, { useState } from 'react';
import { Box, Typography, Slider, TextField, Button } from '@material-ui/core';
import { useEffect } from 'react';
import axios from 'axios';

const SliderTest = () => {
  const [sliderObject, setSliderObject] = useState({
    sliderVal: 0,
    sliderSize: 200,
  });

  const { sliderVal, sliderSize } = sliderObject;

  useEffect(() => {
    const timeOutId = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timeOutId);
  }, [sliderVal]);

  let fetchData = async () => {
    if (sliderVal == 0) {
      return;
    }
    try {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setSliderObject((pre) => ({
      ...pre,
      sliderVal: newValue,
    }));
  };

  return (
    <Box textAlign='center' px={10} mt={5} width='50%' margin='auto'>
      <Box display='flex' justifyContent='space-around'>
        <Typography>0</Typography>
        <Slider
          value={sliderVal}
          step={0.05 * sliderSize}
          min={0}
          getAriaValueText={() => toString(0.05 * sliderSize)}
          max={sliderSize}
          onChange={handleSliderChange}
          aria-labelledby='continuous-slider'
          style={{ width: '50%' }}
          valueLabelDisplay='auto'
        />
        <Typography>{sliderSize ? sliderSize : 'Enter Slider Size'}</Typography>
      </Box>

      <Box display='flex' mt={4} justifyContent='space-around'>
        <TextField
          name='maxVal'
          placeholder='Slider Size'
          label='Slider Size'
          variant='outlined'
          type='number'
          value={sliderSize}
          onChange={(e) => {
            const { value } = e.target;
            if (value < 0) {
              return;
            }
            setSliderObject((pre) => ({
              sliderVal: 0,
              sliderSize: parseInt(value),
            }));
          }}
          type='number'
        />
      </Box>
      <br />
    </Box>
  );
};

export default SliderTest;
