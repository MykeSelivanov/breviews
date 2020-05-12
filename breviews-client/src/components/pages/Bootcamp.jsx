import React, { Fragment, useEffect } from "react";
import "./style/bootcamp.css";
import { withRouter } from "react-router";
import { ReviewSubmitForm, ReviewsBox } from "../B_Molecules";
import { SortReviews, Spinner } from "../A_Atoms";
import { EMPTY_REVIEW_TEXT } from "../../utils/constants";
import { Button } from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getBootcampData } from "../../redux/actions/bootcamp";
import { Link } from 'react-router-dom';
import { Ratings } from "../A_Atoms";

const Bootcamp = (props) => {
  const localData = useSelector(state => state.bootcamp.localData);
  const dispatch = useDispatch();
  const name = props.match.params.name;

  useEffect(() => {
    dispatch(getBootcampData(name));
  }, []);
    
  console.log(localData)
  return (
    <Fragment>
      {localData && localData.length === 0 ? (
        <Spinner />
      ) : (
        <div className="reviews-content-wrapper">
          <div className="reviews-header-wrapper">
          <div className="bootcamp-logo">
            <img src={localData[0].logo} alt="company logo"/>
          </div>
          <div className="bootcamp-info">
            <h3 style={{color: "#000"}}>{localData[0].customName}  {" "}
            <a href={localData[0].website} target="_blank">
              <img src="https://cdn1.iconfinder.com/data/icons/feather-2/24/external-link-512.png" style={{height: "16px", width: "auto"}}/>
            </a>
            </h3>
            <div className="bootcamp-info-row1">
              <Ratings
                classname="star-rating-container"
                overall={localData[0].overall}
              />
              <p>
                {localData[0].reviewsCount} reviews
              </p>
              <p>
                <img src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/location-512.png" style={{height: "12px", width: "auto"}}/>
                { localData[0].location }
              </p>
              </div>
              <div className="bootcamp-info-row2">
                <button>Frontend</button>
                <button>Fullstack</button>
                <button>JavaScript</button>
                <button>Remote</button>
                <button>Career Services</button>
              </div>
              <div className="bootcamp-info-row3">
                <p><span>Duration: </span> {localData[0].duration}</p>
                <p><span>Price: </span> {localData[0].price}</p>
              </div>
              <SortReviews />
          </div>

          </div>
          <div className="reviews-wrapper">
            <div className="bootcamp-write-a-review">
              <h6>Write a Review</h6>
              <p>Have you completed a bootcamp lorem ipsum lorem ipsum lorem ipsum</p>
              <Link to={`/write-review/${localData[0].schoolname}`}><button>Review</button></Link>
            </div>

            <div className="customer-reviews">
              <div>
                {localData.length === 0 || localData[0].reviews.length === 0 ? (
                  <div>
                    <p id="empty-review-text"> {EMPTY_REVIEW_TEXT} </p>
                  </div>
                ) : (
                  <ReviewsBox reviewsData={localData[0].reviews} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Bootcamp.protoType = {
  localData: PropTypes.array.isRequired,
  getBootcampData: PropTypes.func.isRequired
};

export default withRouter(Bootcamp);

