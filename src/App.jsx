import React, { useState } from "react";

export default function App() {
  const jobsData = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions",
      category: "IT",
      location: "Hyderabad",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Creative Studio",
      category: "Design",
      location: "Bangalore",
    },
    {
      id: 3,
      title: "Marketing Executive",
      company: "Market Hub",
      category: "Marketing",
      location: "Mumbai",
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "Code Works",
      category: "IT",
      location: "Chennai",
    },
    {
      id: 5,
      title: "Graphic Designer",
      company: "Design Pro",
      category: "Design",
      location: "Delhi",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const categories = ["All", "IT", "Design", "Marketing"];

  const gradients = [
    "linear-gradient(135deg,#667eea,#764ba2)",
    "linear-gradient(135deg,#f093fb,#f5576c)",
    "linear-gradient(135deg,#4facfe,#00f2fe)",
    "linear-gradient(135deg,#43e97b,#38f9d7)",
    "linear-gradient(135deg,#fa709a,#fee140)",
  ];

  const filteredJobs = jobsData.filter((job) => {
    const categoryMatch =
      selectedCategory === "All" ||
      job.category === selectedCategory;

    const searchMatch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((jobId) => jobId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  const submitApplication = (e) => {
    e.preventDefault();
    alert("🎉 Application Submitted Successfully!");
    setSelectedJob(null);
  };

  return (
    <div style={styles.container}>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Poppins',sans-serif;
        }

        body{
          background:linear-gradient(
          -45deg,
          #667eea,
          #764ba2,
          #ff758c,
          #ff7eb3
          );
          background-size:400% 400%;
          animation:bgMove 15s ease infinite;
          min-height:100vh;
        }

        @keyframes bgMove{
          0%{background-position:0% 50%;}
          50%{background-position:100% 50%;}
          100%{background-position:0% 50%;}
        }

        .header{
          text-align:center;
          margin-bottom:30px;
          color:white;
        }

        .header h1{
          font-size:3rem;
          text-shadow:0 0 20px rgba(255,255,255,.6);
        }

        .header p{
          font-size:18px;
          margin-top:10px;
        }

        .search-box{
          width:100%;
          padding:15px;
          border:none;
          border-radius:12px;
          margin-bottom:20px;
          font-size:16px;
          outline:none;
        }

        .category-btn{
          border:none;
          padding:12px 18px;
          border-radius:30px;
          margin:5px;
          cursor:pointer;
          font-weight:bold;
          transition:.3s;
        }

        .category-btn:hover{
          transform:scale(1.08);
        }

        .active{
          background:linear-gradient(45deg,#00f260,#0575e6);
          color:white;
        }

        .job-card{
          padding:20px;
          border-radius:20px;
          color:white;
          margin-bottom:20px;
          box-shadow:0 10px 25px rgba(0,0,0,.2);
          transition:.3s;
        }

        .job-card:hover{
          transform:translateY(-8px);
        }

        .btn{
          border:none;
          padding:10px 16px;
          border-radius:8px;
          cursor:pointer;
          margin-right:10px;
          font-weight:bold;
        }

        .apply-btn{
          background:white;
          color:#333;
        }

        .bookmark-btn{
          background:#ffd700;
        }

        .bookmark-section{
          background:rgba(255,255,255,.2);
          backdrop-filter:blur(10px);
          color:white;
          padding:20px;
          border-radius:20px;
          margin-top:30px;
        }

        .popup{
          position:fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          background:rgba(0,0,0,.6);
          display:flex;
          justify-content:center;
          align-items:center;
        }

        .form-box{
          background:white;
          padding:25px;
          width:400px;
          border-radius:15px;
        }

        .form-box input,
        .form-box textarea{
          width:100%;
          padding:12px;
          margin:10px 0;
          border:1px solid #ddd;
          border-radius:8px;
        }
      `}</style>

      <div className="header">
        <h1>🚀 DreamHire Job Portal</h1>
        <p>Discover • Apply • Get Hired</p>
      </div>

      <input
        type="text"
        className="search-box"
        placeholder="🔍 Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ marginBottom: "20px" }}>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <h2 style={{ color: "white", marginBottom: "20px" }}>
        Available Jobs ({filteredJobs.length})
      </h2>

      {filteredJobs.map((job) => (
        <div
          key={job.id}
          className="job-card"
          style={{
            background: gradients[job.id % gradients.length],
          }}
        >
          <h2>{job.title}</h2>

          <p>
            <strong>🏢 Company:</strong> {job.company}
          </p>

          <p>
            <strong>📂 Category:</strong> {job.category}
          </p>

          <p>
            <strong>📍 Location:</strong> {job.location}
          </p>

          <div style={{ marginTop: "15px" }}>
            <button
              className="btn apply-btn"
              onClick={() => setSelectedJob(job)}
            >
              Apply Now
            </button>

            <button
              className="btn bookmark-btn"
              onClick={() => toggleBookmark(job.id)}
            >
              {bookmarks.includes(job.id)
                ? "❤️ Saved"
                : "🤍 Save Job"}
            </button>
          </div>
        </div>
      ))}

      <div className="bookmark-section">
        <h2>📌 Saved Jobs</h2>

        {bookmarks.length === 0 ? (
          <p>No saved jobs yet.</p>
        ) : (
          jobsData
            .filter((job) => bookmarks.includes(job.id))
            .map((job) => (
              <p key={job.id}>
                ✅ {job.title} - {job.company}
              </p>
            ))
        )}
      </div>

      {selectedJob && (
        <div className="popup">
          <div className="form-box">
            <h2>Apply for {selectedJob.title}</h2>

            <form onSubmit={submitApplication}>
              <input
                type="text"
                placeholder="Your Name"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                required
              />

              <textarea
                rows="4"
                placeholder="Why should we hire you?"
                required
              />

              <button
                type="submit"
                className="btn"
                style={{
                  background: "#28a745",
                  color: "white",
                }}
              >
                Submit
              </button>

              <button
                type="button"
                className="btn"
                style={{
                  background: "#dc3545",
                  color: "white",
                }}
                onClick={() => setSelectedJob(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
const styles = {
  container: {
    maxWidth: "1100px",
    margin: "30px auto",
    padding: "20px",
  },
};