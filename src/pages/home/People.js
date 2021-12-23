import React, { useState, useEffect } from "react";
import { Container, Button, Col, Row, Modal, Form } from "react-bootstrap";
import nedb from "nedb";
import { toast } from "react-toastify";

var db = new nedb({
  filename: "people.db",
  autoload: true,
});

function People() {
  const [people, setPeople] = useState([]);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [procurar, setProcurar] = useState("");
  const [filtro, setFiltro] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => setShowEdit(false);
  const [showPostModal, setShowPostModal] = useState(false);



  useEffect(() => {
    if (procurar === "") {
      db.find({})
        .sort({ nome: 1 })
        .exec((err, users) => {
          if (err) return console.log(err);
          setPeople(users);
          setFiltro(users);
        });
    } else {
      setFiltro(
        people.filter(
          (item) =>
            item.nome.toLowerCase().indexOf(procurar.toLocaleLowerCase()) > -1
        ));
    }
  }, [procurar,showPostModal]);
  //ADICIONA UM NOVO CADASTRO
  const handleAddPerson = () => {
    var usuario = {
      nome: name,
      email: email,
      telefone: phone,
    };
    db.insert(usuario, function (err) {
      if (err) return console.log(err); //caso ocorrer algum erro    
      toast.success("Usuário Inserido com sucesso!"); 
      togglePostModal();
    });  
  };
  //DELETA O CADASTRO ATUAL
  const handleDelete = (id) => {
    if (window.confirm('Deseja realmente excluir o cadastro?')){
      db.remove({ _id: id }, {}, function (err) {
        if (err) return console.log(err);
      });
      window.location.reload();
    }   
   
  }
  //EDITA CADASTRO ATUAL
  const handleEditPerson = () => {
    db.update({ _id: id }, { nome: name, email: email, telefone: phone }, {}, function (err) {
      if (err) return console.log(err);  
      toast.success("Usuário atualizado com sucesso!"); 
      togglePostModal();      
    });
   
   
  }

  function modalEdit(users) {
    setId(users._id);
    setName(users.nome);
    setEmail(users.email);
    setPhone(users.telefone);
    setShowEdit(true);
  }

  // function recuperaPerson() {
  //   db.find({ id: id }, function (err, users) {
  //     if (err) return console.log(err);
  //     setId(users._id);
  //     setName(users.nome);
  //     setEmail(users.email);
  //     setPhone(users.telefone);
  //   });
  // }
  function togglePostModal() {
    setShowPostModal(!showPostModal); //trocando de true pra false   
  }

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

      {/* ###################################################################MODA EDITAR */}
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header>
          <Modal.Title>Editar Cadastro</Modal.Title>
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
                      value={name}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      value={email}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      onChange={(event) => setPhone(event.target.value)}
                      type="text"
                      value={phone}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleEditClose();
              handleEditPerson();
            }}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>


      {/* botão cadastrar */}

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
                    <td><Button variant="outlined" color="error" onClick={() => handleDelete(person._id)}>Excluir</Button> | <Button variant="outlined" color="error" onClick={() => modalEdit(person)}>Editar</Button></td>
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
