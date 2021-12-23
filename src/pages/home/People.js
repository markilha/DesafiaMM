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
  const [procurar, setProcurar] = useState("");
  const [filtro, setFiltro] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (procurar === "") {
      db.find({})
      .sort({ nome: 1 })
      .exec((err, users) => {
        if (err) return console.log(err);
        setPeople(users);
       setFiltro(users);
       console.log(users)
      });      
    }else{
      setFiltro(
        people.filter(
          (item) =>
            item.nome.toLowerCase().indexOf(procurar.toLocaleLowerCase()) > -1
        ));
    }   
  },[procurar]); 

  const handleAddPerson = () => {   
    var usuario = {
      nome: name,
      email: email,
      telefone: phone,
    };
    db.insert(usuario, function (err) {
      if (err) return console.log(err); //caso ocorrer algum erro    
      alert("Novo usuário adicionado!")
    }); 
    window.location.reload();
  };

  const handleDelete =(id)=>{
      db.remove({ _id: id }, {}, function (err) {
      if(err)return console.log(err);
      alert("Usuário removido com sucesso!!!")
      window.location.reload();
    });
  }
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
        <input
            type="text"
            placeholder="Pesquisar nome"
            value={procurar}
            onChange={(e) => setProcurar(e.target.value)}
         />
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
            {filtro.map((person, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <p className="w-100" rows="5">
                          {person.nome}{" "}
                        </p>
                      </td>
                      <td>{person.email}</td>
                      <td>{person.telefone}</td>
                      <td><Button variant="outlined" color="error" onClick={() => handleDelete(person._id)}>Excluir</Button> | <Button variant="outlined" color="error" onClick={() => alert('Em construção!!!')}>Editar</Button></td>
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
