import { ButtonContainer, ButtonLink } from './styles'

export type Props = {
  type: 'button' | 'link' // outra solução é criar um tipo submit
  title: string
  to?: string
  onClick?: () => void
  children: string | JSX.Element
  variant?: 'primary' | 'secondary'
  htmlType?: 'button' | 'submit' | 'reset'
}

const Button = ({
  type,
  title,
  to,
  onClick,
  children,
  variant = 'primary',
  htmlType = 'button'
}: Props) => {
  if (type === 'button') {
    // colocar || que siguinifica ou depois do fechamento da aspas de button e colocar type submit
    return (
      <ButtonContainer
        variant={variant}
        as="button"
        type={htmlType} //e em type recebe {type}, nesse caso nao serie necessario o "as" e nem o html type nas props
        title={title}
        onClick={onClick}
      >
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

// O termo as é um tipo de "assertion" que informa ao TypeScript como tratar o componente ao renderizá-lo.
// Neste caso, ele age como uma instrução para que o ButtonContainer seja tratado especificamente como um elemento HTML do tipo button,
// independentemente de como o TypeScript esteja inferindo esse componente com base nas props.
// Vamos examinar a lógica do que acontece:
// type de ButtonContainer: Ao usar as="button", você está declarando explicitamente que o ButtonContainer deve ser renderizado como um <button>.
// Essa especificação ajuda o TypeScript a entender que o ButtonContainer é um HTMLButtonElement,
//  aceitando as propriedades específicas deste elemento, como o type="button" | "submit" | "reset".
// Override de Inferência: Sem as="button", o TypeScript pode se confundir ao inferir o tipo correto para o ButtonContainer,
// já que, por padrão, ele vê apenas as props do componente e assume o tipo de elemento com base nessas props. Quando você usa as,
// está garantindo para o TypeScript qual tipo de elemento HTML será usado, corrigindo a inferência para aceitar valores como submit e reset em type.
// No fundo, as="button" instrui o TypeScript sobre o tipo de elemento HTML pretendido, facilitando o uso de propriedades que ele aceita,
//  mesmo quando elas não estão declaradas explicitamente na interface Props.
