import styled from 'styled-components'

export const Imagem = styled.div`
  width: 100%;
  height: 560px;
  display: block;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  background-position-y: -35px;
  font-weight: bold;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    z-index: -2;
  }
`
export const BannerContainer = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
`

export const Titulo = styled.h2`
  font-size: 36px;
  font-weight: bold;
  max-width: 450px;
  /* padding-top: 250px; */
  padding-top: 340px;
`

export const Precos = styled.p`
  font-size: 24px;
  margin-top: 24px;

  span {
    text-decoration: line-through;
  }
`
