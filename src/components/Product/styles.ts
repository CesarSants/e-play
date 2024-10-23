import styled from 'styled-components'
import { cores } from '../../styles'
import { TagContainer } from '../Tag/styles'
import { Link } from 'react-router-dom'

export const Card = styled(Link)`
  background-color: ${cores.cinza};
  border-radius: 8px;
  padding: 8px;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  color: ${cores.branca};
  display: block;

  ${TagContainer} {
    margin-right: 8px;
  }

  img {
    height: 250px;
    width: 100%;
    overflow-y: hidden;
    object-fit: cover;
    /* object-position: center; */
    object-position: 50% 40%; // porcentagem afeta so as que exedem a altura determinada enquando por px afeta todas
    /* object-position: 50% -20px; */
  }
`

export const Titulo = styled.h3`
  font-weight: bold;
  font-size: 16px;
  display: block;
  margin-top: 16px;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Limita a 3 linhas */
  overflow: hidden;
  text-overflow: ellipsis;
`
export const Descricao = styled.p`
  font-size: 14px;
  line-height: 22px;
  display: block;
  margin-top: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Limita a 3 linhas */
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Infos = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`
