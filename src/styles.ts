import { table } from 'console'
import { createGlobalStyle } from 'styled-components'

export const cores = {
  branca: '#eeeeee',
  // preta: '#111111',
  // preta: '7, 8, 12',
  // preta: 'rgba(7, 8, 12, 1.85)',
  preta: 'rgb(7, 8, 12)',
  cinzaClaro: '#a3a3a3',
  cinza: '#333333',
  verde: '#10ac84'
}

export const breakpoints = {
  desktop: '1024px',
  tablet: '768px'
}

export const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
  }

  body{
    background-color: ${cores.preta};
    color: ${cores.branca};
    padding-top: 40px;

    /* ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.001);
    z-index: -2;
  } */
  }

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: ${breakpoints.desktop}){
      max-width: 80%;
    }
  }
`
