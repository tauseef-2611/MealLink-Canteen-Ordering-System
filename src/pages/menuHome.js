import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Container, Row, Col, Card, Offcanvas, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { CirclePlus } from "lucide-react";
import { useCart } from '../context/CartContext';

function MenuHome() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null); // For side panel details

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/item/categories");
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to fetch categories.");
        console.error("Error fetching categories:", error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/item/");
        setItems(response.data);
      } catch (error) {
        toast.error("Failed to fetch items.");
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchItems();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section mb-5" style={{ position: 'relative', overflow: 'hidden' }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?fm=jpg&q=60&w=3000"
              alt="First slide"
              style={{ objectFit: 'cover', height: '400px' }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8))',
              }}
            ></div>
            <Carousel.Caption>
              <h3 className="text-light">Delicious Meals</h3>
              <p className="text-light">Experience the best food from the comfort of your home.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://plus.unsplash.com/premium_photo-1661777692723-ba8dd05065d9?fm=jpg&q=60&w=3000"
              alt="Second slide"
              style={{ objectFit: 'cover', height: '400px' }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8))',
              }}
            ></div>
            <Carousel.Caption>
              <h3 className="text-light">Fresh Ingredients</h3>
              <p className="text-light">Only the freshest ingredients for our dishes.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Category-wise Menu Display */}
      <Container>
        {categories.map((category) => (
          <div key={category} className="mb-5">
            <h2 className="mb-4 text-gradient">{category}</h2>
            <Row xs={1} sm={2} md={3} lg={4}>
              {items
                .filter((item) => item.category === category)
                .map((item) => (
                  <Col key={item._id} className="mb-4">
                    <Card
                      className="h-100 shadow-sm"
                      style={{ overflow: "hidden" }}
                      onClick={() => setSelectedItem(item)} // Open side panel
                    >
                      <Card.Img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{ objectFit: "cover", height: "200px" }}
                      />
                      <Card.Body>
                        <Card.Title className="text-gradient">{item.name}</Card.Title>
                        <Card.Text className="text-muted">{item.description}</Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">₹{item.price.toFixed(2)}</span>
                          <CirclePlus
                            size={24}
                            className="text-primary"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card click event
                              addItem({ id: item._id, name: item.name, price: item.price });
                              toast.success("Item added to cart!");
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        ))}
      </Container>

      {/* Side Panel for Item Details */}
      <Offcanvas
        show={!!selectedItem}
        onHide={() => setSelectedItem(null)}
        placement="end"
        backdrop="static"
      >
        {selectedItem && (
          <>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>{selectedItem.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                className="img-fluid rounded mb-3"
              />
              <p>{selectedItem.description}</p>
              <p className="fw-bold">Price: ₹{selectedItem.price.toFixed(2)}</p>
              <div className="d-flex align-items-center">
                <Button
                  size={32}
                  onClick={() => {
                    addItem({ id: selectedItem._id, name: selectedItem.name, price: selectedItem.price });
                    toast.success("Item added to cart!");
                  }}
                  style={{ cursor: "pointer" }}
                >
                Add to Cart
                </Button>
              </div>
            </Offcanvas.Body>
          </>
        )}
      </Offcanvas>
    </div>
  );
}

export default MenuHome;
