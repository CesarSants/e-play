import styled from 'styled-components'
// import { cores } from '../../styles'
import { TagContainer } from '../Tag/styles'
import { Props } from '.'
import { breakpoints } from '../../styles'
// import { ButtonContainer } from '../Button/styles'
// import Button from '../Button'
// import Button from '../Button'

// export const StyledButton = styled(Button)`
//   opacity: 1;
// `

export const Banner = styled.div`
  position: relative;
  display: block;
  height: 480px;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  /* background-size: 100%; */
  z-index: 1;
  padding-top: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    background-size: cover;
  }

  &::after {
    content: '';
    position: absolute;
    background-color: rgba(0, 0, 0, 0.65);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -2;
  }

  ${TagContainer} {
    margin-right: 8px;
  }

  .container {
    z-index: 10;
    /* position: relative; */
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }
`

export const Infos = styled.div<Props>`
  padding: 16px;
  background-color: rgba(7, 8, 12, 0.7);
  max-width: 290px;
  font-weight: bold;

  h2 {
    font-size: 32px;
  }

  p {
    font-size: 18px;
    margin: 16px 0;

    > span {
      display: block;
      text-decoration: ${(props) =>
        props.game.release_date ? 'underline' : 'line-through'};
    }
  }
`
