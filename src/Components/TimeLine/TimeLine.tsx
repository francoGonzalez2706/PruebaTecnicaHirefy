import { useEffect, useState } from "react";
import { realease } from "../../types/Release";
import "./TimeLine.css";
interface props {
  release: {
    Title: string;
    subTitle: string;
    timeline: realease[];
  };
}

export const TimeLine = ({ release }: props) => {
  const [filter, setfilter] = useState<string>("");
  const [timeline, setTimeline] = useState(release.timeline);
  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");

    const isElementInViewport = (el: any) => {
      const rect = el.getBoundingClientRect();
      const threshold = window.innerWidth < 600 ? 500 : 200;
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight + threshold &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    const callbackFunc = () => {
      for (let i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        } else if (window.innerWidth > 768) {
          items[i].classList.remove("in-view");
        }
      }
    };

    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);

    return () => {
      window.removeEventListener("load", callbackFunc);
      window.removeEventListener("resize", callbackFunc);
      window.removeEventListener("scroll", callbackFunc);
    };
  }, [timeline, release]);

  useEffect(() => {
    if (filter === "All") {
      setTimeline(release.timeline);
    } else {
      setTimeline(filterArray());
    }
  }, [filter, release]);
  function filterArray() {
    const lowerCaseSearch = filter.toLowerCase();

    const filteredArray = release.timeline.filter((item) =>
      item.chipDate.chip.toLowerCase().includes(lowerCaseSearch)
    );

    return filteredArray;
  }
  return (
    <div className="TimeLineContainer">
      <div className="TitleContainer">
        <h1>{release.Title}</h1>
        <div className="FilterContainer">
          <span>sort by:</span>
          <select onChange={(e) => setfilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Feat">Feat</option>
            <option value="Fix">Fix</option>
          </select>
        </div>
      </div>
      <section className="timeline">
        <ul className="releaseList">
          {timeline.map((data, index) => (
            <li className="timeline-item" key={index}>
              <div className="card">
                <h2 className="tile_card">{data.title}</h2>
                <div className="container_State">
                  <span
                    className="state_card"
                    style={{
                      backgroundColor:
                        data.chipDate.chip === "Feat" ? "#D3FFF5" : "#FFF8E5",
                      color:
                        data.chipDate.chip === "Feat" ? "#1CB59C" : "#FFB800",
                    }}
                  >
                    {data.chipDate.chip}
                  </span>
                  <span className="date_card">{data.chipDate.date}</span>
                </div>
                <p className="description_card">{data.description}</p>
                {data.img && <img src={data.img} alt="" className="img_card" />}
                {data.items && (
                  <ul className="itemsList">
                    {data.items.map((item, index) => (
                      <li key={index} className="items">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
