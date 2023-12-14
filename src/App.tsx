import GifsGrid from "components/GifsGrid";
import Navbar from "components/Navbar";
import SearchBox from "components/SearchBox";
import useGifsData from "hooks/data/useGifsData";
import Spinner from "ui-lib/Spinner";

function App() {
  const {
    gifs,
    searchTerm,
    mode,
    fetchNextSetOfGifs,
    loading,
    handleSearchChange,
    handleSubmitSearchTerm,
  } = useGifsData();
  return (
    <div>
      <Navbar />
      <main className="p-5 lg:w-4/12 mx-auto">
        <div className="mb-5">
          <SearchBox
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onSubmit={handleSubmitSearchTerm}
          />
        </div>
        <section>
          <h2 className="text-lg font-semibold capitalize mb-5">{mode}</h2>
          <GifsGrid gifs={gifs} onNext={fetchNextSetOfGifs} />
          {loading && (
            <Spinner className="text-2xl justify-center flex my-10" />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
