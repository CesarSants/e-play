import styled from 'styled-components'
import { breakpoints, cores } from '../../styles'
import { Props } from '.'
import { HashLink } from 'react-router-hash-link'

export const HeaderContainer = styled.div<Props>`
  background-color: ${cores.preta};
  color: ${cores.branca};

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: -2;
  }

  ${(props) =>
    props.isSpecificPage &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 100px;
      left: 0;
      width: 100%;
      height: 125px;
      background-image: linear-gradient(
        180deg, ${cores.preta}, #2F2F42
      );
      z-index: -1;
    }
  `}
`

export const HeaderBar = styled.header`
  background-color: ${cores.cinza};
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 200;

  @media (max-width: ${breakpoints.tablet}) {
  }

  a {
    color: ${cores.branca};
    text-decoration: none;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;
  }
`
export const Links = styled.ul`
  display: flex;
  margin-left: 40px;
`

export const LinkItem = styled.li`
  margin-right: 16px;
`

export const CartButton = styled.a`
  display: flex;
  cursor: pointer;

  img {
    margin-left: 16px;
  }
`

export const HashLin = styled(HashLink)`
  color: ${cores.cinzaClaro};
  text-decoration: none;
  margin-right: 8px;
`
