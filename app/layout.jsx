import Nav from "@components/Nav";
import "../styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Discover and share prompts",
};

const Rootlayoout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div ClassName="main">
            <div ClassName="gradient" />
          </div>

          <main ClassName="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Rootlayoout;
