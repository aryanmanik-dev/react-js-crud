import React, { useState, useRef, useEffect } from "react";
import Header from "../Components/Header";
import axios from "axios";
import _debounce from "lodash/debounce";
import "./App.css";

interface Item {
  _id: number;
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeat: number;
  time: string;
}

const Scheduler = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditVisible, setIsisEditVisible] = useState(false);
  const [Schdata, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    frequency: "",
    repeat: "0",
    time: "",
  });
  const popoverRef = useRef(null);
  const editpopoverRef = useRef(null);

  const [isEdit, setIsEdit] = useState<Item | null>(null);

  const [filterText, setFilterText] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mern-crud-api-zypi.onrender.com/schedules",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Data successfully submitted!");

        togglePopover();
        setFormData(formData);
        fetchData();

        // Add any additional logic here (e.g., redirect or show success message)
      } else {
        console.error("Error submitting data");

        togglePopover();

        fetchData();
        setFormData(formData);

      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const togglePopover = () => {
    setIsVisible(!isVisible);
    setFormData(formData);
  };
  const edittogglePopover = (id: number) => {
    setIsisEditVisible(!isEditVisible);

    getScheduleById(id);
  };

  

  const closeeditPopover = () => {
    setIsisEditVisible(!isEditVisible);
  };

  const getScheduleById = async (id: number) => {
    try {
      const response = await axios.get<Item>(
        `https://mern-crud-api-zypi.onrender.com/schedules/${id}`
      );

      setIsEdit(response.data);
      // response;
      // fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditInputChange = (e: any) => {
    if (isEdit) {
      const { name, value } = e.target;
      setIsEdit({ ...isEdit, [name]: value });
    }
  };

  const deleteRecord = async (id: number) => {
    try {
      const response = await axios.delete(
        `https://mern-crud-api-zypi.onrender.com/schedules/${id}`
      );

      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getScheduleByTitle = async (title: string) => {
    try {
      if (!title) {
        console.warn("Title is undefined or null. Skipping request.");
        fetchData();
        return;
      }

      const response = await axios.post(
        `https://mern-crud-api-zypi.onrender.com/schedules/${title}`
      );

      console.log(response.data);
      setData(response.data || []);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      // throw error;
    }
  };
  const debouncedSearch = _debounce(getScheduleByTitle, 3000);

  const handleFilterChange = (e: any) => {
    debouncedSearch(e.target.value);
  };

  const handleUpdate = async (e: any, id: number) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `https://mern-crud-api-zypi.onrender.com/schedules/${id}`,
        isEdit
      );

      console.log("Schedule updated successfully:", response.data);

      closeeditPopover();
      fetchData();
    } catch (error) {
      console.error("Error updating schedule:", error);
      closeeditPopover();
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://mern-crud-api-zypi.onrender.com/schedules"
      );
      console.log(response.data);
      setData(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Header />

        <nav className="col-md-2 d-none d-md-block bg-light sidebar left__sidebar">
          <div className="sidebar-sticky"></div>
        </nav>

        <div className="col-md-10 ml-sm-auto col-lg-10 px-4">
          <div className="pt-3">
            <div className="d-flex justify-content-between mt-4 mb-4">
              <input
                onChange={handleFilterChange}
                type="text"
                className="form-control w-25 "
              />

              <div className="popover-container" ref={popoverRef}>
                <div className="popover-trigger" onClick={togglePopover}>
                  <i className="bi bi-plus-circle"></i>
                  Add{" "}
                </div>
                {isVisible && (
                  <div className="popover-content">
                    <div>
                      <h1 className="modal-title fs-5">Add Schedule </h1>
                    </div>
                    <form className="form-inline" onSubmit={handleSubmit}>
                      <div className="form-group ">
                        <label>Title:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="form-label">Description:</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ padding: "30px" }}
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="form-label">Subject:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>

                      {/* <div>
                        <label className="form-label">Frequency:</label>
                        <select
                          name="frequency"
                          className="form-control"
                          value={formData.frequency}
                          onChange={handleChange}
                        >
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="daily">Daily</option>
                        </select>
                      </div> */}
                      <div>
                        <label className="form-label">Repeat:</label>
                        <select
                          name="frequency"
                          className="form-control"
                          value={formData.frequency}
                          onChange={handleChange}
                        >
                          <option value="0">Please Select</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>

                        {formData.frequency === "weekly" && (
                          <div>
                            <label className="form-label">Select Day:</label>
                            <select
                              name="repeat"
                              className="form-control"
                              value={formData.repeat}
                              onChange={handleChange}
                            >
                              <option value="0">Please Select</option>
                              <option value="1">Sunday</option>
                              <option value="2">Monday</option>
                              <option value="3">Tuesday</option>
                              <option value="4">Wednesday</option>
                              <option value="5">Thursday</option>
                              <option value="6">Friday</option>
                              <option value="7">Saturday</option>{" "}
                            </select>
                          </div>
                        )}

                        {formData.frequency === "monthly" && (
                          <div>
                            <label className="form-label">Select Day:</label>
                            <select
                              name="repeat"
                              className="form-control"
                              value={formData.repeat}
                              onChange={handleChange}
                            >
                              <option value="0">Please Select</option>
                              <option value="2">Monday</option>
                              <option value="6">Friday</option>
                            </select>
                          </div>
                        )}

                        {formData.frequency === "daily" && (
                          <div>
                            <label className="form-label">No Repeat:</label>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="form-label">Time:</label>
                        <select
                          name="time"
                          className="form-control"
                          value={formData.time}
                          onChange={handleChange}
                        >
                          <option value="">Select Time</option>
                          <option value="1:00 AM">1:00 AM</option>
                          <option value="2:00 AM">2:00 AM</option>
                          <option value="3:00 AM">3:00 AM</option>
                          <option value="4:00 AM">4:00 AM</option>
                          <option value="5:00 AM">5:00 AM</option>
                          <option value="6:00 AM">6:00 AM</option>
                          <option value="7:00 AM">7:00 AM</option>
                          <option value="8:00 AM">8:00 AM</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                        </select>
                      </div>

                      <div className="mt-3">
                        <button
                          onClick={togglePopover}
                          type="button"
                          className="btn btn-light m-3"
                        >
                          Cancel
                        </button>

                        <button type="submit" className="btn btn-primary">
                          Done
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
            <div className="popover-container" ref={editpopoverRef}>
              <div className="form-group"></div>
              {isEditVisible && (
                <div
                  className="popover-content"
                  style={{ right: "0px", left: "260px" }}
                >
                  <div>
                    <h1 className="modal-title fs-5">Edit Schedule</h1>
                  </div>
                  <form>
                    <div>
                      {isEdit && (
                        <div>
                          <div>
                            <label className="form-label">Title:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              value={isEdit.title}
                              onChange={handleEditInputChange}
                            />
                          </div>
                          <div>
                            <label className="form-label">Description:</label>
                            <input
                              type="text"
                              className="form-control"
                              style={{ padding: "30px" }}
                              name="description"
                              value={isEdit.description}
                              onChange={handleEditInputChange}
                            />
                          </div>

                          <div>
                            <label className="form-label">Subject:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="subject"
                              value={isEdit.subject}
                              onChange={handleEditInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Frequency:</label>
                            <select
                              name="frequency"
                              className="form-control"
                              value={isEdit.frequency}
                              onChange={handleEditInputChange}
                            >
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                              <option value="daily">Daily</option>
                            </select>
                          </div>
                          {/* <div>
                            <label className="form-label">Repeat:</label>
                            <input
                              type="number"
                              className="form-control"
                              name="repeat"
                              value={isEdit.repeat}
                              onChange={handleEditInputChange}
                            />
                          </div> */}

                          {isEdit.frequency === "weekly" && (
                            <div>
                              <label className="form-label">Select Day:</label>
                              <select
                                name="repeat"
                                className="form-control"
                                value={isEdit.repeat}
                                onChange={handleChange}
                              >
                                <option value="0">Please Select</option>
                                <option value="1">Sunday</option>
                                <option value="2">Monday</option>
                                <option value="3">Tuesday</option>
                                <option value="4">Wednesday</option>
                                <option value="5">Thursday</option>
                                <option value="6">Friday</option>
                                <option value="7">Saturday</option>{" "}
                              </select>
                            </div>
                          )}

                          {isEdit.frequency === "monthly" && (
                            <div>
                              <label className="form-label">Select Day:</label>
                              <select
                                name="repeat"
                                className="form-control"
                                value={isEdit.repeat}
                                onChange={handleChange}
                              >
                                <option value="0">Please Select</option>
                                <option value="2">Monday</option>
                                <option value="6">Friday</option>
                              </select>
                            </div>
                          )}

                          {isEdit.frequency === "daily" && (
                            <div>
                              <label className="form-label">No Repeat:</label>
                            </div>
                          )}

                          <div>
                            <label className="form-label">Time:</label>
                            <select
                              name="frequency"
                              className="form-control"
                              value={isEdit?.time || ""}
                              onChange={handleEditInputChange}
                            >
                              <option value="">Select Time</option>
                              <option value="1:00 AM">1:00 AM</option>
                              <option value="2:00 AM">2:00 AM</option>
                              <option value="3:00 AM">3:00 AM</option>
                              <option value="4:00 AM">4:00 AM</option>
                              <option value="5:00 AM">5:00 AM</option>
                              <option value="6:00 AM">6:00 AM</option>
                              <option value="7:00 AM">7:00 AM</option>
                              <option value="8:00 AM">8:00 AM</option>
                              <option value="9:00 AM">9:00 AM</option>
                              <option value="10:00 AM">10:00 AM</option>
                              <option value="11:00 AM">11:00 AM</option>
                              <option value="12:00 PM">12:00 PM</option>
                            </select>
                          </div>

                          <div className="mt-3">
                            <button
                              onClick={closeeditPopover}
                              type="button"
                              className="btn btn-light m-3"
                            >
                              Cancel
                            </button>

                            <button
                              onClick={(e) => handleUpdate(e, isEdit._id)}
                              type="button"
                              className="btn btn-primary"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
            <table className="table  scheduler__table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Schedule</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {Schdata && Schdata.length > 0 ? (
                  Schdata.map((item: Item) => (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td style={{ width: "400px" }}>{item.description}</td>
                      <td>{item.subject}</td>
                      <td>
                        {item.frequency.toUpperCase()} {item.time}
                      </td>

                      <td>
                        <i
                          onClick={() => {
                            edittogglePopover(item._id);
                          }}
                          className="bi bi-pencil mr-5"
                        ></i>{" "}
                        <i
                          onClick={() => {
                            deleteRecord(item._id);
                          }}
                          className="bi bi-trash"
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div>No data available</div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
