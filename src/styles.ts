import { createGlobalStyle } from 'styled-components'

export const cores = {
  branca: '#eeeeee',
  // preta: '#111111',
  preta: '7, 8, 12',
  cinza: '#333333',
  verde: '#10ac84'
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
    background-color: rgba(${cores.preta}, 1.85);
    color: ${cores.branca};
    padding-top: 40px;

    /* ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    z-index: -2;
  } */
  }

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }
`

// export const Container = styled.div`
//   max-width: 1024px;
//   width: 100%;
//   margin: 0 auto;
// `