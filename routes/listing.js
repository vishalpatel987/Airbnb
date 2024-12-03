const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, isOwner, ValidateListing } = require("../middleware.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({  storage });

const listingController = require("../controller/listing.js");

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
       
        upload.single('listing[image]'),
        ValidateListing,
        wrapAsync(listingController.createListing)
    );
// NEW Route (No Validation Needed)
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, ValidateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));



// EDIT Route (No Validation Needed on GET)
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));




module.exports = router;
