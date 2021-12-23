import React, { useState, useEffect } from "react";
import { Container, Button, Col, Row, Modal, Form } from "react-bootstrap";
//var nedb = require('nedb');
import nedb from "nedb";

var db = new nedb({
  filename: "people.db",
  autoload: true,
});



function People() {
 
  const [people, setPeople] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    db.find({})
    .sort({ nome: 1 })
    .exec((err, users) => {
      if (err) return console.log(err);
      setPeople(users);
      console.log(users);
    });

  },[]); 

  const handleAddPerson = () => {   
    var usuario = {
      nome: name,
      email: email,
      telefone: phone,
    };

    db.insert(usuario, function (err) {
      if (err) return console.log(err); //caso ocorrer algum erro
      console.log("Novo usuário adicionado!");
    });   
  };
   //Recuperando
    //  db.find({ nome: 'Marco Antonio' }, function (err, usuarios) {
    //   if(err)return console.log(err);
    //   console.log(usuarios);
    //  });

    //Atualizando
    //  db.update({ email: 'pedro@gmail.com' }, {nome: "Carlos", email: "carlos@gmail.com"}, {}, function (err) {
    //   if(err)return console.log(err);
    //   console.log("Usuário atualizado");
    //  });

    //Removendo
    // db.remove({ _id: "vxJMEAMBFLmkUmKY" }, {}, function (err) {
    //   if(err)return console.log(err);

    //   console.log("Usuário removido");
    // });  

  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Cadastrar Pessoa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      onChange={(event) => setName(event.target.value)}
                      type="text"
                      placeholder="Digite o nome"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      placeholder="Digite o Email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      onChange={(event) => setPhone(event.target.value)}
                      type="text"
                      placeholder="Digite o telefone"
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleAddPerson();
            }}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Row>
          <Col>
            <h2 className="mt-2">Pessoas</h2>
          </Col>
          <Col>
            <Button onClick={handleShow}>Cadastrar</Button>
          </Col>
        </Row>
        <Row>.......</Row>
        <Row>
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Opções</th>
              </tr>
            </thead>
            <tbody>
            {people.map((person, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <p className="w-100" rows="5">
                          {person.nome}{" "}
                        </p>
                      </td>
                      <td>{person.email}</td>
                      <td>{person.telefone}</td>
                      <td>editar | excluir</td>
                    </tr>
                  );
                })}
              </tbody>
              {/* {people && people.map(renderRow)}</tbody> */}
          </table>
        </Row>
      </Container>
    </>
  );
}
export default People;
