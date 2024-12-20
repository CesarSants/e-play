import styled from 'styled-components'
import { breakpoints, cores } from '../../styles'
import { ButtonContainer } from '../../components/Button/styles'

type InputGroupProps = {
  maxWidth?: string
}

type RowProps = {
  marginTop?: string
}

type TabButtonProps = {
  isActive: boolean
}

export const InputGroup = styled.div<InputGroupProps>`
  position: relative;
  flex: 1;
  max-width: ${(props) => props.maxWidth || 'auto'};

  label {
    font-size: 14px;
    margin-bottom: 18px;
    line-height: 16px;
    display: block;
    height: 16px;
  }

  input {
    font-size: 16px;
  }

  input,
  select {
    background-color: ${cores.branca};
    height: 32px;
    padding: 0 8px;
    border: 2px solid ${cores.branca};
    width: 100%;
    margin-bottom: 4px;

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px ${cores.branca} inset !important;
      /* -webkit-text-fill-color: green; */
    }

    &.error {
      border: 2px solid #4e2f76;
      background-color: #c0aed7;
    }
  }

  small {
    color: yellow;
    font-size: 12px;
    display: block;
    height: auto;
    //height: 16px; //limita o tamanho do conteiner e faz com que fique alinhado porem o texto se sobrepoe ao elemento inferior
    line-height: 16px;
  }
`

export const Row = styled.div<RowProps>`
  display: flex;
  column-gap: 24px;
  align-items: flex-start;
  margin-top: ${(props) => props.marginTop || '0'};
  flex-wrap: wrap;

  .expire {
    display: flex;
    column-gap: 24px;
    /* align-items: flex-end; */
  }

  @media (max-width: ${breakpoints.tablet}) {
    //@
    display: block;

    ${InputGroup} {
      margin-top: 24px;
    }

    #cardCode1 {
      display: none;
    }

    &#lastRow {
      display: flex;
      flex-direction: row-reverse;
      justify-content: start;
    }
  }

  @media (min-width: 769px) {
    #cardCode2 {
      display: none;
    }
  }
`

export const Cont = styled.form`
  ${ButtonContainer} {
    margin-bottom: 40px;
    align-self: center;
    width: auto;
  }

  .pagamentoButtons {
    display: flex;
    gap: 16px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    flex-direction: column;

    ${ButtonContainer} {
      align-self: center;
      width: auto;
    }
  }
`

export const TabButton = styled.button<TabButtonProps>`
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${cores.branca};
  background-color: ${(props) => (props.isActive ? cores.verde : cores.preta)};
  border: 2px solid ${(props) => (props.isActive ? cores.branca : cores.verde)};
  /* height: 32px; */
  padding: 6px 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  cursor: pointer;

  img {
    margin-right: 8px;
  }
`

export const ContainerGeral = styled.div`
  #totalPrice {
    text-align: center;
    display: block;
    padding-top: 10px;
    border-top: 1px solid ${cores.branca};
  }

  .revise {
    display: flex;
    justify-content: space-evenly;
    column-gap: 24px;
    row-gap: 40px;
    flex-wrap: wrap;

    li {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 309px;
      width: 100%;
      text-align: center;
      bottom: 0;
      padding: 8px;

      > div {
        margin-bottom: 16px;
      }

      img {
        max-height: 293px;
        height: 100%;
        max-width: 293px;
        width: 100%;
        object-fit: cover;
      }
    }
  }
`
