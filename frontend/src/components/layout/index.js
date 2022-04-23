import Header from "../header";
import "./styles.scss";

function Layout({children, title}) {
    return (
        <div className="layout">
            <Header title={title}/>
            <div className="layout-body">
                {children}
            </div>
        </div>
    );
}
export default Layout;