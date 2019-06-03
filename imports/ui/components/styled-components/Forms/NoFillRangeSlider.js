import styled from 'styled-components';
import Slider from 'react-rangeslider'

const NoFillSlider = styled(Slider)`
.rangeslider__fill {
  background-color: transparent;
}
`;

export default NoFillSlider;