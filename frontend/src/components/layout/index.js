import Header from "../header";
import "./styles.scss";

function Layout({ children, title }) {
  return (
    <div id="layout" className="layout">
      <Header title={title} />
      <div className="layout-body">{children}</div>
      <a className="back-to-top" href="#layout">
        ➜
      </a>
    </div>
  );
}
export default Layout;
