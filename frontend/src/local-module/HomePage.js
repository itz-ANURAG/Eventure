// to import files and images in our landing pages from different component and folders.
import "../stylesheets/homePage.css";
import profile from "../images/profile.jpg";
import notificationBell from "../images/notificationBell.png";
import community from "../images/community.png";
import education_icon from "../images/education_icon.png";
import Finance_icon from "../images/Finance_icon.png";
import govScheme_icon from "../images/govScheme_icon.png";
import opportunity_icon from "../images/opportunity_icon.png";
import resource_icon from "../images/resource_icon.png";
import goals from "../images/goals.png";

// library imported to create the effect of autowrite
import { useTypewriter, Cursor } from "react-simple-typewriter";
export default function HomePage() {

  // this is the logic of autowrite function
  const [text] = useTypewriter({
    words: [`blogs`, `schemes info`, `research info`],
    loop: {},
  });
  return (
    <>
      {/*creating header section which contains our navbar  */}

      <header className="header">
        <div className="projectName">EduHub</div>
        <nav>
          <ul className="leftBar">
            <li>contact us</li>
            <li>Blogs</li>
            <li>About</li>
            <li>Sign In</li>
            <li>
              <img className="bell" src={notificationBell} alt="notification" />
            </li>

            <button className="profile">
              <img src={profile} alt="profile" />
            </button>
          </ul>
        </nav>
      </header>

      {/* jsx code for the first section which serves the purpose of our website intro.  */}

      <section className="firstSection">
        <div className="typewrite">
          We at EduHub help you to get yourself familiar with various stuffs
          like {""}
          {/* code of that autowrite library in jsx */}
          <span style={{ color: "black", fontWeight: "bold" }}>{text}</span>
          <span style={{ color: "black" }}>
            <Cursor cursorStyle="|" />
          </span>
        </div>
      </section>

      {/* second section jsx which shows whatwe usually help u with in our website. */}

      <section className="secondSection">
        <h1
          className="
      tittle"
        >
          <span>What we do</span>
        </h1>

        {/* insterted grid layout to make desired layout. */}

        <div className="aboutGrid">
          <div className="template">
            <img className="community" src={community} alt="community logo" />
            <h2>Build Community</h2>
            <div>
              Loremschhed sbhbjdw dwhhwd hwdvhwh dvwhvhdw wdvhv dwvvh dgvvvd mtm
              jjbrjbhbhg .
            </div>
          </div>
          <div className="template">
            <img className="community" src={education_icon} alt="community logo" />
            <h2>Educate</h2>
            <div>
              Loremschhed sbhbjdw dwhhwd hwdvhwh dvwhvhdw wdvhv dwvvh dgvvvd mtm
              jjbrjbhbhg .
            </div>
          </div>
          <div className="template">
            <img className="community" src={opportunity_icon} alt="community logo" />
            <h2>Research Oportunity </h2>
            <div>
              Loremschhed sbhbjdw dwhhwd hwdvhwh dvwhvhdw wdvhv dwvvh dgvvvd mtm
              .
            </div>
          </div>
          <div className="template">
            <img className="community" src={Finance_icon} alt="community logo" />
            <h2>Financial Awareness</h2>
            <div>
              Loremschhed sbhbjdw dwhhwd hwdvhwh dvwhvhdw wdvhv dwvvh dgvvvd
              mtm.
            </div>
          </div>
          <div className="template">
            <img className="community" src={govScheme_icon} alt="community logo" />
            <h2>Gov Schemes Info</h2>
            <div>
              Loremschhed sbhbjdw dwhhwd hwdvhwh dvwhvhdw wdvhv dwvvh dgvvvd mtm
              jjbrjbhbhg .
            </div>
          </div>
          <div className="template">
            <img className="community" src={resource_icon} alt="community logo" />
            <h2>Resource Acess</h2>
            <div>
              Loremschhed sbhbjdw dwhhwd hwdvhwh dvwhvhdw wdvhv dwvvh dgvvvd mtm
              jjbrjbhbhg .
            </div>
          </div>
        </div>
      </section>

      {/* just a filler section to make website more appelaing and giving required spaces. */}

      <div className="filler">
        <hr />
      </div>

      {/* third section start here */}

      <section className="thirdSection">
        <div className="left3">
          <img src={goals} alt="goals logo" className="goals" />
        </div>
        <div className="right3">
          <h1>Goals</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum
            porro deserunt architecto expedita voluptate reprehenderit
            similique, cum optio nulla consequatur aliquam quasi. Quibusdam, at
            amet .
          </p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum
            porro deserunt architecto expedita voluptate reprehenderit
            similique, cum optio nulla consequatur aliquam quasi. Quibusdam, at
            amet est rerum molestias itaque repellat similique qui assumenda
            quasi eligendi aliquid? Velit iste esse Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Esse expedita porro inventore
            blanditiis perspiciatis exercitationem doloremque libero doloribus
            reiciendis voluptatum voluptatem obcaecati quidem itaque, pariatur
            accusamus fuga odio animi aliquam?.
          </p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum
            porro deserunt architecto expedita voluptate repre.
          </p>
        </div>
      </section>
      {/* another filler similar to previous one with the same purpose. */}
      <div className="filler">
        <hr />
      </div>
      {/* fourth section for the users to contact the website admins in case of any query. */}
      <section className="fourthSection">
        <div className="left4">
          <form action="#" method="post">
            <h2>Contact Us</h2>

            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              required
            />

            <label htmlFor="phone">Phone No:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="phone no"
              required
            />

            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="right4"></div>
      </section>
      {/* usual foorter creation. */}
      <footer>
        <p>
          Made with &#10084; by team Eklavya for benefit of society and
          bettermnet of others .{" "}
        </p>
        <p>all copyright &#169; rights reserved till 2024.</p>
      </footer>
    </>
  );
}
