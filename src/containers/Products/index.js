import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  addProduct,
  updateProductById,
  deleteProductById,
  getAllCategory,
} from "../../actions";
import "./style.css";

const Products = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [editProduct, setEditProduct] = useState({});
  const [editModalVisible, setEditModalVisible] = useState(false);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const categoryList = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
  };

  const [activeAccordion, setActiveAccordion] = useState("");

  const toggleAccordion = (categoryId) => {
    setActiveAccordion(activeAccordion === categoryId ? "" : categoryId);
  };
  // useEffect(() => {
  //   dispatch(getProducts());
  //   dispatch(getAllCategory());
  // }, [dispatch]);
  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("brand", brand);
    form.append("color", color);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form)).then(() => setShow(false));
  };
  const handleShow = () => setShow(true);

  // Function to update the product
  const updateProduct = () => {
    // Create a form with updated product details
    const form = new FormData();
    form.append("name", editProduct.name);
    form.append("quantity", editProduct.quantity);
    form.append("brnad", editProduct.brand);
    form.append("color", editProduct.color);
    form.append("price", editProduct.price);
    form.append("description", editProduct.description);
    form.append("category", editProduct.category._id);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    let productId = editProduct._id;
    // Dispatch the update action to the backend
    // Add the code to dispatch the update action here
    dispatch(updateProductById(productId, form)).then(() =>
      closeEditProductModal()
    );
    // Close the edit modal
    // closeEditProductModal();
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    // console.log("here is prodcts", product);
    return (
      <div>
        {categoryList.map((category) => (
          <Card key={category._id}>
            <Card.Header
              onClick={() => toggleAccordion(category._id)}
              style={{ cursor: "pointer" }}
            >
              {category.name}
            </Card.Header>
            {activeAccordion === category._id && (
              <Card.Body>
                <Table style={{ fontSize: 12 }} responsive="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Color</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {product.products
                    .filter((prod) => prod.category._id === category._id)
                    .map((filteredProduct, index) => (
                      <tr key={filteredProduct._id}>
                        {console.log(
                          "here is filtered products",
                          filteredProduct
                        )}
                        <td>{index + 1}</td>
                        <td> {filteredProduct.name}</td>
                        <td>{filteredProduct.price}</td>
                        <td>{filteredProduct.quantity}</td>
                        <td>{filteredProduct.color}</td>
                        <td>{filteredProduct.category.name}</td>
                        {/* //                 <td>{product.name}</td>
  //                 <td>{product.price}</td>
  //                 <td>{product.quantity}</td>
  //                 <td>{product.color}</td>
  //                 <td>{product.category.name}</td> */}
                        <td>
                          <button
                            className="view-btn hover-btn mx-2"
                            onClick={() => showProductDetailsModal(filteredProduct)}
                          >
                            info
                          </button>
                          <button
                            className="view-btn hover-btn mx-2"
                            onClick={() => showEditProductModal(filteredProduct)}
                          >
                            edit
                          </button>
                          <button
                            className="view-btn hover-btn"
                            onClick={() => {
                              const productId = filteredProduct._id;
                              dispatch(deleteProductById(productId));
                            }}
                          >
                            del
                          </button>
                        </td>
                      </tr>
                    ))}
                </Table>
              </Card.Body>
            )}
          </Card>
        ))}
      </div>
    );
  };

  // const renderProducts = () => {
  //   console.log("here is prodcts", product);
  //   return (
  //     <Table style={{ fontSize: 12 }} responsive="sm">
  //       <thead>
  //         <tr>
  //           <th>#</th>
  //           <th>Name</th>
  //           <th>Price</th>
  //           <th>Quantity</th>
  //           <th>Color</th>
  //           <th>Category</th>
  //           <th>Actions</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {product.products.length > 0
  //           ? product.products.map((product, index) => (
  //               <tr key={product._id}>
  //                 <td>{index + 1}</td>
  //                 <td>{product.name}</td>
  //                 <td>{product.price}</td>
  //                 <td>{product.quantity}</td>
  //                 <td>{product.color}</td>
  //                 <td>{product.category.name}</td>
  //                 <td>
  //                   <button
  //                     className="view-btn hover-btn mx-2"
  //                     onClick={() => showProductDetailsModal(product)}
  //                   >
  //                     info
  //                   </button>
  //                   <button
  //                     className="view-btn hover-btn mx-2"
  //                     onClick={() => showEditProductModal(product)}
  //                   >
  //                     edit
  //                   </button>
  //                   <button
  //                     className="view-btn hover-btn"
  //                     onClick={() => {
  //                       const productId = product._id;
  //                       dispatch(deleteProductById(productId));
  //                     }}
  //                   >
  //                     del
  //                   </button>
  //                 </td>
  //               </tr>
  //             ))
  //           : null}
  //       </tbody>
  //     </Table>
  //   );
  // };

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Product"}
        onSubmit={submitProductForm}
      >
        <Input
          label="Name"
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder={`Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Brand"
          value={brand}
          placeholder={`Brand`}
          onChange={(e) => setBrand(e.target.value)}
        />
        <Input
          label="color"
          value={color}
          placeholder={`Color`}
          onChange={(e) => setColor(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  const renderEditProductModal = () => {
    if (!editProduct) {
      return null;
    }

    return (
      <Modal
        show={editModalVisible}
        handleClose={closeEditProductModal}
        modalTitle={"Edit Product"}
        onSubmit={updateProduct}
      >
        {/* Input fields to edit the product details */}
        <Input
          label="Name"
          value={editProduct.name}
          onChange={(e) =>
            setEditProduct({ ...editProduct, name: e.target.value })
          }
        />
        <Input
          label="Quantity"
          value={editProduct.quantity}
          onChange={(e) =>
            setEditProduct({ ...editProduct, quantity: e.target.value })
          }
        />
        <Input
          label="Brand"
          value={editProduct.brand}
          onChange={(e) =>
            setEditProduct({ ...editProduct, brand: e.target.value })
          }
        />
        <Input
          label="Color"
          value={editProduct.color}
          onChange={(e) =>
            setEditProduct({ ...editProduct, color: e.target.value })
          }
        />
        <Input
          label="Price"
          value={editProduct.price}
          onChange={(e) =>
            setEditProduct({ ...editProduct, price: e.target.value })
          }
        />
        <Input
          label="Description"
          value={editProduct.description}
          onChange={(e) =>
            setEditProduct({ ...editProduct, description: e.target.value })
          }
        />
        <select
          className="form-control"
          // value={editProduct.category._id}
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              category: { _id: e.target.value },
            })
          }
        >
          <option>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            {/* <div style={{ display: "flex" }}> */}
            {editProduct.productImage && editProduct.productImage.length > 0 ? (
              editProduct.productImage.map((picture) => (
                <div className="productImgContainer" key={picture._id}>
                  <img
                    // key={picture._id}
                    // src={picture.img} alt="" />
                    src={`http://192.168.100.5:443/images/${picture.img}`}
                    alt=""
                  />
                </div>
              ))
            ) : (
              <p>No product pictures available.</p>
            )}
            {/* </div> */}
          </Col>
        </Row>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  // Function to open the edit modal
  const showEditProductModal = (product) => {
    setEditProduct(product);
    setEditModalVisible(true);
  };

  // Function to close the edit modal
  const closeEditProductModal = () => {
    setEditModalVisible(false);
    setEditProduct({}); // Clear the product details
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            {/* <p className="value">{getCategoryName(productDetails.category)}</p> */}
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Brand</label>
            <p className="value">{productDetails.brand}</p>
          </Col>
          <Col md="6">
            <label className="key">Color</label>
            <p className="value">{productDetails.color}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productImage.map((picture) => (
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
              <h3>Products</h3>
              <button className="view-btn hover-btn" onClick={handleShow}>
                Add
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
      {renderEditProductModal()} {/* Render the edit product modal */}
    </Layout>
  );
};

export default Products;
