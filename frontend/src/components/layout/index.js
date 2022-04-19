import Header from "../header";
import "./styles.scss";

function Layout({children}) {
    return (
        <div className="layout">
            <Header />
            <div className="layout-body">
                {children}
            </div>
        </div>
    );
}
export default Layout;