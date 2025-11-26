import React, { useEffect, useRef, useState } from "react";
import "./allcomponents.css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { componentStorageName, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const AllComponents = ({
  savedComponents,
  setSavedComponents,
  filteredSavedComponents,
  setFilteredSavedComponents,
}) => {
  const loaderRef = useRef();
  const navigate = useNavigate();
  
  // STATE TO HANDLE THE POPUP DATA
  const [viewData, setViewData] = useState(null);

  const Card = (props) => {
    return (
      <div className="card">
        {/* EDIT BUTTON */}
        <span
          className="edit-btn"
          onClick={(e) => {
            e.preventDefault();
            navigate("/edit-component/" + props.compID);
          }}
        >
          <dotlottie-player
            src="/edit_ic.json"
            background="transparent"
            speed="1"
            style={{ width: "30px", height: "30px" }}
            loop={false}
            onMouseOver={(e) => { e.target.play(); setTimeout(() => { e.target.stop(); }, 2000); }}
          ></dotlottie-player>
        </span>

        {/* DELETE BUTTON */}
        <span
          className="del-btn"
          onClick={(e) => {
            e.preventDefault();
            if (window.confirm("Do you want to delete this component?")) {
              deleteComponent(props.compID);
            }
          }}
        >
          <dotlottie-player
            src="/delete_ic.json"
            background="transparent"
            speed="1"
            style={{ width: "30px", height: "30px" }}
            loop={false}
            onMouseOver={(e) => { e.target.play(); setTimeout(() => { e.target.stop(); }, 2000); }}
          ></dotlottie-player>
        </span>

        {/* CARD CONTENT */}
        {props.type == "design" && <img src={props.designFile} alt="Design" />}
        <span className="name">{props.name}</span>
        {props.type == "code" && (
          <span className="category">Language: {props.language}</span>
        )}
        <div className="pills">
          <span>{props.type}</span>
          <span>{props.category}</span>
        </div>

        {/* VIEW BUTTON - Now opens the Modal */}
        <button
          className="view-btn"
          onClick={(e) => {
            e.preventDefault();
            setViewData(props.data); // Save this specific component's data to state
          }}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "8px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          View Details
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (loaderRef.current) {
      loaderRef.current.style.display = "flex";
      if (loaderRef.current.nextElementSibling) {
        loaderRef.current.nextElementSibling.style.display = "none";
      }
    }
  }, []);

  const deleteComponent = async (compID) => {
    await deleteDoc(doc(db, componentStorageName, compID)).then(() => {
      setSavedComponents(savedComponents.filter((item) => item.id != compID));
      setFilteredSavedComponents(filteredSavedComponents.filter((item) => item.id != compID));
      alert("Deleted Successfully!");
    });
  };

  const fetchComponents = async () => {
    await getDocs(collection(db, componentStorageName)).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (loaderRef.current) {
        loaderRef.current.style.display = "none";
        if (loaderRef.current.nextElementSibling) {
          loaderRef.current.nextElementSibling.style.display = "unset";
        }
      }
      setSavedComponents(newData);
      setFilteredSavedComponents(newData);
    });
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  return (
    <>
      {/* --- MODAL POPUP (Added Here) --- */}
      {viewData && (
        <div className="modal-overlay" onClick={() => setViewData(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{viewData.componentName}</h2>
            <p><strong>Category:</strong> {viewData.componentCategory} | <strong>Type:</strong> {viewData.componentType}</p>
            <br/>
            
            <div className="modal-body">
              {viewData.componentType === "code" ? (
                <>
                   <h4>Code ({viewData.programmingLanguage}):</h4>
                   <pre>{viewData.codeBlock}</pre>
                </>
              ) : (
                <>
                   <h4>Design File:</h4>
                   <img src={viewData.designData} alt="Component Design" />
                </>
              )}
            </div>

            <button className="close-modal-btn" onClick={() => setViewData(null)}>Close</button>
          </div>
        </div>
      )}
      {/* -------------------------------- */}

      <dotlottie-player
        ref={loaderRef}
        src="/loading_anim.json"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px", margin: "auto", display: "flex" }}
        loop
        autoplay
      ></dotlottie-player>

      <span className="all-components-title">
        {filteredSavedComponents.length <= 0 ? "No Components Found" : "All Components"}
      </span>

      <div className="all-components">
        {filteredSavedComponents.map((item) => {
          return (
            <Card
              name={item.componentName}
              category={item.componentCategory}
              language={item.programmingLanguage}
              type={item.componentType}
              designFile={item.designData}
              key={item.id}
              compID={item.id}
              data={item} // <-- IMPORTANT: Passing the whole item data here
            />
          );
        })}
      </div>
    </>
  );
};

export default AllComponents;