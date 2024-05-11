/**
 * Stores the game data in the database
 * @param {*} gameId - the unique ID of the game
 * @param {*} score - the score of the player
 * @param {*} username - the user name of the player
 */
export async function store( gameId, score, username ) {
  try {
    const response = await fetch(
        'https://cis4250w24-03.socs.uoguelph.ca/api/leaderboard/store-score.php'
        ,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({gameId: gameId, score: score,
            username: username}),
        });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
