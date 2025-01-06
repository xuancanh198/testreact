import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const FileExplorer = () => {
  const [arrayFiles, setArrayFiles] = useState([
    {
      fileName: "src",
      type: "folder",
      subFiles: [
        {
          fileName: "components",
          type: "folder",
          subFiles: [
            { fileName: "Header.js", type: "file" },
            { fileName: "Footer.js", type: "file" },
          ],
        },
        { fileName: "App.js", type: "file" },
      ],
    },
    { fileName: "README.md", type: "file" },
  ]);

  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("file");
  const [targetPath, setTargetPath] = useState("");

  const handleClose = () => {
    setShow(false);
    setNewName("");
    setTargetPath("");
    setNewType("file");
  };

  const handleShow = (path) => {
    setTargetPath(path);
    setShow(true);
  };

  const addFileOrFolder = (e, path) => {
    e.preventDefault();
    handleShow(path);
  };

  const handleSubmit = () => {
    if (!newName.trim()) return alert("Tên không được để trống!");

    const addItem = (files, path) => {
      if (path.length === 0) {
        return [...files, { fileName: newName, type: newType, subFiles: [] }];
      }
      return files.map((file) => {
        if (file.type === "folder" && path[0] === file.fileName) {
          return {
            ...file,
            subFiles: addItem(file.subFiles || [], path.slice(1)),
          };
        }
        return file;
      });
    };

    const updatedFiles = addItem(arrayFiles, targetPath.split("/").slice(1));
    setArrayFiles(updatedFiles);
    handleClose();
  };

  const renderTree = (files, path = "") => {
    return files.map((item) => {
      const currentPath = `${path}/${item.fileName}`;

      return item.type === "folder" ? (
        <Accordion.Item eventKey={currentPath} key={currentPath}>
          <Accordion.Header
            onContextMenu={(e) => addFileOrFolder(e, currentPath)}
          >
            <i className="fa-solid fa-folder me-2"></i>
            {item.fileName}
          </Accordion.Header>
          <Accordion.Body>
            {item.subFiles && renderTree(item.subFiles, currentPath)}
          </Accordion.Body>
        </Accordion.Item>
      ) : (
        <div
          key={currentPath}
          className="d-flex align-items-center ms-4"
          style={{ marginLeft: "20px" }}
        >
          <i className="fa-solid fa-file me-2"></i>
          <p className="mb-0">{item.fileName}</p>
        </div>
      );
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-4">
            <Form.Control
              type="text"
              placeholder="Tên file hoặc folder"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </InputGroup>
          <Form.Select
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          >
            <option value="file">File</option>
            <option value="folder">Folder</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Thêm mới
          </Button>
        </Modal.Footer>
      </Modal>
     <div className="row">
      <div className="col-3">
          <Accordion defaultActiveKey={[]} alwaysOpen>
            {renderTree(arrayFiles)}
          </Accordion>
      </div>
     </div>
    </>
  );
};

export default FileExplorer;
