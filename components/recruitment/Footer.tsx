"use client";

export default function Footer() {
  return (
    <div style={{ padding: 0 }}>
      <div
      className="text-[10px] md:text-[14px]"
        style={{
          lineHeight: "1.12857143",
          fontFamily: "Arial Narrow, Arial, sans-serif",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#353535",
          color: "white",
          padding: "8px 16px",
        }}
      >
        {/* CSS validator badges — float right, so render before text flow */}
        {/* <a
          href="http://jigsaw.w3.org/css-validator/check/referer"
          target="_blank"
          rel="noopener noreferrer"
          style={{ float: "right", , color: "white", textDecoration: "none" }}
        >
          <img
            style={{ border: "0pt none", width: 70, height: 20 }}
            src="http://jigsaw.w3.org/css-validator/images/vcss"
            alt="Valid CSS!"
          />
        </a>
        <a
          href="http://validator.w3.org/check?uri=referer"
          target="_blank"
          rel="noopener noreferrer"
          style={{ float: "right", , color: "white", textDecoration: "none" }}
        >
          <img
            style={{ border: "0pt none", width: 70, height: 20 }}
            src="http://www.w3.org/Icons/valid-xhtml10"
            alt="Valid XHTML 1.0 Strict"
          />
        </a> */}
        {/* Nav links */}
        <a
          href="https://indianrailways.gov.in/railwayboard/webadmin/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", textDecoration: "none", }}
        >
          Admin Login
        </a>
        {" | "}
        <a
          href="#"
          style={{ color: "white", textDecoration: "none",  }}
        >
          &nbsp;Site Map&nbsp;
        </a>
        <span style={{ color: "#888888", }}> | </span>
        <a
          href="#"
          style={{ color: "white", textDecoration: "none", }}
        >
          &nbsp;Contact Us&nbsp;
        </a>
        <span style={{ color: "#888888", }}> | </span>
        <a
          href="https://rtionline.gov.in/"
          style={{ color: "white", textDecoration: "none", }}
        >
          &nbsp;RTI&nbsp;
        </a>
        <span style={{ color: "#888888", }}> | </span>
        <a
          href="#"
          style={{ color: "white", textDecoration: "none",  }}
        >
          &nbsp;Disclaimer&nbsp;
        </a>
        <span style={{ color: "#888888",  }}> | </span>
        <a
          href="#"
          style={{ color: "white", textDecoration: "none", }}
        >
          &nbsp;Terms &amp; Conditions&nbsp;
        </a>
        <span style={{ color: "#888888",  }}> | </span>
        <a
          href="#"
          style={{ color: "white", textDecoration: "none",  }}
        >
          &nbsp;Privacy Policy&nbsp;
        </a>
        <br />
        <br />
        © 2016&nbsp; All Rights Reserved.
        <br />
        <br />
        This is the Portal of Indian Railways, developed with an objective to
        enable a single window access to information and services being provided
        by the various Indian Railways entities. The content in this Portal is
        the result of a collaborative effort of various Indian Railways Entities
        and Departments Maintained by CRIS, Ministry of Railways, Government of
        India.
      </div>
    </div>
  );
}
