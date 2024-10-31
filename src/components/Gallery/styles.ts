import styled from 'styled-components'
import { breakpoints, cores } from '../../styles'

export const Items = styled.ul`
  display: flex;
  gap: 16px;
  flex-wrap: nowrap;
  @media (max-width: ${breakpoints.desktop}) {
    overflow-x: scroll;
    /* ::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none; */
  }
`

export const Action = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.73);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.5s ease;
`

export const Item = styled.li`
  position: relative;
  cursor: zoom-in;

  &:last-child {
    margin-right: 0px;
  }

  > img {
    border: 2px solid ${cores.branca};
    border-radius: 8px;
    width: 140px;
    height: 140px;
    object-fit: cover;
  }

  &:hover {
    ${Action} {
      opacity: 1;
      transition: opacity 0.5s ease;
    }
  }
`

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* z-index: 1; */
  display: none;
  align-items: center;
  justify-content: center;

  @media (max-width: ${breakpoints.desktop}) {
    /* overflow-x: scroll; */
    /* ::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none; */
  }

  &.visivel {
    display: flex;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.73);
  }
`

export const ModalContent = styled.div`
  max-width: 960px !important;
  position: relative;
  z-index: 1;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    h4 {
      font-size: 18px;
      font-weight: bold;
    }

    img {
      cursor: pointer;
      width: 22px;
      height: 22px;
    }
  }

  > img {
    width: 100%;
  }

  img,
  iframe {
    display: block;
    max-width: 100%;
  }

  iframe {
    width: 100%;
    height: 70vh;
    border: none;
  }

  @media (max-width: ${breakpoints.desktop}) {
    /* overflow-x: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none; */
  }
`
