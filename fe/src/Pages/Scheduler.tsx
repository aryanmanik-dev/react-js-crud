import React, { useState, useRef, useEffect } from "react";
import Header from "../Components/Header";
import axios from "axios";
import "./App.css";

interface Item {
  id: number;
  name: string;
  age: number;
}

const Scheduler = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditVisible, setIsisEditVisible] = useState(false);

  const [Schdata, setData] = useState([]);

  const popoverRef = useRef(null);
  const editpopoverRef = useRef(null);

  const togglePopover = () => {
    setIsVisible(!isVisible);
  };
  const edittogglePopover = () => {
    setIsisEditVisible(!isEditVisible);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      console.log(response.data);

      setData(response.data.result || []);
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
        {/* <nav className="navbar bg-light"></nav> */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar left__sidebar">
          <div className="sidebar-sticky"></div>
        </nav>
        <div className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="pt-3">
            <div className="d-flex justify-content-between mt-4 mb-4">
              <input type="text" className="form-control w-25 " />

              <div className="popover-container" ref={popoverRef}>
                <div className="popover-trigger" onClick={togglePopover}>
                  <i className="bi bi-plus-circle"></i>
                  Add{" "}
                </div>
                {isVisible && (
                  <div className="popover-content">
                    <div>
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Add Schedule{" "}
                      </h1>
                    </div>
                    <form className="form-inline">
                      <div className="form-group">
                        <label className="">Email address:</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                        />
                      </div>

                      <div className="form-group ">
                        <label>Title:</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div>
                        <label className="form-label">Description:</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ padding: "30px" }}
                        />
                      </div>
                      <div>
                        <label className="form-label">Subject:</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div>
                        <label className="form-label">Frequency:</label>
                        <select name="cars" id="cars" className="form-control">
                          <option value="volvo">Weekly</option>
                          <option value="saab">Monthly</option>
                          <option value="mercedes">Daily</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Repeat:</label>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* {Schdata.length > 0 ? (
              Schdata.map((item: Item) => (
                <div key={item.id}>
                  <div>{item.name}</div>
                </div>
              ))
            ) : (
              <div>No0</div>
            )} */}

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
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="popover-container" ref={editpopoverRef}>
                      {isEditVisible && (
                        <div className="popover-content">
                          <div>
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Add Schedule{" "}
                            </h1>
                          </div>
                          <form>
                            <div className="mb-3">
                              <label className="form-label">Title:</label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Description:</label>
                              <input
                                type="text"
                                className="form-control"
                                style={{ padding: "30px" }}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Subject:</label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Frequency:</label>
                              <select
                                name="cars"
                                id="cars"
                                className="form-control"
                              >
                                <option value="volvo">Weekly</option>
                                <option value="saab">Monthly</option>
                                <option value="mercedes">Daily</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Repeat:</label>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                    <i
                      onClick={edittogglePopover}
                      className="bi bi-pencil mr-5"
                    ></i>{" "}
                    <i className="bi bi-trash"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
