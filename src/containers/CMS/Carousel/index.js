import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCarousel,
  addCarousel,
  deleteCarouselById,
  updateCarouselById,
} from "../../../actions";

function Carousel() {
  const [show, setShow] = useState(false);
  const [caption, setCaption] = useState("");
  const [link, setLink] = useState("");
  const [carouselPicture, setCarouselPicture] = useState(""); // Change to a single file state
  const [editCarousel, seteditCarousel] = useState({});
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [carouselDetails, setcarouselDetails] = useState(null);
  const Carousel = useSelector((state) => state.carousel);
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
  };

  console.log("here is edit carousel", editCarousel);
  useEffect(() => {
    dispatch(getAllCarousel());
    // dispatch(getAllCategory());
  }, [dispatch]);
  const submitCarouselForm = () => {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("link", link);
    formData.append("carouselImage", carouselPicture);

    // Log the FormData object to check its content
    console.log("Form Data:", formData);

    dispatch(addCarousel(formData)).then(() => setShow(false));
  };

  const updateCarousel = () => {
    // Create a form with updated product details
    const form = new FormData();
    form.append("caption", editCarousel.caption);
    form.append("link", editCarousel.link);
    form.append("carouselImage", carouselPicture);

    let carouselId = editCarousel._id;
    // Dispatch the update action to the backend
    // Add the code to dispatch the update action here
    dispatch(updateCarouselById(carouselId, form)).then(() =>
      closeeditCarouselModal()
    );
    // Close the edit modal
    // closeeditCarouselModal();
  };
  const handleShow = () => setShow(true);

  const renderCarousel = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Caption</th>
            <th>Link</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Carousel.carousels.length > 0
            ? Carousel.carousels.map((carousel, index) => (
                <tr key={carousel._id}>
                  <td>{index + 1}</td>
                  <td>{carousel.caption}</td>
                  <td>{carousel.link}</td>
                  <td>image</td>

                  <td>
                    <button
                      className="view-btn hover-btn mx-2"
                      onClick={() => showcarouselDetailsModal(carousel)}
                    >
                      info
                    </button>
                    <button
                      className="view-btn hover-btn mx-2"
                      onClick={() => showeditCarouselModal(carousel)}
                    >
                      edit
                    </button>
                    <button
                      className="view-btn hover-btn"
                      onClick={() => {
                        const carouselId = carousel._id;
                        console.log("here is carousel id ", carouselId);
                        dispatch(deleteCarouselById(carouselId));
                      }}
                    >
                      del
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const handleCarouselPictures = (e) => {
    console.log(e.target.files[0]);
    setCarouselPicture(e.target.files[0]);
  };

  const renderAddCarouselModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Carousel"}
        onSubmit={submitCarouselForm}
        // encType="multipart/form-data"
      >
        <Input
          label="Caption"
          value={caption}
          placeholder={`Carousel Caption`}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Input
          label="Link"
          value={link}
          placeholder={`Link`}
          onChange={(e) => setLink(e.target.value)}
        />
        {carouselPicture ? <div>{carouselPicture.name}</div> : null}
        <input
          type="file"
          name="carouselImage"
          onChange={handleCarouselPictures}
        />
      </Modal>
    );
  };
  const rendereditCarouselModal = () => {
    if (!editCarousel) {
      return null;
    }

    return (
      <Modal
        show={editModalVisible}
        handleClose={closeeditCarouselModal}
        modalTitle={"Edit Carousel"}
        onSubmit={updateCarousel}
      >
        {/* Input fields to edit the product details */}
        <Input
          label="Caption"
          value={editCarousel.caption}
          onChange={(e) =>
            seteditCarousel({ ...editCarousel, caption: e.target.value })
          }
        />
        <Input
          label="Link"
          value={editCarousel.link}
          onChange={(e) =>
            seteditCarousel({ ...editCarousel, link: e.target.value })
          }
        />
        <Row>
          <Col>
            {editCarousel.carouselImage &&
            editCarousel.carouselImage.length > 0 ? ( // Check if carouselImage is defined and has a length
              editCarousel.carouselImage.map((picture) => (
                <div className="productImgContainer" key={picture._id}>
                  <img
                    src={`http://192.168.100.5:443/images/${picture.img}`}
                    alt=""
                  />
                </div>
              ))
            ) : (
              <p>No Carousel pictures available.</p>
            )}
          </Col>
        </Row>
        <input
          type="file"
          name="carouselImage"
          onChange={handleCarouselPictures}
        />
      </Modal>
    );
  };

  // Function to open the edit modal
  const showeditCarouselModal = (carousel) => {
    seteditCarousel(carousel);
    setEditModalVisible(true);
  };

  // Function to close the edit modal
  const closeeditCarouselModal = () => {
    setEditModalVisible(false);
    seteditCarousel({}); // Clear the product details
  };
  const handleClosecarouselDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showcarouselDetailsModal = (carousel) => {
    setcarouselDetails(carousel);
    setProductDetailModal(true);
  };

  const rendercarouselDetailsModal = () => {
    if (!carouselDetails) {
      return null;
    }

    return (
      <Modal
        show={productDetailModal}
        handleClose={handleClosecarouselDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Caption</label>
            <p className="value">{carouselDetails.caption}</p>
          </Col>
          <Col md="6">
            <label className="key">Link</label>
            <p className="value">{carouselDetails.link}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Carousel Pictures</label>
            <div style={{ display: "flex" }}>
              {carouselDetails.carouselImage.map((picture) => (
                <div className="productImgContainer">
                  <img
                    key={picture._id}
                    // src={picture.img} alt="" />
                    src={`http://192.168.100.5:443/images/${picture.img}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Carousels</h3>
              <button className="view-btn hover-btn" onClick={handleShow}>
                Add
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderCarousel()}</Col>
        </Row>
      </Container>
      {renderAddCarouselModal()}
      {rendereditCarouselModal()}
      {rendercarouselDetailsModal()}
      <div>index</div>
    </Layout>
  );
}

export default Carousel;
