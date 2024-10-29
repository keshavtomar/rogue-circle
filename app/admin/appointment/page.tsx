"use client";

import React, { useState, useRef } from "react";
import "@/styles/appointment.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import PersonalModal from "../../../components/PersonalModal";
import "flatpickr/dist/flatpickr.min.css";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppointmentForm() {
  const handle = useFullScreenHandle();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [show, setshow] = useState(false);
  const [termschecked, settermschecked] = useState(false);
  const formContainerRef = useRef(null);

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const moveToNext = (currentRef: any, nextRef: any) => {
    if (currentRef.current.value.length >= currentRef.current.maxLength) {
      nextRef.current.focus();
    }
  };

  const [data, setData] = useState({
    name: "",
    dob: { day: "", month: "", year: "" },
    phone: "",
    selectedValue: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      dob: { ...prevState.dob, [name]: value },
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (data.name[0] === " ") {
      toast.error(
        "Your name should start with a letter; please remove spaces."
      );
      return;
    }

    setLoading(true);
    const date = new Date();
    const updatedData = { ...data, date: date.toISOString() };

    try {
      const response = await fetch(
        "/api/admin/appointment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        toast.success("Submission Successful!");
        setData({
          name: "",
          dob: { day: "", month: "", year: "" },
          phone: "",
          selectedValue: "",
          date: "",
        });
        settermschecked(false);
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      toast.error("An error occurred, please try again.");
    }

    setLoading(false);
  };

  const handleFullScreenChange = (state: any) => {
    setIsFullScreen(state);
  };

  return (
    <div>
      <button
        style={{
          position: "absolute",
          zIndex: "1000",
          backgroundColor: "rgb(3,3,4,0)",
          right: "10px",
          top: "10px",
          borderRadius: "50%",
          height: "35px",
          border: "none",
        }}
        onClick={handle.enter}
      >
        <Image
          src="/images/FullScreen.svg"
          alt="full-screen"
          width={5}
          height={5}
          style={{ objectFit: "contain", width: "20px" }}
        />
      </button>
      <FullScreen handle={handle} onChange={handleFullScreenChange}>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <PersonalModal show={show} setShow={setshow} />
        <div className="appointment">
          <div className="background-container">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png"
              alt="moon"
              width="100"
              height="100"
            />
            <div className="af-stars"></div>
            <div className="af-twinkling"></div>
            <div className="af-clouds"></div>
            <div
              className="unique-form-container flex items-center justify-center"
              ref={formContainerRef}
            >
              <form onSubmit={handleSubmit}>
                <div className="unique-form-input-blocks flex items-center justify-center">
                  <div className="left-inputs">
                    <div className="unique-form-group">
                      <label
                        className="unique-form-label"
                        htmlFor="unique-name"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="unique-form-input listen-click"
                        id="unique-name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="unique-form-group">
                      <label
                        className="unique-form-label"
                        htmlFor="unique-birthday"
                      >
                        Birthday
                      </label>
                      <div>
                        <input
                          type="number"
                          className="unique-form-input mr-2"
                          id="unique-birthday"
                          name="day"
                          value={data.dob.day}
                          onChange={handleDateChange}
                          placeholder="DD"
                          style={{ width: "50px" }}
                          min="1"
                          max="31"
                          maxLength={2}
                          ref={dayRef}
                          onInput={() => moveToNext(dayRef, monthRef)}
                          required
                        />
                        /
                        <input
                          type="number"
                          className="unique-form-input mx-2"
                          id="unique-birthday"
                          name="month"
                          value={data.dob.month}
                          style={{ width: "50px" }}
                          onChange={handleDateChange}
                          placeholder="MM"
                          min="1"
                          max="12"
                          maxLength={2}
                          ref={monthRef}
                          onInput={() => moveToNext(monthRef, yearRef)}
                          required
                        />
                        /
                        <input
                          type="number"
                          className="unique-form-input ml-2"
                          id="unique-birthday"
                          min="1930"
                          max="2024"
                          name="year"
                          value={data.dob.year}
                          style={{ width: "100px" }}
                          onChange={handleDateChange}
                          placeholder="YYYY"
                          ref={yearRef}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="right-inputs">
                    <div className="unique-form-group">
                      <label
                        className="unique-form-label"
                        htmlFor="unique-phone"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="unique-form-input"
                        id="unique-phone"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="unique-form-group">
                      <label
                        className="unique-form-label"
                        htmlFor="selectInput"
                      >
                        How you found us
                      </label>
                      <select
                        id="selectInput"
                        className="unique-form-input"
                        name="selectedValue"
                        value={data.selectedValue}
                        onChange={handleChange}
                      >
                        <option value="">--Select an option--</option>
                        <option value="option1">Social Media ads</option>
                        <option value="option2">Through a friend</option>
                        <option value="option3">Google Search/website</option>
                        <option value="option4">Re-visit</option>
                        <option value="option5">Others</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="unique-form-checkbox"
                  style={{ display: "flex" }}
                >
                  <input
                    type="checkbox"
                    id="unique-terms"
                    name="terms"
                    checked={termschecked}
                    onClick={() => settermschecked(!termschecked)}
                    required
                  />
                  <label htmlFor="unique-terms" style={{ display: "flex" }}>
                    <div style={{ margin: "auto 5px" }}>I agree to the</div>
                    <div
                      id="personal-modal"
                      onClick={() => setshow(!show)}
                      style={{ cursor: "pointer", color: "#a68954" }}
                    >
                      terms and conditions
                    </div>
                  </label>
                </div>
                <button
                  className="btn border rounded-[40px] py-[3px] px-2 mx-[5%] w-[90%] h-9 transition-transform transform active:scale-[98%] hover:shadow-lg focus:outline-none"
                  type="submit"
                >
                  {loading ? <div className="loader1"></div> : "Submit"}
                </button>
              </form>
            </div>
          </div>
          <div
            className="established-container"
            style={isFullScreen ? { bottom: "60px" } : { bottom: "30px" }}
          >
            <img src="/images/stamp.png" alt="stamp" />
          </div>
        </div>
      </FullScreen>
    </div>
  );
}
