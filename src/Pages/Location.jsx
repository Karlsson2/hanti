import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AddNote from "../Components/AddNote/addNote";
import ViewNotes from "../Components/ViewNotes/ViewNotes.jsx";

function Location() {
  const { location } = useParams();
  console.log(location);

    const locationArray = ['lindholmspiren', 'fontänen', 'bädden', 'hållplatsen'];
    
    const currentLocation = locationArray.find(place => location.includes(place));
    console.log(currentLocation);

  if (!locationArray.includes(currentLocation)) {
    return <Navigate to={{ pathname: "error/404" }} />;
  }

  if (location.includes("add")) {
    return (
      <div>
        <ViewNotes location={currentLocation} addNote="true"></ViewNotes>
      </div>
    );
  } else {
    return (
      <div>
        <ViewNotes location={location}></ViewNotes>
      </div>
    );
  }
}

export default Location;
