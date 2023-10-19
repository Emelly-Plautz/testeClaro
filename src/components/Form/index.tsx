import { FormControl, FormLabel, FormSelect } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./styles.css";
import cake1 from "../../assets/Images/cake1.jpg";
import cake2 from "../../assets/Images/cake2.jpg";
import cake3 from "../../assets/Images/cake3.jpg";
import cake4 from "../../assets/Images/cake4.jpg";
import { useEffect, useState } from "react";
import { ICountry, IForm } from "../../interfaces/globalInterfaces";
import * as formik from "formik";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import { MyVerticallyCenteredModal } from "../Modal";
import InputMask from "react-input-mask";

function FormComp() {
  const [countries, setCountries] = useState<ICountry[]>([
    { id: "", nome: "" },
  ]);
  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/paises")
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((country: ICountry) => {
          return {
            id: country.id,
            nome: country.nome,
          };
        });
        setCountries(options);
      });
  }, []);
  const { Formik } = formik;
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required().min(16).max(16),
    cake: yup.number().required().oneOf([1, 2, 3, 4], "need select one"),
    stretAddress: yup.string().notRequired(),
    stretAddress2: yup.string().notRequired(),
    city: yup.string().notRequired(),
    region: yup.string().notRequired(),
    zipCode: yup.number().notRequired(),
    country: yup.string().notRequired(),
    selectedDate: yup.date().min(new Date(), "need select a future date"),
    deliveryTime: yup.string().notRequired(),
  });
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cake, setCake] = useState(0);

  function submit(form: IForm) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
        cake: form.cake,
        stretAddress: form.stretAddress,
        stretAddress2: form.stretAddress2,
        city: form.city,
        region: form.region,
        zipCode: form.zipCode,
        selectedDate: form.selectedDate,
        deliveryTime: form.deliveryTime,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.ok) {
        setName(form.firstName);
        setEmail(form.email);
        setPhone(form.phone);
        setCake(form.cake);
        setModalShow(true);
      }
    });
  }

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={submit}
        initialValues={{
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          cake: 0,
          stretAddress: "",
          stretAddress2: "",
          city: "",
          region: "",
          zipCode: "",
          selectedDate: "",
          deliveryTime: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate className="form" onSubmit={handleSubmit}>
            <h2>
              Please choose your favorite cake from among the following:
              <span className="textColor">*</span>
            </h2>
            <Form.Group className="checkBox">
              <div className="boxContent">
                <Form.Check
                  name="cake"
                  type="radio"
                  onChange={handleChange}
                  isInvalid={!!errors.cake}
                  feedback={errors.cake}
                  feedbackType="invalid"
                  id="validationFormik0"
                  value={1}
                />
                <img src={cake1} alt="" />
              </div>
              <div className="boxContent">
                <Form.Check
                  name="cake"
                  type="radio"
                  onChange={handleChange}
                  isInvalid={!!errors.cake}
                  feedback={errors.cake}
                  feedbackType="invalid"
                  id="validationFormik0"
                  value={2}
                />
                <img src={cake2} alt="" />
              </div>
            </Form.Group>
            <Form.Group className="checkBox">
              <div className="boxContent">
                <Form.Check
                  name="cake"
                  type="radio"
                  onChange={handleChange}
                  isInvalid={!!errors.cake}
                  feedback={errors.cake}
                  feedbackType="invalid"
                  id="validationFormik0"
                  value={3}
                />
                <img src={cake3} alt="" />
              </div>
              <div className="boxContent">
                <Form.Check
                  name="cake"
                  type="radio"
                  onChange={handleChange}
                  isInvalid={!!errors.cake}
                  feedback={errors.cake}
                  feedbackType="invalid"
                  id="validationFormik0"
                  value={4}
                />
                <img src={cake4} alt="" />
              </div>
              ​
            </Form.Group>
            <p>Order Information</p>
            <div className="persoanlInformation">
              <div className="contentSeparation">
                <div className="conteinerInput">
                  <FormLabel className="title">
                    Name <span className="textColor">*</span>
                  </FormLabel>
                  <div className="contentSeparation">
                    <Form.Group
                      controlId="validationFormik01"
                      className="conteinerInput"
                    >
                      <FormControl
                        required
                        type="text"
                        placeholder="First"
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        First Name is a required field
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      controlId="validationFormik01"
                      className="conteinerInput"
                    >
                      <FormControl
                        type="text"
                        placeholder="Last"
                        value={values.lastName}
                        name="lastName"
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        Last Name is a required field
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
              </div>
              <div className="contentSeparation">
                <div className="conteinerInput">
                  <FormLabel className="title">Delivery Date</FormLabel>
                  <Form.Group>
                    <FormControl
                      placeholder="dd/mm/yyyy"
                      type="date"
                      onChange={handleChange}
                      name="selectedDate"
                      isValid={touched.selectedDate && !errors.selectedDate}
                      isInvalid={!!errors.selectedDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.selectedDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="conteinerInput">
                  <FormLabel className="title">Preferent</FormLabel>
                  <Form.Group>
                    <FormControl
                      placeholder="HH:MM"
                      type="time"
                      value={values.deliveryTime}
                      name="deliveryTime"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="contentSeparation">
                <div className="conteinerInput">
                  <FormLabel className="title">
                    Phone <span className="textColor">*</span>
                  </FormLabel>
                  <Form.Group>
                    <FormControl
                      value={values.phone}
                      onChange={handleChange}
                      name="phone"
                      placeholder="### ### ###"
                      type="phone"
                      isInvalid={!!errors.phone}
                      isValid={touched.phone && !errors.phone}
                      as={InputMask}
                      mask="(99) 9 9999-9999"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="conteinerInput">
                  <FormLabel className="title">
                    E-mail <span className="textColor">*</span>
                  </FormLabel>
                  <Form.Group className="emailGroup">
                    <div className="emailInput">
                      <FormControl
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        isValid={touched.email && !errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </div>
                    <h6>To receive the complete receipt</h6>
                  </Form.Group>
                </div>
              </div>
              <div className="contentSeparation">
                <div className="conteinerInput">
                  <FormLabel className="title">Address</FormLabel>
                  <Form.Group className="conteinerInput">
                    <FormControl
                      placeholder="Stret Address"
                      type="text"
                      value={values.stretAddress}
                      name="stretAddress"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="contentSeparation">
                <Form.Group className="conteinerInput">
                  <FormControl
                    placeholder="Stret Address Line 2"
                    type="text"
                    value={values.stretAddress2}
                    name="stretAddress2"
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className="contentSeparation">
                <Form.Group className="conteinerInput">
                  <FormControl
                    type="text"
                    placeholder="City"
                    value={values.city}
                    name="city"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="conteinerInput">
                  <FormControl
                    type="text"
                    placeholder="Region"
                    value={values.region}
                    name="region"
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className="contentSeparation">
                <Form.Group className="conteinerInput">
                  <FormControl
                    type="text"
                    placeholder="Postl / Zip Code"
                    value={values.zipCode}
                    name="zipCode"
                    isInvalid={!!errors.zipCode}
                    isValid={touched.zipCode && !errors.zipCode}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                  {errors.zipCode}
                </Form.Control.Feedback>
                <Form.Group className="conteinerInput">
                  <FormSelect
                    aria-label="Default select example"
                    name="country"
                    onChange={handleChange}
                  >
                    <option>Country</option>
                    {countries.map((country, i) => (
                      <option value={i} key={i}>
                        {country.nome}
                      </option>
                    ))}
                  </FormSelect>{" "}
                </Form.Group>
              </div>
              <Button className="button" type="submit">
                Order
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          window.location.reload();
        }}
        name={name}
        email={email}
        phone={phone}
        cake={cake}
      />
    </>
  );
}
export default FormComp;
