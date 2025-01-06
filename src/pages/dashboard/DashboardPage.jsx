import "./AdminSidebar.css"; // Move the styles to a separate CSS file
import Layout from "../../layout/Layout";

const AdminSidebar = () => {
  return (
    <Layout>
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="logo">Admin Panel</div>
          <a href="#admin-bereich" className="menu-item admin-bereich">
            <i>⚙️</i>
            Admin-Bereich
          </a>
          <a href="#voranmeldungen" className="menu-item">
            <i>📋</i>
            Voranmeldungen
          </a>
          <a href="#benutzer" className="menu-item">
            <i>👥</i>
            Benutzer
          </a>
          <a href="#analyse" className="menu-item">
            <i>📊</i>
            Analyse
          </a>
          <a href="#buchhaltung" className="menu-item">
            <i>💰</i>
            Buchhaltung
          </a>
          <a href="#shop" className="menu-item">
            <i>🛒</i>
            E-Commerce Shop
          </a>
        </div>

        {/* Content Area */}
        <div className="content">
          <h1>Willkommen im Admin-Bereich</h1>
          <p>Wählen Sie einen Bereich aus dem Menü, um fortzufahren.</p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminSidebar;
