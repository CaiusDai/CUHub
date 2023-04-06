// Get : Get accounts who is being followed by user with <id>
// Post : NOT DEFINED
// Delete : Remove a user from following list
// Update : NOT DEFINED
'/follows/followinglist/:id'

// Get : Get accounts who is following user with <id>
// Post : NOT DEFINED
// Delete : Remove a follower
// Update : NOT DEFINED
'/follows/followerlist/:id'

// Get: Get application lists with user_id <id>
// Post : Create a new following application.
// Delete : NOT DEFINED
// Update : Update the status, either accept or reject
'/follows/applications/:id'
