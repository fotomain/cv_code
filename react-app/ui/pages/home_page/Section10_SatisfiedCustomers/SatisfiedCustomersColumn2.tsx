
/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

const imageStyles = css`
  aspect-ratio: 0.55;
  object-fit: contain;
  object-position: center;
  width: 100%;
  min-width: 300px;
  height: auto;
  max-height: 500px;
  
`;

const SatisfiedCustomersColumn2 = () => {
  const imageSrc=require('./satisfyed_person1.png')
  return(
    <img src={imageSrc} alt="Welcome illustration" css={css`${imageStyles}`} />
  )
}

export default SatisfiedCustomersColumn2
