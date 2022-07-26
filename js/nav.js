"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $navLinks.show();
}

/**Hides all form and lists except the story form*/
function showStoryForm() {
  hidePageComponents();
  $storyForm.show();
};

$navLinks.on("click", "#nav-submit", showStoryForm);


/**Hides all forms/lists and unhides the favorites lists */
function showFavorites() {
  hidePageComponents();
  putMyFavoritesOnPage(currentUser.favorites);
}

$navFavorites.on("click", showFavorites);


/** Hides all forms/lists and unhides the "My Story" list */
function showMyStories(){
  hidePageComponents();
  putMyStoriesOnPage(currentUser.ownStories);
}

$navMyStories.on("click", showMyStories);
