import styled from 'styled-components'
import { breakpoints, cores } from '../../styles'
import { HashLink } from 'react-router-hash-link'

export const Container = styled.footer`
  background-color: ${cores.cinza};
  padding: 32px 0;
  font-size: 14px;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: ${breakpoints.desktop}) {
      display: block;
      text-align: center;

      p:last-child {
        margin-top: 24px;
      }
    }
  }
`

export const SectionTitle = styled.h4`
  color: ${cores.branca};
  font-size: 16px;
  font-weight: bold;
`

export const Links = styled.ul`
  display: flex;
  margin-top: 16px;
  @media (max-width: ${breakpoints.desktop}) {
    text-align: center;
    justify-content: center;
  }
`

export const Link = styled(HashLink)`
  color: ${cores.cinzaClaro};
  text-decoration: none;
  margin-right: 8px;
`

export const FooterSection = styled.div`
  align-items: center;
  text-align: center;
  @media (max-width: ${breakpoints.desktop}) {
    .oi {
      margin-top: 32px;
    }
  }
`
