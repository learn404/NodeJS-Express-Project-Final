const token = localStorage.getItem("token");

async function addTweet() {
    let tweet = document.getElementById("tweet").value;
    let response = await fetch("http://localhost:3000/tweets/addtweet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tweet }),
    });

    if (!response.ok) {
        let data = await response.json();
        alert(data.message);
        return;
    }
    
    window.location.href = "home.html";
}  