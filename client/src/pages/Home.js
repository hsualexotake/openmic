function Home() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-6">
        <h1 className="text-4xl font-bold text-black mb-4 text-center">
          🎤 Welcome to NYC Open Mics!
        </h1>
        <p className="text-lg text-gray-700 max-w-lg text-center">
          Discover, sign up, and showcase your talent at the best open mic nights in NYC. Whether you're a comedian, poet, or musician, we've got a stage for you!
        </p>
        <button className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-xl shadow-md hover:bg-gray-800 transition duration-300">
          Find an Open Mic
        </button>
      </div>
    );
  }
  
  export default Home;
  