import "@/styles/globals.css";
import Sidebar from "@/component/Sidebar";
import Provider from "@/component/Provider";
import logIn from "./login/page";
export const metadata = {
  title: "Abdo",
  description: "Personal portfolio",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className="main">
            <Sidebar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
