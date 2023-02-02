/** @format */

import React, { useState } from "react";
import "./Delete.css";

const Delete = ({ deleteModal, imageToDelete, closeModal }) => {
  const [formData, updateFormData] = useState({
    deleteText: "",
  });

  return (
    <div className={`Delete_component ${deleteModal ? "open" : "close"}`}>
      <div className="expandableDiv">
        <div className="contentText">You have entered a danger Zone.</div>
      </div>

      <div className="exandableDiv">
        <div className="imageForDelete">
          <img className="myImage" src={imageToDelete} alt="" />
        </div>
      </div>
      <div className="expandableDiv">
        <div className="contentText">
          Type <span style={{ color: "red", fontSize: "20px" }}>DELETE</span>{" "}
          below to confirm your actions. Remember the action is irreversible!!
        </div>
      </div>
      <div className="expandableDiv">
        <input
          className="delete_input"
          placeholder="type DELETE"
          id={formData.deleteText}
          value={formData.deleteText}
          onChange={(e) =>
            updateFormData({ ...formData, deleteText: e.target.value })
          }
        />
      </div>
      {formData.deleteText === "DELETE" ? (
        <div className="expandableDiv">
          <button className="deleteButton">Delete</button>
        </div>
      ) : (
        <div className="expandableDiv">
          <button className="cancelButton" onClick={closeModal}>
            cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Delete;
