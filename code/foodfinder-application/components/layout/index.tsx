import Header from "components/header";

interface PropsInterface {
    children: React.ReactNode;
}

const Layout = (props: PropsInterface) => {
    return (
        <>
            <Header />
            <main className="layout-grid">{props.children}</main>
        </>
    );
};
export default Layout;
