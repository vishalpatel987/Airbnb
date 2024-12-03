const express = require("express");
const router = express.Router({ mergeParams: true});
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/WrapAsync.js");
const { ValidateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");




//Reviews
//post route
router.post("/",isLoggedIn, ValidateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New review created");

    res.redirect(`/listings/${listing._id}`);
}));

//delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "review deleted");

    res.redirect(`/listings/${id}`);
})
);

module.exports = router;
