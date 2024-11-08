import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Button from '../../components/Button'
import Card from '../../components/Card'

import boleto from '../../assets/images/boleto.png'
import cartao from '../../assets/images/cartao.png'

import { usePurchaseMutation } from '../../services/api'
import { RootReducer } from '../../store'
import { formataPreco, getTotalPrice } from '../../utils'

import { InputGroup, Row, Cont, TabButton, ContainerGeral } from './styles'
// import { remove, clearItems } from '../../store/reducers/cart'
import { clearItems, remove } from '../../store/reducers/cart'
import HeaderCheckout from '../../components/HeaderCheckout'
import Header from '../../components/Header'
import { setPurchaseSummary } from '../../store/reducers/purchaseSumarySlice'

type Installment = {
  quantity: number
  amount: number
  formattedAmount: string
}

const Checkout: React.FC = () => {
  const [payWithCard, setPayWithCard] = useState(false)
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const [installments, setInstallments] = useState<Installment[]>([])
  const [toastId, setToastId] = useState<string | number | null>(null)
  const dispatch = useDispatch()

  const finalizePurchase = (
    items: Game[],
    paymentMethod: string,
    installments: number
  ) => {
    const total = getTotalPrice(items)
    const getFormattedDate = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }
      return new Date().toLocaleString('pt-BR', options)
    }
    const purchaseDate = getFormattedDate()

    dispatch(
      setPurchaseSummary({
        items,
        total,
        paymentMethod,
        installments,
        purchaseDate
      })
    )
    dispatch(clearItems())
  }

  const alertSuccess = () => {
    if (toastId === null) {
      const id = toast.success('Pedido realizado com sucesso!', {
        containerId: 'cartToast',
        onClose: () => setToastId(null)
      })
      setToastId(id)
    }
  }

  const alertError = () => {
    if (toastId === null) {
      const id = toast.warn('Por favor, preencha todos os campos.', {
        containerId: 'cartToast',
        onClose: () => setToastId(null)
      })
      setToastId(id)
    }
  }

  const totalPrice = getTotalPrice(items)

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
        .required('O campo é obrigatorio')
        .min(15, 'Digite o telefone com DDD')
        .max(15, 'Digite o telefone com DDD'),
      deliveryEmail: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatorio'),
      confirmDeliveryEmail: Yup.string()
        .oneOf([Yup.ref('deliveryEmail')], 'Os E-mails são diferentes ')
        .required('O campo é obrigatorio'),
      cpf: Yup.string()
        .required('O campo é obrigatorio')
        .min(14, 'O CPF deve estar completo')
        .max(14, 'O CPF deve estar completo'),

      //__________________________________________________________________________________

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
        .min(19, 'O campo deve conter o numero completo do cartão')
        .max(19, 'O campo deve conter o numero completo do cartão'),
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
        .min(2, 'O campo deve conter os 2 ultimos numeros do ano')
        .max(2, 'O campo deve conter os 2 ultimos numeros do ano'),
      cardCode: Yup.string()
        .when((values, schema) =>
          payWithCard ? schema.required('O campo é obrigatorio') : schema
        )
        .min(3, 'Deve conter ter 3 numeros')
        .max(3, 'Deve conter ter 3 numeros'),
      installments: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatorio') : schema
      )
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await purchase({
          billing: {
            document: values.cpf,
            name: values.fullName,
            email: values.telefone
          },
          delivery: {
            email: values.deliveryEmail
          },
          payment: {
            installments: 1,
            card: {
              active: Boolean(payWithCard),
              code: Number(values.cardCode),
              name: values.cardDisplayName,
              number: values.cardNumber,
              owner: {
                name: values.cardOwner,
                document: values.cpfCardOwner
              },
              expires: {
                month: Number(values.expiresMonth),
                year: Number(values.expiresYear)
              }
            }
          },
          products: items.map((item) => ({
            id: item.id,
            price: item.prices.current as number
          }))
        }).unwrap()
        alertSuccess()
        resetForm()
      } catch {
        alertError()
      }
    }
  })
  const timestamp = () => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }
    return new Date().toLocaleString('pt-BR', options)
  }

  const getErrorMessage = (fieldName: string, message?: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors

    if (isTouched && isInvalid) return message
    return ''
  }

  const checkInputHasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors

    const hasError = isTouched && isInvalid

    return hasError
  }

  useEffect(() => {
    const calculateInstallments = () => {
      const installmentsArray: Installment[] = []

      // [1,2,3,4,5,6].forEach(parcela => { //outra maneira para fazer a mesma coisa
      //   quantity: parcela,
      //   amount: totalPrice / parcela,
      //   formattedAmount: formataPreco(totalPrice / parcela)
      // })

      for (let i = 1; i <= 6; i++) {
        installmentsArray.push({
          quantity: i,
          amount: totalPrice / i,
          formattedAmount: formataPreco(totalPrice / i)
        })
      }
      return installmentsArray
    }

    if (totalPrice > 0) {
      setInstallments(calculateInstallments())
    }
  }, [totalPrice])

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(clearItems())
  //   }
  // }, [isSuccess, dispatch])

  // if (items.length === 0 && isSuccess === false) {
  //   return <Navigate to="/" />
  // }

  if (items.length === 0) {
    return <Navigate to="/" />
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  // const clear = () => {
  //   if (isSuccess) {
  //     dispatch(clearItems())
  //   }
  // }

  const formatPhoneNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      .slice(0, 15)
  }

  const formatCardNumber = (value: string) => {
    return (
      value
        // .replace(/\s?/g, '')
        .replace(/[^\d]/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19)
    )
  }

  const formatSecurityCode = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 3)
  }

  const formatMonth = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 2)
  }

  // const formatYear = (value: string) => {
  //   return value.replace(/\D/g, '').slice(0, 4)
  // }

  // const formatNumber = (value: string) => {
  //   return value.replace(/\D/g, '')
  // }

  const formatOnlyLetters = (value: string) => {
    return value.replace(/[^A-Za-zÀ-ÿ\s]/g, '')
  }

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      .slice(0, 14)
  }

  return (
    <ContainerGeral className="container">
      <ToastContainer
        containerId={'cartToast'}
        position="top-right"
        autoClose={3000}
        draggable
        pauseOnHover
        rtl={false}
        newestOnTop
        pauseOnFocusLoss
      />
      {isSuccess && data ? (
        <>
          <HeaderCheckout />
          <Card title="Muito obrigado">
            <div>
              <p>
                {items.length > 1
                  ? `É com satisfação que informamos que recebemos seu pedido dos jogos
                ${items.map((item) => item.name).join(', ')} com sucesso!`
                  : items.length === 1
                  ? `É com satisfação que informamos que recebemos seu pedido do jogo ${items[0].name} com sucesso!`
                  : null}
                <br />
                Abaixo estão os detalhes da sua compra:
                <br />
                Número do pedido: {data.orderId}
                <br />
                Data e horário da compra: {timestamp()}
                <br />
                Valor Total: {formataPreco(totalPrice)}
                <br />
                Forma de pagamento:
                {payWithCard ? ' Cartão de credito' : ' Boleto Bancário'}
                <br />
                {payWithCard
                  ? `Parcelado em: ${
                      form.values.installments
                    }x de ${formataPreco(
                      totalPrice / form.values.installments
                    )}`
                  : ''}
              </p>
              <br />
              <p>
                {payWithCard
                  ? `Para pagamento com cartão de crédito, a liberação do
                  código de ativação ocorrerá após a aprovação da transação pela
                  operadora do cartão. Você receberá o código no e-mail cadastrado
                  em nossa loja.`
                  : `Para pagamento via boleto bancário, lembre-se de
                  que a confirmação pode levar até 3 dias úteis. Após a aprovação do
                  pagamento, enviaremos um e-mail contendo o código de ativação do
                  jogo.`}
              </p>
              <br />
              <p>
                Pedimos que verifique sua caixa de entrada e a pasta de spam
                para garantir que receba nossa comunicação. Caso tenha alguma
                dúvida ou necessite de mais informações, por favor, entre em
                contato conosco através dos nossos canais de atendimento ao
                cliente.
              </p>
              <br />
              <p>
                Agradecemos por escolher a EPLAY e esperamos que desfrute do seu
                jogo!
              </p>
            </div>
          </Card>
        </>
      ) : (
        <>
          <Header />
          <Cont onSubmit={form.handleSubmit}>
            <Card title="Revise seu pedido">
              <>
                <ul className="revise">
                  {items.map((item) => (
                    <li key={item.id}>
                      <img src={item.media.thumbnail} alt={item.name} />
                      <div>
                        <h3>{item.name}</h3>
                        <span>{formataPreco(item.prices.current)}</span>
                      </div>
                      <Button
                        htmlType="button"
                        onClick={() => removeItem(item.id)}
                        title="Clique aqui para remover do carrinho"
                        type="button"
                      >
                        Remover
                      </Button>
                    </li>
                  ))}
                </ul>
                <p id="totalPrice">
                  Valor Total: <br />
                  {formataPreco(totalPrice)}
                </p>
              </>
            </Card>
            <Card title="Dados de cobrança">
              <>
                <Row>
                  <InputGroup>
                    <div className="group">
                      <label htmlFor="fullName">Nome completo:</label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={form.values.fullName}
                        onChange={(e) => {
                          form.handleChange(e)
                          form.setFieldValue(
                            'fullName',
                            formatOnlyLetters(e.target.value)
                          )
                        }}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('fullName') ? 'error' : ''
                        }
                      />
                    </div>
                    <small>
                      {getErrorMessage('fullName', form.errors.fullName)}
                    </small>
                  </InputGroup>
                  <InputGroup>
                    <div className="group">
                      <label htmlFor="telefone">Telefone:</label>
                      <input
                        id="telefone"
                        type="tel"
                        name="telefone"
                        value={form.values.telefone}
                        onChange={(e) => {
                          form.handleChange(e)
                          form.setFieldValue(
                            'telefone',
                            formatPhoneNumber(e.target.value)
                          )
                        }}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('telefone') ? 'error' : ''
                        }
                        inputMode="numeric"
                      />
                    </div>
                    <small>
                      {getErrorMessage('telefone', form.errors.telefone)}
                    </small>
                  </InputGroup>
                  <InputGroup>
                    <div className="group">
                      <label htmlFor="cpf">CPF:</label>
                      <input
                        id="cpf"
                        type="text"
                        name="cpf"
                        value={form.values.cpf}
                        onChange={(e) => {
                          form.handleChange(e)
                          form.setFieldValue('cpf', formatCPF(e.target.value))
                        }}
                        onBlur={form.handleBlur}
                        className={checkInputHasError('cpf') ? 'error' : ''}
                        inputMode="numeric"
                      />
                    </div>
                    <small>{getErrorMessage('cpf', form.errors.cpf)}</small>
                  </InputGroup>
                </Row>
                <h3>Dados de entrega - conteúdo digital</h3>
                <Row>
                  <InputGroup>
                    <div className="group">
                      <label htmlFor="deliveryEmail">E-mail:</label>
                      <input
                        id="deliveryEmail"
                        type="email"
                        name="deliveryEmail"
                        value={form.values.deliveryEmail}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('deliveryEmail') ? 'error' : ''
                        }
                      />
                    </div>
                    <small>
                      {getErrorMessage(
                        'deliveryEmail',
                        form.errors.deliveryEmail
                      )}
                    </small>
                  </InputGroup>
                  <InputGroup>
                    <div className="group">
                      <label htmlFor="confirmDeliveryEmail">
                        Confirme o E-mail:
                      </label>
                      <input
                        id="confirmDeliveryEmail"
                        type="text"
                        name="confirmDeliveryEmail"
                        value={form.values.confirmDeliveryEmail}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('confirmDeliveryEmail')
                            ? 'error'
                            : ''
                        }
                      />
                    </div>
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
                        <div className="group">
                          <label htmlFor="cardOwner">
                            Nome do titular do cartão:
                          </label>
                          <input
                            id="cardOwner"
                            type="text"
                            name="cardOwner"
                            value={form.values.cardOwner}
                            onChange={(e) => {
                              form.handleChange(e)
                              form.setFieldValue(
                                'cardOwner',
                                formatOnlyLetters(e.target.value)
                              )
                            }}
                            onBlur={form.handleBlur}
                            className={
                              checkInputHasError('cardOwner') ? 'error' : ''
                            }
                            required={payWithCard}
                            disabled={!payWithCard}
                          />
                        </div>
                        <small>
                          {getErrorMessage('cardOwner', form.errors.cardOwner)}
                        </small>
                      </InputGroup>
                      {payWithCard ? (
                        <InputGroup>
                          <div className="group">
                            <label htmlFor="cpfCardOwner">
                              CPF do titular do cartão:
                            </label>
                            <input
                              id="cpfCardOwner"
                              type="text"
                              name="cpfCardOwner"
                              value={form.values.cpfCardOwner}
                              onChange={(e) => {
                                form.handleChange(e)
                                form.setFieldValue(
                                  'cpfCardOwner',
                                  formatCPF(e.target.value)
                                )
                              }}
                              onBlur={form.handleBlur}
                              className={
                                checkInputHasError('cpfCardOwner')
                                  ? 'error'
                                  : ''
                              }
                              inputMode="numeric"
                              required={payWithCard}
                              disabled={!payWithCard}
                            />
                          </div>
                          {payWithCard && (
                            <small>
                              {getErrorMessage(
                                'cpfCardOwner',
                                form.errors.cpfCardOwner
                              )}
                            </small>
                          )}
                        </InputGroup>
                      ) : null}
                    </Row>
                    <Row marginTop="24px">
                      <InputGroup>
                        <div className="group">
                          <label htmlFor="cardDisplayName">
                            Nome no cartão:
                          </label>
                          <input
                            id="cardDisplayName"
                            type="text"
                            name="cardDisplayName"
                            value={form.values.cardDisplayName}
                            onChange={(e) => {
                              form.handleChange(e)
                              form.setFieldValue(
                                'cardDisplayName',
                                formatOnlyLetters(e.target.value)
                              )
                            }}
                            onBlur={form.handleBlur}
                            className={
                              checkInputHasError('cardDisplayName')
                                ? 'error'
                                : ''
                            }
                            required={payWithCard}
                            disabled={!payWithCard}
                          />
                        </div>
                        <small>
                          {getErrorMessage(
                            'cardDisplayName',
                            form.errors.cardDisplayName
                          )}
                        </small>
                      </InputGroup>
                      <InputGroup>
                        <div className="group">
                          <label htmlFor="cardNumber">Número do cartão:</label>
                          <input
                            id="cardNumber"
                            type="text"
                            name="cardNumber"
                            value={form.values.cardNumber}
                            onChange={(e) => {
                              form.handleChange(e)
                              form.setFieldValue(
                                'cardNumber',
                                formatCardNumber(e.target.value)
                              )
                            }}
                            onBlur={form.handleBlur}
                            className={
                              checkInputHasError('cardNumber') ? 'error' : ''
                            }
                            required={payWithCard}
                            disabled={!payWithCard}
                            inputMode="numeric"
                          />
                        </div>
                        <small>
                          {getErrorMessage(
                            'cardNumber',
                            form.errors.cardNumber
                          )}
                        </small>
                      </InputGroup>
                      <div className="expire">
                        <InputGroup maxWidth="95px">
                          <div className="group">
                            <label htmlFor="expiresMonth">
                              Mês de vencimento
                            </label>
                            <input
                              id="expiresMonth"
                              type="text"
                              name="expiresMonth"
                              value={form.values.expiresMonth}
                              onChange={(e) => {
                                form.handleChange(e)
                                form.setFieldValue(
                                  'expiresMonth',
                                  formatMonth(e.target.value)
                                )
                              }}
                              onBlur={form.handleBlur}
                              className={
                                checkInputHasError('expiresMonth')
                                  ? 'error'
                                  : ''
                              }
                              required={payWithCard}
                              disabled={!payWithCard}
                              inputMode="numeric"
                            />
                          </div>
                          <small>
                            {getErrorMessage(
                              'expiresMonth',
                              form.errors.expiresMonth
                            )}
                          </small>
                        </InputGroup>
                        <InputGroup maxWidth="95px">
                          <div className="group">
                            <label htmlFor="expiresYear">
                              Ano de vencimento
                            </label>
                            <input
                              id="expiresYear"
                              type="text"
                              name="expiresYear"
                              value={form.values.expiresYear}
                              onChange={(e) => {
                                form.handleChange(e)
                                form.setFieldValue(
                                  'expiresYear',
                                  formatMonth(e.target.value)
                                )
                              }}
                              onBlur={form.handleBlur}
                              className={
                                checkInputHasError('expiresYear') ? 'error' : ''
                              }
                              inputMode="numeric"
                              required={payWithCard}
                              disabled={!payWithCard}
                            />
                          </div>
                          <small>
                            {getErrorMessage(
                              'expiresYear',
                              form.errors.expiresYear
                            )}
                          </small>
                        </InputGroup>
                      </div>
                      <InputGroup id="cardCode1" maxWidth="48px">
                        <div className="group">
                          <label htmlFor="cardCode">CVV</label>
                          <input
                            id="cardCode"
                            type="text"
                            name="cardCode"
                            value={form.values.cardCode}
                            onChange={(e) => {
                              form.handleChange(e)
                              form.setFieldValue(
                                'cardCode',
                                formatSecurityCode(e.target.value)
                              )
                            }}
                            onBlur={form.handleBlur}
                            className={
                              checkInputHasError('cardCode') ? 'error' : ''
                            }
                            inputMode="numeric"
                            required={payWithCard}
                            disabled={!payWithCard}
                          />
                        </div>
                        <small>
                          {getErrorMessage('cardCode', form.errors.cardCode)}
                        </small>
                      </InputGroup>
                    </Row>
                    <Row marginTop="24px" id="lastRow">
                      <InputGroup id="cardCode2" maxWidth="48px">
                        <div className="group">
                          <label htmlFor="cardCode">CVV</label>
                          <input
                            id="cardCode"
                            type="text"
                            name="cardCode"
                            value={form.values.cardCode}
                            onChange={(e) => {
                              form.handleChange(e)
                              form.setFieldValue(
                                'cardCode',
                                formatSecurityCode(e.target.value)
                              )
                            }}
                            onBlur={form.handleBlur}
                            className={
                              checkInputHasError('cardCode') ? 'error' : ''
                            }
                            inputMode="numeric"
                            required={payWithCard}
                            disabled={!payWithCard}
                          />
                        </div>
                        <small>
                          {getErrorMessage('cardCode', form.errors.cardCode)}
                        </small>
                      </InputGroup>
                      <InputGroup maxWidth="140px">
                        <div className="group">
                          <label htmlFor="installments">Parcelamento</label>
                          <select
                            id="installments"
                            name="installments"
                            value={form.values.installments}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            className={
                              checkInputHasError('installments') ? 'error' : ''
                            }
                            required={payWithCard}
                            disabled={!payWithCard}
                          >
                            {installments.map((installment) => (
                              <option
                                key={installment.quantity}
                                value={installment.quantity}
                              >
                                {installment.quantity}X de{' '}
                                {installment.formattedAmount}
                              </option>
                            ))}
                          </select>
                        </div>
                        {getErrorMessage(
                          'installments',
                          form.errors.installments
                        )}
                      </InputGroup>
                    </Row>
                  </>
                ) : (
                  <p>
                    Ao optar por essa forma de pagamento, é importante lembrar
                    que a confirmação pode levar até 3 dias úteis, devido aos
                    prazos estabelecidos pelas instituições financeiras.
                    Portanto, a liberação do código de ativação do jogo
                    adquirido ocorrerá somente após a aprovação do pagamento do
                    boleto.
                  </p>
                )}
              </div>
            </Card>
            <Button
              htmlType="submit"
              type="button"
              title="Clique aqui para finalizar a compra"
              // onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Finalizando Compra...' : 'Finalizar a compra'}
            </Button>
          </Cont>
        </>
      )}
    </ContainerGeral>
  )
}
export default Checkout

//_________________________________________________________________________________________________________________________
