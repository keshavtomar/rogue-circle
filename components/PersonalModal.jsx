"use client";

import React, { useState } from "react";
import "../styles/personalmodal.css";
import Image from "next/image";

export default function PersonalModal({ show, setShow }) {
  return (
    <div
      className="personal-modal"
      style={show ? { zIndex: "10", backdropFilter: "blur(10px)" } : {}}
    >
      <div
        className="personal-modal-container pt-5 px-4 pb-3"
        style={
          show
            ? { translate: "0 30px", backdropFilter: "blur(0px)", opacity: "1" }
            : {}
        }
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <img
          src="/images/rope.svg"
          alt="rope"
          style={{
            position: "absolute",
            height: "300px",
            top: "-245px",
            left: "0px",
          }}
        />
        <img
          src="/images/rope.svg"
          alt="rope"
          style={{
            position: "absolute",
            height: "300px",
            top: "-245px",
            right: "0px",
          }}
        />
        <div
          className="personal-modal-title"
          style={{ fontWeight: "900", fontSize: "20px" }}
        >
          <h4> Terms & Conditions</h4>
        </div>
        <div className="personal-modal-content" style={{ padding: "20px" }}>
          <ul>
            <li style={{ fontWeight: "300" }}>
              By booking an appointment, the client confirms that they are of
              legal age (18+ or as per local laws) and provide informed consent
              for the tattoo.
            </li>
            <li style={{ fontWeight: "300" }}>
              Clients acknowledge that there are inherent risks associated with
              getting a tattoo and assume these risks.
            </li>
            <li style={{ fontWeight: "300" }}>
              The tattoo artist retains ownership rights to the original
              artwork/design.
            </li>
            <li style={{ fontWeight: "300" }}>
              Client photographs of completed tattoos may be used for
              promotional purposes with appropriate permissions.
            </li>
            <li style={{ fontWeight: "300" }}>
              Rogue Tattoos and its tattoo artists shall not be held liable for
              any damages, injuries, or adverse reactions resulting from the
              tattoo process, within the limits allowed by local laws.
            </li>
            <li style={{ fontWeight: "300" }}>
              Rogue Tattoos does not provide tattoo services to pregnant women,
              individuals with diabetes (sugar patients), or those with other
              serious illnesses.
            </li>
          </ul>
        </div>
        <div
          className="personal-modal-closebutton"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button
            style={{
              borderRadius: "5px",
              width: "90px",
              height: "40px",
              border: "none",
              backgroundColor: "#a68954",
            }}
            onClick={() => {
              setShow(!show);
            }}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}
