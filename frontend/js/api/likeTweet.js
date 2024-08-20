async function likeTweet(tweetId) {
    let token = localStorage.getItem('token');
    let response = await fetch(`http://localhost:3000/tweets/like/${tweetId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        let data = await response.json();
        alert(data.message);
        return;
    }
    let data = await response.json();
    console.log(data);
    window.location.reload();

}   