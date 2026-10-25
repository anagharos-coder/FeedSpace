
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";

const API = "http://localhost:5000/api/feedback";

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    star: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M4 5.5v16M8 7h8M8 11h7" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    edit: <path d="m15 5 4 4M4 20l4.2-.9L19 8.3a2.1 2.1 0 0 0-3-3L5.2 16.1 4 20Z" />,
    trash: <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    message: (
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
    ),
  };

  return <svg {...common}>{paths[name] || paths.grid}</svg>;
}

function Layout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAdd = location.pathname === "/add";
  const isEdit = location.pathname.startsWith("/edit/");
  const pageTitle = isAdd
    ? "Add Feedback"
    : isEdit
      ? "Edit Feedback"
      : "Dashboard";

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <NavLink
          to="/"
          className="brand"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="brand-mark">
            <Icon name="message" size={23} />
          </span>
          <span>
            Feed<span className="brand-light">Space</span>
            <small>FEEDBACK PLATFORM</small>
          </span>
        </NavLink>

        <div className="nav-section-label">WORKSPACE</div>

        <nav className="side-nav">
          <NavLink
            to="/"
            end
            onClick={() => setSidebarOpen(false)}
          >
            <Icon name="grid" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/add"
            onClick={() => setSidebarOpen(false)}
          >
            <Icon name="plus" />
            <span>Add Feedback</span>
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">
              <Icon name="message" />
            </div>
            <strong>Need a hand?</strong>
            <p>
              Manage course feedback and keep improving your
              learning experience.
            </p>
          </div>

          <div className="sidebar-footer">
            <span className="online-dot" /> System operational
          </div>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle menu"
            >
              <Icon name="menu" />
            </button>

            <div>
              <div className="breadcrumb">
                Workspace <span>/</span> {pageTitle}
              </div>
              <div className="topbar-title">{pageTitle}</div>
            </div>
          </div>

          <div className="topbar-right">
            <span className="admin-label">Administrator</span>
            <div className="avatar">A</div>
          </div>
        </header>

        <main className="page-content">{children}</main>

        <footer className="app-footer">
          <span>© {new Date().getFullYear()} FeedSpace</span>
          <span>
            Made for better learning experiences{" "}
            <span className="footer-heart">♥</span>
          </span>
        </footer>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, note, tone }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon name={icon} size={21} />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-note">{note}</div>
    </article>
  );
}

function Dashboard() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  async function loadFeedback() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Could not load feedback.");
      }

      const data = await response.json();
      setFeedback(Array.isArray(data) ? data : []);
    } catch {
      setError(
        "Unable to connect to the feedback API. Check that the backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeedback();
  }, []);

  const average = feedback.length
    ? (
        feedback.reduce(
          (sum, item) => sum + Number(item.rating || 0),
          0
        ) / feedback.length
      ).toFixed(1)
    : "—";

  const filtered = feedback.filter((item) =>
    [
      item.courseName,
      item.courseDuration,
      item.comments,
      item._id,
    ].some((value) =>
      String(value || "").toLowerCase().includes(search.toLowerCase())
    )
  );

  function handleDelete(id) {
    setSuccessMessage("");
    setDeleteTarget(id);
  }

  async function confirmDelete() {
    if (!deleteTarget || deleting) return;

    setDeleting(true);

    try {
      const response = await fetch(`${API}/${deleteTarget}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete feedback.");
      }

      setFeedback((previous) =>
        previous.filter((item) => item._id !== deleteTarget)
      );

      setDeleteTarget(null);
      setSuccessMessage("Feedback deleted successfully!");
    } catch (err) {
      alert(err.message || "Unable to delete feedback.");
    } finally {
      setDeleting(false);
    }
  }

  async function saveEdit(event) {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`${API}/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseName: editing.courseName,
          courseDuration: editing.courseDuration,
          comments: editing.comments,
          rating: Number(editing.rating),
        }),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      setEditing(null);
      await loadFeedback();
    } catch {
      alert("Could not update feedback. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function shortId(id) {
    return id ? String(id).slice(-6).toUpperCase() : "—";
  }

  return (
    <>
      <section className="welcome-row">
        <div>
          <div className="eyebrow">OVERVIEW</div>
          <h1>Feedback dashboard</h1>
          <p className="page-description">
            Track course feedback, monitor ratings, and improve
            the learning experience.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/add")}
        >
          <Icon name="plus" size={18} /> Add feedback
        </button>
      </section>

      {successMessage && (
        <div className="alert-success" role="status">
          <span>✓ {successMessage}</span>
          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            aria-label="Dismiss success message"
          >
            ×
          </button>
        </div>
      )}

      {error && (
        <div className="alert-error">
          {error} <button onClick={loadFeedback}>Retry</button>
        </div>
      )}

      <section className="stats-grid">
        <StatCard
          icon="message"
          label="Total feedback"
          value={loading ? "…" : feedback.length}
          note="Feedback entries received"
          tone="purple"
        />

        <StatCard
          icon="star"
          label="Average rating"
          value={loading ? "…" : average}
          note={feedback.length ? "Out of 5.0 stars" : "No ratings yet"}
          tone="amber"
        />

        <StatCard
          icon="book"
          label="Courses reviewed"
          value={
            loading
              ? "…"
              : new Set(
                  feedback
                    .map((item) =>
                      item.courseName?.trim().toLowerCase()
                    )
                    .filter(Boolean)
                ).size
          }
          note="Unique courses with feedback"
          tone="blue"
        />
      </section>

      {editing && (
        <section className="panel edit-panel">
          <div className="panel-heading">
            <div>
              <h2>Edit feedback</h2>
              <p>Update the details for this submission.</p>
            </div>

            <button
              className="icon-button"
              onClick={() => setEditing(null)}
              aria-label="Cancel editing"
            >
              ×
            </button>
          </div>

          <form className="feedback-form" onSubmit={saveEdit}>
            <div className="form-grid">
              <label>
                Course name
                <input
                  required
                  value={editing.courseName || ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      courseName: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Course duration
                <input
                  value={editing.courseDuration || ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      courseDuration: e.target.value,
                    })
                  }
                  placeholder="e.g. 3 months"
                />
              </label>

              <label>
                Feedback rating
                <select
                  required
                  value={editing.rating || 5}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      rating: Number(e.target.value),
                    })
                  }
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "star" : "stars"}
                    </option>
                  ))}
                </select>
              </label>

              <label className="full-width">
                Feedback comments
                <textarea
                  required
                  rows="3"
                  value={editing.comments || ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      comments: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>

              <button className="primary-button" disabled={saving}>
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Course feedback</h2>
            <p>Review and manage submitted course responses.</p>
          </div>

          <span className="count-pill">
            {feedback.length}{" "}
            {feedback.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        <div className="table-toolbar">
          <div className="search-box">
            <Icon name="search" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses or comments..."
              aria-label="Search feedback"
            />
          </div>

          <button
            className="secondary-button refresh-button"
            onClick={loadFeedback}
          >
            <span>↻</span> Refresh
          </button>
        </div>

        <div className="table-scroll">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course name</th>
                <th>Duration</th>
                <th>Rating</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="table-message">
                    Loading feedback…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-message">
                    <div className="empty-state">
                      <div className="empty-icon">
                        <Icon name="message" size={26} />
                      </div>

                      <strong>
                        {search
                          ? "No matching feedback"
                          : "No feedback yet"}
                      </strong>

                      <p>
                        {search
                          ? "Try another search term."
                          : "Add your first course feedback to get started."}
                      </p>

                      {!search && (
                        <button
                          className="primary-button"
                          onClick={() => navigate("/add")}
                        >
                          <Icon name="plus" size={17} /> Add feedback
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <span className="course-id">
                        #{shortId(item._id)}
                      </span>
                    </td>

                    <td>
                      <div className="course-name">
                        {item.courseName}
                      </div>
                    </td>

                    <td>
                      <span className="duration">
                        <Icon name="clock" size={14} />{" "}
                        {item.courseDuration || "Not specified"}
                      </span>
                    </td>

                    <td>
                      <span className="rating-badge">
                        <Icon name="star" size={14} />{" "}
                        {Number(item.rating).toFixed(1)}{" "}
                        <span className="rating-max">/ 5</span>
                      </span>
                    </td>

                    <td>
                      <div
                        className="comment-cell"
                        title={item.comments}
                      >
                        {item.comments || "—"}
                      </div>
                    </td>

                    <td>
                      <div className="row-actions">
                        <button
                          className="action-edit"
                          title="Edit feedback"
                          aria-label="Edit feedback"
                          onClick={() => setEditing({ ...item })}
                        >
                          <Icon name="edit" size={16} />
                        </button>

                        <button
                          className="action-delete"
                          title="Delete feedback"
                          aria-label="Delete feedback"
                          onClick={() => handleDelete(item._id)}
                        >
                          <Icon name="trash" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>
            Showing {filtered.length} of {feedback.length} entries
          </span>
          <span>Ratings are based on submitted feedback</span>
        </div>
      </section>

      {deleteTarget && (
        <div
          className="delete-overlay"
          onClick={() => !deleting && setDeleteTarget(null)}
        >
          <div
            className="delete-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="delete-icon">!</div>

            <h2 id="delete-dialog-title">Delete feedback?</h2>

            <p>
              Are you sure you want to delete this feedback?
              This action cannot be undone.
            </p>

            <div className="delete-actions">
              <button
                type="button"
                className="secondary-button"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-confirm-button"
                disabled={deleting}
                onClick={confirmDelete}
              >
                {deleting ? "Deleting…" : "Delete feedback"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FeedbackForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    courseName: "",
    courseDuration: "",
    comments: "",
    rating: "5",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function update(field, value) {
    setForm((old) => ({ ...old, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseName: form.courseName.trim(),
          courseDuration: form.courseDuration.trim(),
          comments: form.comments.trim(),
          rating: Number(form.rating),
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Could not save feedback.");
      }

      setSuccess(true);
      setTimeout(() => navigate("/"), 700);
    } catch (err) {
      setError(
        err.message ||
          "Could not save feedback. Check that the backend is running."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="form-page">
      <div className="eyebrow">NEW SUBMISSION</div>
      <h1>Add course feedback</h1>
      <p className="page-description">
        Share your experience to help us make every course better.
      </p>

      <div className="form-layout">
        <form className="panel form-panel" onSubmit={handleSubmit}>
          <div className="form-section-title">
            <span className="section-number">01</span>
            <div>
              <h2>Course details</h2>
              <p>Tell us which course you are reviewing.</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="full-width">
              Course name <span className="required">*</span>
              <input
                required
                maxLength="120"
                value={form.courseName}
                onChange={(e) => update("courseName", e.target.value)}
                placeholder="e.g. Full Stack Development"
              />
            </label>

            <label className="full-width">
              Course duration{" "}
              <span className="optional">(optional)</span>
              <input
                value={form.courseDuration}
                onChange={(e) =>
                  update("courseDuration", e.target.value)
                }
                placeholder="e.g. 3 months"
              />
            </label>
          </div>

          <div className="form-section-title second-section">
            <span className="section-number">02</span>
            <div>
              <h2>Your feedback</h2>
              <p>Rate the course and share your thoughts.</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="full-width">
              Feedback rating <span className="required">*</span>
              <select
                required
                value={form.rating}
                onChange={(e) => update("rating", e.target.value)}
              >
                <option value="5">5 — Excellent</option>
                <option value="4">4 — Very good</option>
                <option value="3">3 — Good</option>
                <option value="2">2 — Needs improvement</option>
                <option value="1">1 — Poor</option>
              </select>
            </label>

            <label className="full-width">
              Feedback comments <span className="required">*</span>
              <textarea
                required
                maxLength="1500"
                rows="5"
                value={form.comments}
                onChange={(e) => update("comments", e.target.value)}
                placeholder="What did you enjoy? What could be improved?"
              />
            </label>
          </div>

          {error && <div className="alert-error">{error}</div>}

          {success && (
            <div className="alert-success">
              Feedback saved successfully! Returning to dashboard…
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            <button className="primary-button" disabled={saving}>
              {saving ? "Submitting…" : "Submit feedback"}{" "}
              <Icon name="arrow" size={17} />
            </button>
          </div>
        </form>

        <aside className="form-tip">
          <div className="tip-art">
            <Icon name="star" size={28} />
          </div>

          <div className="eyebrow">YOUR VOICE MATTERS</div>
          <h3>Help make learning better.</h3>
          <p>
            Your feedback helps course administrators understand
            what works well and where improvements are needed.
          </p>

          <div className="tip-divider" />

          <div className="tip-point">
            <span>✓</span>
            <div>
              <strong>Be specific</strong>
              <p>Share details that can help improve the course.</p>
            </div>
          </div>

          <div className="tip-point">
            <span>✓</span>
            <div>
              <strong>Be constructive</strong>
              <p>Honest feedback makes a real difference.</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <div className="panel not-found">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <NavLink className="primary-button" to="/">
        Back to dashboard
      </NavLink>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<FeedbackForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
