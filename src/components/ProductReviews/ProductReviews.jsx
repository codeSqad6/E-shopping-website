import { useEffect, useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./product-review.css";
import { toast } from "react-toastify";
const ProductReviews = ({ productId }) => {
  const [listSelected, setListSelected] = useState("desc");
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Assuming JWT or user info is stored here

  useEffect(() => {
    const fetchData = async () => {
      try {
       

        const reviewRes = await axios.get("http://test.smartsto0re.shop/api/Review");
        const allReviews = reviewRes.data;

        const productReviews = allReviews.filter(
          (review) => review.productId === productId
        );

        const userNames = {};
        for (const review of productReviews) {
          if (!userNames[review.userId]) {
            try {
              const userRes = await axios.get(
                `http://test.smartsto0re.shop/api/Auth/${review.userId}`
              );
              userNames[review.userId] = userRes.data.fullName || "Unknown";
            } catch {
              userNames[review.userId] = "Unknown";
            }
          }
        }

        const detailed = productReviews.map((r) => ({
          rating: r.rating,
          comment: r.comment,
          userName: userNames[r.userId],
        }));

        setReviews(detailed);
      } catch (err) {
        console.error("Error loading reviews:", err);
      }
    };

    fetchData();
  }, [productId]);

const handleSave = async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!rating || !comment.trim()) {
    toast.warning("Please complete all fields.");
    return;
  }

  const formData = new FormData();
  formData.append("Rating", rating);
  formData.append("Comment", comment);
  formData.append("ProductId", productId);
  formData.append("UserId", userId);

  console.log("DEBUG =>", {
    Rating: rating,
    Comment: comment,
    ProductId: productId,
    UserId: userId
  });

  try {
    await axios.post("http://test.smartsto0re.shop/api/Review", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Review submitted successfully");
    setShowModal(false);
    setRating(0);
    setComment("");
    window.location.reload();
  } catch (err) {
    console.error("Failed to submit review", err.response?.data || err.message);
    toast.error("Submission failed, check your input.");
  }
};



  const handleOpenModal = () => {
     const token = localStorage.getItem("token");
   if (!token) {
    toast.warning("Please login to add a review.");
    navigate("/login");; // or /login
    } else {
      setShowModal(true);
    }
  };

  const renderStarRating = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa fa-star ${
            i <= (hoveredStar || rating) ? "text-warning" : "text-secondary"
          }`}
          style={{ cursor: "pointer", fontSize: "20px", marginRight: "5px" }}
          onMouseEnter={() => setHoveredStar(i)}
          onMouseLeave={() => setHoveredStar(null)}
          onClick={() => setRating(i)}
        />
      );
    }

    return stars;
  };

  return (
    <section className="product-reviews">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <ul className="d-flex gap-3 list-unstyled mb-0">
            <li
              style={{ color: listSelected === "rev" ? "black" : "#9c9b9b", cursor: "pointer" }}
              onClick={() => setListSelected("rev")}
            >
              Reviews ({reviews.length})
            </li>
          
          </ul>

          <Button onClick={handleOpenModal} variant="primary">
            Add Review
          </Button>
        </div>

        {listSelected === reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="rates">
            {reviews.map((rate, idx) => (
              <div className="rate-comment" key={idx}>
                <span>{rate.userName}</span>
                <span>{rate.rating} ⭐</span>
                <p>{rate.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Modal for review */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add a Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex mb-3">{renderStarRating()}</div>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleSave}>
              Save Review
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};

export default ProductReviews;
