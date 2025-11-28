import React from "react";
import { useTheme } from "./ThemeContext";
import { StarIconMejor } from "../assets/iconos/Icons";
import UserProfile from "../assets/imagenes/Reviews/UserProfile.png";
import IMGreview1 from "../assets/imagenes/Reviews/IMGreview1.png";
import IMGreview2 from "../assets/imagenes/Reviews/IMGreview2.png";
import IMGreview3 from "../assets/imagenes/Reviews/IMGreview3.png";
import IMGreview4 from "../assets/imagenes/Reviews/IMGreview4.png";

const CustomerReview = ({ 
  reviewText, 
  rating, 
  images, 
  customerName, 
  reviewDate,
  customerAvatar 
}) => {
  const { isLight } = useTheme();

  const getCardStyle = () => ({
    backgroundColor: isLight ? '#F5F6920D' : '#24224933',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: isLight 
      ? '0 4px 12px rgba(0, 0, 0, 0.15)' 
      : '0 4px 12px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    border: isLight ? '1px solid #F5F692' : '1px solid #3E3B6B'
  });

  const getTextStyle = () => ({
    color: isLight ? '#1D1B20' : '#E2E2E9',
    transition: 'color 0.3s ease'
  });

  const getNameStyle = () => ({
    color: isLight ? '#1D1B20' : '#E2E2E9',
    fontWeight: '600',
    transition: 'color 0.3s ease'
  });

  const getDateStyle = () => ({
    color: isLight ? '#6B7280' : '#9CA3AF',
    fontSize: '14px',
    transition: 'color 0.3s ease'
  });

  const defaultReview = {
    reviewText: "Exelente, el producto llego en buen estado, y buena calidad.",
    rating: 5,
    images: [
      IMGreview1,
      IMGreview2,
      IMGreview3,
      IMGreview4,
    ],
    customerName: "Wade Warren",
    reviewDate: "2025",
    customerAvatar: UserProfile,
  };

  const review = {
    reviewText: reviewText || defaultReview.reviewText,
    rating: rating || defaultReview.rating,
    images: images || defaultReview.images,
    customerName: customerName || defaultReview.customerName,
    reviewDate: reviewDate || defaultReview.reviewDate,
    customerAvatar: customerAvatar || defaultReview.customerAvatar
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIconMejor
        key={index}
        color={index < review.rating ? "#FFA500" : "#E5E7EB"}
        className="w-5 h-5"
      />
    ));
  };

  return (
    <div className="w-full max-w-md mx-auto" style={getCardStyle()}>
      <div className="flex items-start justify-between mb-4 gap-4">
        <p className="text-base leading-relaxed flex-1" style={getTextStyle()}>
          {review.reviewText}
        </p>
        <div className="flex items-center gap-1 flex-shrink-0">
          {renderStars()}
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {review.images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-200"
          >
            <img
              src={image}
              alt={`Review image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src={review.customerAvatar}
              alt={review.customerName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-base" style={getNameStyle()}>
            {review.customerName}
          </span>
        </div>
        <span style={getDateStyle()}>
          {review.reviewDate}
        </span>
      </div>
    </div>
  );
};

export default CustomerReview;