"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <i class="bi bi-star"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** */

async function addNewStory(evt) {
  console.debug("addNewStory");
  evt.preventDefault();

  const storyAuthorVal = $("#story-author").val()
  const storyTitleVal = $("#story-title").val()
  const storyUrlVal = $("#story-url").val()

  const newFormVals = {
    author: storyAuthorVal,
    title: storyTitleVal,
    url: storyUrlVal,
  }

  const newStory =  await storyList.addStory(currentUser, newFormVals);
  currentUser.ownStories.unshift(newStory);

  $storyForm.trigger("reset");
  $storyForm.hide();

  const newStoryMarkup = generateStoryMarkup(newStory);
  putNewStoryOnPage(newStoryMarkup);
}

$storyForm.on("submit", addNewStory);

/** */

function putNewStoryOnPage(newStoryMarkup){
  $allStoriesList.prepend(newStoryMarkup);

  $allStoriesList.show();
}

/** */
function putMyFavoritesOnPage(myFavoritesList){
  $favoritesList.empty();

  for (let story of myFavoritesList) {
    const $story = generateStoryMarkup(story);
    $favoritesList.append($story);
  }
  $favoritesList.show();
}

/** */
function putMyStoriesOnPage(myStoryList){
  $myStoriesList.empty();

  for (let story of myStoryList) {
    const $story = generateStoryMarkup(story);
    $myStoriesList.append($story);
  }
  $myStoriesList.show();
}


/** Detect click for favoriting*/

function checkIfFavorited(storyId) {

  for(let story of currentUser.favorites) {
    console.log(story.storyId);
    if(storyId === story.storyId) {
      return true;
    } else {
      return false;
    }
  }
}

/** Add or remove story on favorites */
function addOrRemoveFavorite(evt) {
  const storyId = evt.target.parentElement.id;

  console.log(storyId);

  if(checkIfFavorited(storyId)) {
    currentUser.removeFavoriteStory(storyId);
  } else {
    currentUser.addFavoriteStory(storyId);
  }

}

$allStoriesList.on("click", $stars, addOrRemoveFavorite);
$favoritesList.on("click", $stars, addOrRemoveFavorite);

