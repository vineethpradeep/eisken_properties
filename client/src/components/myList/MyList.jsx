import PropTypes from "prop-types";
import Card from "../card/Card";
import "./myList.scss";
// import { listData } from "../../lib/propertiesList";

function List({ posts }) {
  return (
    <div className="list">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

List.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default List;
