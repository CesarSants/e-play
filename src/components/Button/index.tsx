import { ButtonContainer, ButtonLink } from './styles'

type Props = {
  type: 'button' | 'link'
  title: string
  to?: string
  onClick?: () => void
  children: string
}

const Button = ({ type, title, to, onClick, children }: Props) => {
  if (type === 'button') {
    return (
      <ButtonContainer type="button" title={title} onClick={onClick}>
        {children}
      </ButtonContainer>
    )
  }

  return (
    <ButtonLink to={to as string} title={title} type="link" onClick={onClick}>
      {children}
    </ButtonLink> // se nao utilizasse o react router dom poderia utilizar as = "div" por exemplo, mas nesse caso criamos outra classe "buttonlink" e utilizamos "to"
  )
}

export default Button
