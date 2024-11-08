import styled from 'styled-components'
import { cores } from '../../styles'
import { Props } from '.'
import { HashLink } from 'react-router-hash-link'

export const HeaderContainer = styled.div<Props>`
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
    transition: height 1.2s ease, visibility 1.2s ease;
    }
  `}

  ${(props) =>
    props.isSpecificPage &&
    `&.is-open::after {
      height: 278px;
      transition: max-height 1s ease, visibility 1s ease;
      opacity: 1;
      visibility: visible;
    }`}
`
export const Links = styled.ul`
  display: flex;
  margin-left: 40px;

  @media (max-width: 789px) {
    margin-left: 0;
    display: block;
  }
`

export const HeaderBar = styled.header`
  background-color: ${cores.cinza};
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 80px;
  z-index: 1;

  @media (min-width: 789px) {
  }

  a {
    color: ${cores.branca};
    text-decoration: none;
    font-weight: bold;
  }

  h1 {
    line-height: 0;
  }
`
export const NavMobile = styled.nav`
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  visibility: hidden;
  transition: max-height 0.65s ease, visibility 0.65s ease;

  &.is-open {
    max-height: 237px;
    opacity: 1;
    visibility: visible;
  }
`

export const LinkItem = styled.li`
  margin-right: 16px;

  @media (max-width: 789px) {
    margin-right: 0;

    a {
      display: block;
      padding: 16px 0;
      text-align: center;
    }
  }
`

export const CartButton = styled.a`
  display: none;
  cursor: pointer;

  img {
    margin-left: 16px;
  }

  span {
    @media (max-width: 789px) {
      //opcional
      display: none;
    }
  }
`

export const HashLin = styled(HashLink)`
  color: ${cores.cinzaClaro};
  text-decoration: none;
  margin-right: 8px;

  @media (max-width: 789px) {
    margin-right: 0;
  }
`

export const Hamburguer = styled.div`
  width: 32px;

  span {
    height: 2px;
    display: block;
    width: 100%;
    background-color: ${cores.branca};
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0px;
    }

    @media (min-width: 790px) {
      display: none;
    }
  }
`

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;

    @media (max-width: 789px) {
      flex: auto;
      justify-content: space-between;

      ${Links} {
        display: none;
      }
    }
  }
`
