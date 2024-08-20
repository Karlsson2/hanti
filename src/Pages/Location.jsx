import { useParams } from "react-router-dom"
import { Navigate } from "react-router-dom";
import AddNote from "../Components/addNote";
import ViewNotes from "../Components/ViewNotes/ViewNotes.jsx";

function Location() {
    const { location } = useParams()
    console.log(location);

    const locationArray = ['piren', 'statyn', 'glantan', 'test'];
    
    const currentLocation = locationArray.find(place => location.includes(place));
    console.log(currentLocation);

    if (!locationArray.includes(currentLocation)){
        return <Navigate to={{ pathname: "error/404" }} />;
    }


    if (location.includes('add')){
        return(
        <div>
            <AddNote location={location}></AddNote>
        </div>
        )
    } else {
        return(
            <div>
                <ViewNotes location={location}></ViewNotes>
            </div>
        )
    }
}

export default Location