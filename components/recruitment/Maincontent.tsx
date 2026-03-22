import Sidebar from "@/components/recruitment/Sidebar";
import RRBsTable from "@/components/recruitment/Rrbstable";

export default function MainContent() {
  return (
    <>
      <style>{`
        .maincontent-scroll-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .maincontent-inner {
          display: flex;
          align-items: flex-start;
          min-width: 640px; /* forces side-by-side, scroll kicks in below this */
        }
        .maincontent-sidebar {
  flex-shrink: 0;
  width: 150px;
  background-color: #2352b9;
  align-self: stretch;
}

@media (min-width: 700px) {
  .maincontent-sidebar {
    width: 220px;
  }
}
        .maincontent-body {
          flex: 1;
          min-width: 0;
          background-color: #ffffff;
          padding: 20px 30px;
        }
        .rrbs-table-wrap {
          text-align: center;
        }
        .rrbs-table-wrap table {
          width: 55%;
          min-width: 200px;
        }
        @media (max-width: 768px) {
          .rrbs-table-wrap table {
            width: 90%;
          }
        }
      `}</style>

      <div className="maincontent-scroll-wrapper ">
        <main className="maincontent-inner">
          {/* ── Sidebar column ── */}
          <div className="maincontent-sidebar">
            {/* Home button */}
            <div style={{ backgroundColor: "#3D76C0", padding: 5 }}>
              <button
                type="button"
                style={{
                  display: "block",
                  width: "100%",
                  borderRadius: 0,
                  backgroundColor: "#133c86",
                  border: "1px solid #2c61b1",
                  padding: "6px 12px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <a
                  href="http://www.indianrailways.gov.in/railwayboard"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontFamily: "Arial Narrow, Arial, sans-serif",
                  }}
                  className="text-[10px] md:text-[12px]"
                >
                  Home
                </a>
              </button>
            </div>

            {/* Sidebar links */}
            <Sidebar />
          </div>

          {/* ── Main content column ── */}
          <div className="maincontent-body">
            <div
              style={{
                textAlign: "left",
                fontWeight: "bold",
                fontSize: 14,
                marginBottom: 16,
              }}
            >
              RRBs Website
            </div>

            <div className="rrbs-table-wrap">
              <RRBsTable />
            </div>

            <br />
          </div>
        </main>
      </div>
    </>
  );
}
