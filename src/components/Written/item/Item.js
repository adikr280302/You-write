import classes from "./Item.module.css";
import {Link} from 'react-router-dom';
function Item(props) {
  return (
    <Link to={`/present/${props._id}`} style={{textDecoration:'none'}}>
    <div className={classes.container}>
      <h2 className={classes.title}>{props.title}</h2>
      <div className={classes.date}>{new Date(props.date).toLocaleDateString()}</div>
      <div className={classes.desc}>{props.desc}</div>
    </div>
    </Link>
  );
}

export default Item;
