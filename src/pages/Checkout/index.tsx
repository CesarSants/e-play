import { useState } from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { InputGroup, Row, Cont, TabButton } from './styles'

import boleto from '../../assets/images/boleto.png'
import cartao from '../../assets/images/cartao.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)
  const form = useFormik({
    initialValues: {
      fullName: '',
      telefone: '',
      cpf: '',
      deliveryEmail: '',
      confirmDeliveryEmail: '',
      cardOwner: '',
      cpfCardOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expiresMonth: '',
      expiresYear: '',
      cardCode: '',
      installments: 1
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'O nome precisar ter pelo menos 5 caracteres')
        .required('O campo é obrigatorio'),
      telefone: Yup.string()
        .min(10, 'Digite o telefone com DDD')
        .max(14, 'Digite o telefone com DDD')
        .required('O campo é obrigatorio'),
      deliveryEmail: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatorio'),
      confirmDeliveryEmail: Yup.string()
        .oneOf([Yup.ref('deliveryEmail')], 'Os E-mails são diferentes ')
        .required('O campo é obrigatorio'),
      cpf: Yup.string()
        .min(14, 'O CPF deve estar completo')
        .max(14, 'O CPF deve estar completo')
        .required('O campo é obrigatorio'),

      cardOwner: Yup.string()
        .when((values, schema) =>
          payWithCard ? schema.required('O campo é obrigatorio') : schema
        )
        .min(5, 'O nome precisar ter pelo menos 5 caracteres'),
      cpfCardOwner: Yup.string()
        .when((values, schema) =>
          payWithCard ? schema.required('O campo é obrigatorio') : schema
        )
        .min(14, 'O campo deve conter o numero completo do CPF')
        .max(14, 'O campo deve conter o numero completo do CPF'),
      cardDisplayName: Yup.string()
        .when((values, schema) =>
          payWithCard ? schema.required('O campo é obrigatorio') : schema
        )
        .min(5, 'O nome precisar ter pelo menos 5 caracteres'),
      cardNumber: Yup.string()
        .when((values, schema) =>
          payWithCard ? schema.required('O campo é obrigatorio') : schema
        )
        .min(13, 'O campo deve conter o numero completo do cartão')
        .max(16, 'O campo deve conter o numero completo do cartão'),
      expiresMonth: Yup.string()
        .when((values, schema) =>
          payWithCard ? schema.required('O campo é obrigatorio') : schema
        )
        .min(2, 'O campo deve conter os 2 numeros do mês')
        .max(2, 'O campo deve conter os 2 numeros do mês'),
      expiresYear: Yup.string()
        .when((values, schema) =>
          payWithCard ? schema.required('O campo é obrigatorio') : schema
        )
        .min(4, 'O campo deve conter os 4 numeros do ano')
        .max(4, 'O campo deve conter os 4 numeros do ano'),
      cardCode: Yup.string()
        .when((values, schema) =>
          payWithCard ? schema.required('O campo é obrigatorio') : schema
        )
        .min(3, 'O campo deve conter ter 3 numeros')
        .max(3, 'O campo deve conter ter 3 numeros'),
      installments: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatorio') : schema
      )
    }),
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const getErrorMessage = (fieldName: string, message?: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors

    if (isTouched && isInvalid) return message
    return ''
  }

  return (
    <Cont onSubmit={form.handleSubmit} className="container">
      <Card title="Dados de cobrança">
        <>
          <Row>
            <InputGroup>
              <label htmlFor="fullName">Nome completo:</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.values.fullName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('fullName', form.errors.fullName)}</small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="telefone">Telefone:</label>
              <input
                id="telefone"
                type="tel"
                name="telefone"
                value={form.values.telefone}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('telefone', form.errors.telefone)}</small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="cpf">CPF:</label>
              <input
                id="cpf"
                type="text"
                name="cpf"
                value={form.values.cpf}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('cpf', form.errors.cpf)}</small>
            </InputGroup>
          </Row>
          <h3>Dados de entrega - conteúdo digital</h3>
          <Row>
            <InputGroup>
              <label htmlFor="deliveryEmail">E-mail:</label>
              <input
                id="deliveryEmail"
                type="email"
                name="deliveryEmail"
                value={form.values.deliveryEmail}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>
                {getErrorMessage('deliveryEmail', form.errors.deliveryEmail)}
              </small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="confirmDeliveryEmail">Confirme o E-mail:</label>
              <input
                id="confirmDeliveryEmail"
                type="text"
                name="confirmDeliveryEmail"
                value={form.values.confirmDeliveryEmail}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>
                {getErrorMessage(
                  'confirmDeliveryEmail',
                  form.errors.confirmDeliveryEmail
                )}
              </small>
            </InputGroup>
          </Row>
        </>
      </Card>
      <Card title="Pagamento">
        <div className="pagamentoContent">
          <div className="pagamentoButtons">
            <TabButton
              isActive={!payWithCard}
              onClick={() => setPayWithCard(false)}
              type="button"
              title="Clique aqui para mudar a forma de pagamento para boleto"
            >
              <img src={boleto} alt="boleto" />
              Boleto bancário
            </TabButton>
            <TabButton
              isActive={payWithCard}
              onClick={() => setPayWithCard(true)}
              type="button"
              title="Clique aqui para mudar a forma de pagamento para cartão"
            >
              <img src={cartao} alt="cartão" />
              Cartão de crédito
            </TabButton>
          </div>
          {payWithCard ? (
            <>
              <Row>
                <InputGroup>
                  <label htmlFor="cardOwner">Nome do titular do cartão:</label>
                  <input
                    id="cardOwner"
                    type="text"
                    name="cardOwner"
                    value={form.values.cardOwner}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getErrorMessage('cardOwner', form.errors.cardOwner)}
                  </small>
                </InputGroup>
                <InputGroup>
                  <label htmlFor="cpfCardOwner">
                    CPF do titular do cartão:
                  </label>
                  <input
                    id="cpfCardOwner"
                    type="text"
                    name="cpfCardOwner"
                    value={form.values.cpfCardOwner}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getErrorMessage('cpfCardOwner', form.errors.cpfCardOwner)}
                  </small>
                </InputGroup>
              </Row>
              <Row marginTop="24px">
                <InputGroup>
                  <label htmlFor="cardDisplayName">Nome no cartão:</label>
                  <input
                    id="cardDisplayName"
                    type="text"
                    name="cardDisplayName"
                    value={form.values.cardDisplayName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getErrorMessage(
                      'cardDisplayName',
                      form.errors.cardDisplayName
                    )}
                  </small>
                </InputGroup>
                <InputGroup>
                  <label htmlFor="cardNumber">Número do cartão:</label>
                  <input
                    id="cardNumber"
                    type="text"
                    name="cardNumber"
                    value={form.values.cardNumber}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getErrorMessage('cardNumber', form.errors.cardNumber)}
                  </small>
                </InputGroup>
                <InputGroup maxWidth="123px">
                  <label htmlFor="expiresMonth">Mês de vencimento</label>
                  <input
                    id="expiresMonth"
                    type="text"
                    name="expiresMonth"
                    value={form.values.expiresMonth}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getErrorMessage('expiresMonth', form.errors.expiresMonth)}
                  </small>
                </InputGroup>
                <InputGroup maxWidth="123px">
                  <label htmlFor="expiresYear">Ano de vencimento</label>
                  <input
                    id="expiresYear"
                    type="text"
                    name="expiresYear"
                    value={form.values.expiresYear}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getErrorMessage('expiresYear', form.errors.expiresYear)}
                  </small>
                </InputGroup>
                <InputGroup maxWidth="48px">
                  <label htmlFor="cardCode">CVV</label>
                  <input
                    id="cardCode"
                    type="text"
                    name="cardCode"
                    value={form.values.cardCode}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getErrorMessage('cardCode', form.errors.cardCode)}
                  </small>
                </InputGroup>
              </Row>
              <Row marginTop="24px">
                <InputGroup maxWidth="140px">
                  <label htmlFor="installments">Parcelamento</label>
                  <select
                    id="installments"
                    name="installments"
                    value={form.values.installments}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  >
                    <option value="1">1X de R$ 600,00</option>
                    <option value="2">2X de R$ 300,00</option>
                    <option value="3">3X de R$ 200,00</option>
                    <option value="4">4X de R$ 150,00</option>
                    <option value="5">5X de R$ 120,00</option>
                    <option value="6">6X de R$ 100,00</option>
                  </select>
                  {getErrorMessage('installments', form.errors.installments)}
                </InputGroup>
              </Row>
            </>
          ) : (
            <p>
              Ao optar por essa forma de pagamento, é importante lembrar que a
              confirmação pode levar até 3 dias úteis, devido aos prazos
              estabelecidos pelas instituições financeiras. Portanto, a
              liberação do código de ativação do jogo adquirido ocorrerá somente
              após a aprovação do pagamento do boleto.
            </p>
          )}
        </div>
      </Card>
      <Button
        htmlType="submit"
        type="button"
        title="Clique aqui para finalizar a compra"
      >
        Finalizar a compra
      </Button>
    </Cont>
  )
}
export default Checkout