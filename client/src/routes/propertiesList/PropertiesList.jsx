import { Await, useLoaderData } from "react-router-dom";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import SearchFilter from "../../components/searchFilter/SearchFilter";
// import { listData } from "../../lib/propertiesList";
import "./propertiesList.scss";
import { Suspense } from "react";

const PropertiesList = () => {
  const data = useLoaderData();
  // console.log(data);
  // const data = listData;
  return (
    <div className="wrapper">
      <div className="proerties-container">
        <div className="list-container">
          <SearchFilter />
          {/* <div className="properties-list">
            {post.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div> */}
          <div className="properties-list">
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
              >
                {(postResponse) =>
                  postResponse.data.map((post) => (
                    <Card key={post.id} item={post} />
                  ))
                }
              </Await>
            </Suspense>
          </div>
        </div>
        <div className="map-container">
          {/* <Map items={post} /> */}
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <Map items={postResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default PropertiesList;
