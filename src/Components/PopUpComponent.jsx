import { Link } from "react-router-dom";

function PopUpComponent(props) {
  <div>
    <Link to={props.location}>
      <div>{props.title}</div>
    </Link>
  </div>;
}
export default PopUpComponent;
