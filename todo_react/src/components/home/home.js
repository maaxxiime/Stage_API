function Home() {
    
  const user = window.localStorage.getItem("user");
  if (!user) {
    window.location.assign("/login");
  }

  return <h1>Home</h1>;
}

export default Home;
