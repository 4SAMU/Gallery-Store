/** @format */

import React, { useState } from "react";
import "./Delete.css";
import { toast } from "react-toastify";

const Delete = ({ deleteModal, closeModal, imageId, captionId }) => {
  const [formData, updateFormData] = useState({
    deleteText: "",
  });

  async function deleteCaption() {
    try {
      const response = await fetch(
        `https://gallery-store-api.vercel.app/deleteCaptionData/${captionId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      toast.success(error);
    }
  }

  async function deleteImage() {
    await deleteCaption();
    try {
      const response = await fetch(
        `https://gallery-store-api.vercel.app/deleteImageUpload/${imageId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status === "ok") {
        closeModal();
      }
    } catch (error) {
    }
  }

  return (
    <div className={`Delete_component ${deleteModal ? "open" : "close"}`}>
      <div className="expandableDiv">
        <div className="contentText">You have entered a danger zone.</div>
      </div>

      <div className="exandableDiv">
        <div className="imageForDelete">
          <img
            className="myImage"
            src={`https://gallery-store-api.vercel.app/files/${imageId}`}
            alt=""
          />
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
          <button className="deleteButton" onClick={deleteImage}>
            Delete
          </button>
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
