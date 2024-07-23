import DonateUserActivityList from "../../components/Activity/DonateUserActivityList";
import SearchActivityForm from "../../components/User/SearchActivityForm";

function Home() {
  return (
    <>
      <SearchActivityForm />
      <DonateUserActivityList />
    </>
  );
}

export default Home;
