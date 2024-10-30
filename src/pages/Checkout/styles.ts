import styled from 'styled-components'
import { cores } from '../../styles'
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

export const Row = styled.div<RowProps>`
  display: flex;
  column-gap: 24px;
  align-items: flex-end;
  margin-top: ${(props) => props.marginTop || '0'};
`

export const InputGroup = styled.div<InputGroupProps>`
  flex: auto;

  max-width: ${(props) => props.maxWidth || 'auto'};

  label {
    font-size: 14px;
    margin-bottom: 8px;
    line-height: 16px;
    display: block;
  }

  input,
  select {
    background-color: ${cores.branca};
    height: 32px;
    padding: 0 8px;
    border: 1px solid ${cores.branca};
    width: 100%;
  }
`

export const Cont = styled.form`
  ${ButtonContainer} {
    margin-bottom: 40px;
  }

  .pagamentoButtons {
    display: flex;
    gap: 16px;
  }
`

export const TabButton = styled.button<TabButtonProps>`
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${cores.branca};
  background-color: ${(props) => (props.isActive ? cores.verde : cores.preta)};
  border: 2px solid ${(props) => (props.isActive ? cores.branca : cores.verde)};
  height: 32px;
  padding: 0 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  cursor: pointer;

  img {
    margin-right: 8px;
  }
`

/* border: 2px solid
${(props) => (props.variant === 'primary' ? cores.verde : cores.branca)}; */
