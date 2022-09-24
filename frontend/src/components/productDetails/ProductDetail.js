import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./productDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../Slice/Product/ProductDetails";
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../ReviewCard/ReviewCard";
import { STATUSES } from "../../status";
import Loader from "../loader/Loader";
import Err from "../error/Err";

const ProductDetail = () => {
  // for carosel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { status, product } = useSelector((state) => state.ProductDetails);
  // for stars
  const options = {
    edit: false,
    color: "lightgray",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  if (status === STATUSES.LOADING) {
    return (
      <>
        <Loader />
      </>
    );
  }

   if (status === STATUSES.ERROR) {
     return (
       <>
         <div className="error-cont">
           <Err />
         </div>
       </>
     );
   }

  return (
    <>
      <div className="peoduct-details">
        <div className="section-1">
          <Slider {...settings} className="carosel-slider">
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="carosel-img"
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Slider>
        </div>
        <div className="section-2">
          <div className="detailsBlock-1">
            <h1>{product.name}</h1>
            <p>Product :- #{product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span>({product.numOfReviews} Reviews)</span>
          </div>
          <div className="deatailsBlocks-3">
            <h1>{` ₹ ${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <button>-</button>
              <input value="1" type="number" />
              <button>+</button>
              <button className="add-cart">Add to Cart</button>
            </div>
          </div>
          <p className="ststus-sec">
            Status : {"  "}
            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
              {product.Stock < 1 ? "  OutOfStock" : "  InStock"}
            </b>
          </p>
          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>

          <button className="submitReview"> Submit Review</button>
        </div>
      </div>

      <h1 className="reviewsHeading">REVIEWS</h1>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className="noReview">No Reviews Yet</p>
      )}
    </>
  );
};

export default ProductDetail;
